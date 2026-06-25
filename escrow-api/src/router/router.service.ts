import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  Networks,
  Keypair,
  Transaction,
  TransactionBuilder,
  BASE_FEE,
  Contract,
  Address,
  rpc as StellarRpc,
  scValToNative,
} from "@stellar/stellar-sdk";
import { DistributeRouterDto } from "./dto/distribute-router.dto";

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export interface DistributeResult {
  status: "success" | "skipped" | "pending" | "error";
  routerContractId: string;
  txHash?: string;
  reason?: string;
  message?: string;
}

interface IdempotencyCacheEntry extends DistributeResult {
  timestamp: number;
}

@Injectable()
export class RouterService {
  private readonly logger = new Logger(RouterService.name);
  private readonly server: StellarRpc.Server;
  private readonly idempotencyCache = new Map<string, IdempotencyCacheEntry>();
  private readonly IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

  constructor(private readonly config: ConfigService) {
    const rpcUrl =
      this.config.get<string>("SOROBAN_RPC_URL") ??
      "https://soroban-testnet.stellar.org";
    this.server = new StellarRpc.Server(rpcUrl);
  }

  async distribute(dto: DistributeRouterDto): Promise<DistributeResult> {
    const { routerContractId, reason, sourceEscrowId, idempotencyKey } = dto;

    if (idempotencyKey) {
      const cached = this.getCachedResult(idempotencyKey);
      if (cached) {
        this.logger.log(
          `Idempotency key "${idempotencyKey}" already processed — returning cached result`,
        );
        return cached;
      }
    }

    const secretKey = this.config.getOrThrow<string>("AUTOMATION_SECRET_KEY");
    const publicKey = this.config.getOrThrow<string>("AUTOMATION_PUBLIC_KEY");
    const network = this.config.get<string>("STELLAR_NETWORK") ?? "testnet";
    const usdcContractId = this.config.getOrThrow<string>("USDC_CONTRACT_ID");
    const networkPassphrase =
      network === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

    let keypair: Keypair;
    try {
      keypair = Keypair.fromSecret(secretKey);
    } catch (err) {
      this.logger.error(
        `Failed to load automation keypair: ${errMessage(err)}`,
      );
      throw new Error("Failed to load automation signing key.");
    }

    this.logger.log(
      `Checking USDC balance for router ${routerContractId} | reason: ${reason} | source: ${sourceEscrowId ?? "N/A"}`,
    );

    const balance = await this.getRouterBalance(
      routerContractId,
      usdcContractId,
      networkPassphrase,
      publicKey,
    );

    this.logger.log(
      `Router ${routerContractId} USDC balance: ${balance} (stroops)`,
    );

    if (balance <= 0n) {
      this.logger.warn(
        `Router ${routerContractId} has zero balance — skipping distribute()`,
      );
      const result: DistributeResult = {
        status: "skipped",
        routerContractId,
        reason: "zero_balance",
      };
      if (idempotencyKey) this.cacheResult(idempotencyKey, result);
      return result;
    }

    const account = await this.server.getAccount(publicKey);
    const contract = new Contract(routerContractId);

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(contract.call("distribute", new Address(publicKey).toScVal()))
      .setTimeout(30)
      .build();

    let preparedTx: Transaction;
    try {
      preparedTx = await this.server.prepareTransaction(tx);
    } catch (err) {
      this.logger.error(`prepareTransaction failed: ${errMessage(err)}`);
      throw new Error(
        `Failed to prepare distribute() transaction: ${errMessage(err)}`,
      );
    }

    try {
      preparedTx.sign(keypair);
    } catch (err) {
      this.logger.error(`Transaction signing failed: ${errMessage(err)}`);
      throw new Error(`Failed to sign transaction: ${errMessage(err)}`);
    }

    let sendResult: StellarRpc.Api.SendTransactionResponse;
    try {
      sendResult = await this.server.sendTransaction(preparedTx);
    } catch (err) {
      this.logger.error(`sendTransaction threw: ${errMessage(err)}`);
      throw new Error(`Failed to submit transaction: ${errMessage(err)}`);
    }

    if (sendResult.status === "ERROR") {
      const detail = JSON.stringify(sendResult.errorResult ?? "unknown");
      const errMsg = `Transaction submission rejected by the network: ${detail}`;
      this.logger.error(errMsg);
      throw new Error(errMsg);
    }

    if (sendResult.status === "TRY_AGAIN_LATER") {
      const errMsg = `Network is overloaded — transaction not accepted. Retry the distribution.`;
      this.logger.error(errMsg);
      throw new Error(errMsg);
    }

    const txHash = sendResult.hash;
    this.logger.log(
      `distribute() submitted — txHash: ${txHash} | contract: ${routerContractId} | reason: ${reason}`,
    );

    const finalStatus = await this.waitForConfirmation(txHash);

    const result: DistributeResult = {
      status:
        finalStatus === StellarRpc.Api.GetTransactionStatus.SUCCESS
          ? "success"
          : "pending",
      routerContractId,
      txHash,
    };

    this.logger.log(
      `Distribution complete — status: ${result.status} | txHash: ${txHash} | contract: ${routerContractId}`,
    );

    if (idempotencyKey) this.cacheResult(idempotencyKey, result);

    return result;
  }

  private async getRouterBalance(
    routerContractId: string,
    usdcContractId: string,
    networkPassphrase: string,
    automationPublicKey: string,
  ): Promise<bigint> {
    const account = await this.server.getAccount(automationPublicKey);
    const usdcContract = new Contract(usdcContractId);
    const routerAddress = new Address(routerContractId);

    const balanceTx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(usdcContract.call("balance", routerAddress.toScVal()))
      .setTimeout(30)
      .build();

    const sim = await this.server.simulateTransaction(balanceTx);

    if (StellarRpc.Api.isSimulationError(sim)) {
      throw new Error(`Balance simulation failed: ${sim.error}`);
    }

    if (!sim.result?.retval) return 0n;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const native = scValToNative(sim.result.retval);
      if (typeof native === "bigint") return native;
      if (typeof native === "number") return BigInt(native);
      return 0n;
    } catch {
      return 0n;
    }
  }

  private async waitForConfirmation(
    txHash: string,
    maxAttempts = 20,
    pollIntervalMs = 1500,
  ): Promise<StellarRpc.Api.GetTransactionStatus> {
    const rpcUrl =
      this.config.get<string>("SOROBAN_RPC_URL") ??
      "https://soroban-testnet.stellar.org";

    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));

      let status: StellarRpc.Api.GetTransactionStatus;
      try {
        const result = await this.server.getTransaction(txHash);
        status = result.status;
      } catch {
        // SDK XDR parse errors (e.g. "Bad union switch") — fall back to raw RPC
        status = await this.getRawTransactionStatus(rpcUrl, txHash);
      }

      if (status !== StellarRpc.Api.GetTransactionStatus.NOT_FOUND) {
        return status;
      }
    }
    return StellarRpc.Api.GetTransactionStatus.NOT_FOUND;
  }

  private async getRawTransactionStatus(
    rpcUrl: string,
    txHash: string,
  ): Promise<StellarRpc.Api.GetTransactionStatus> {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: { hash: txHash },
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: { result?: { status?: string } } = await response.json();
    const raw = json.result?.status?.toUpperCase();
    if (raw === "SUCCESS") return StellarRpc.Api.GetTransactionStatus.SUCCESS;
    if (raw === "FAILED") return StellarRpc.Api.GetTransactionStatus.FAILED;
    return StellarRpc.Api.GetTransactionStatus.NOT_FOUND;
  }

  private getCachedResult(key: string): DistributeResult | null {
    const entry = this.idempotencyCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.IDEMPOTENCY_TTL_MS) {
      this.idempotencyCache.delete(key);
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { timestamp: _ts, ...result } = entry;
    return result;
  }

  private cacheResult(key: string, result: DistributeResult): void {
    const now = Date.now();
    for (const [k, v] of this.idempotencyCache.entries()) {
      if (now - v.timestamp > this.IDEMPOTENCY_TTL_MS) {
        this.idempotencyCache.delete(k);
      }
    }
    this.idempotencyCache.set(key, { ...result, timestamp: now });
  }
}
