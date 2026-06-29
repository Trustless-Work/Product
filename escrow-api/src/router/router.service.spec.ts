import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import {
  Account,
  Keypair,
  rpc as StellarRpc,
  StrKey,
} from "@stellar/stellar-sdk";
import { RouterService } from "./router.service";

jest.setTimeout(30000);

// Deterministic fake contract IDs in valid StrKey format
const FAKE_ROUTER_CONTRACT_ID = StrKey.encodeContract(Buffer.alloc(32, 1));
const FAKE_USDC_CONTRACT_ID = StrKey.encodeContract(Buffer.alloc(32, 2));

describe("RouterService", () => {
  let service: RouterService;

  let configService: { get: jest.Mock; getOrThrow: jest.Mock };

  const automationKeypair = Keypair.random();
  const mockAccount = new Account(automationKeypair.publicKey(), "100");

  function buildConfig(overrides: Record<string, string | undefined> = {}) {
    const defaults: Record<string, string> = {
      SOROBAN_RPC_URL: "https://soroban-testnet.stellar.org",
      STELLAR_NETWORK: "testnet",
      AUTOMATION_SECRET_KEY: automationKeypair.secret(),
      AUTOMATION_PUBLIC_KEY: automationKeypair.publicKey(),
      USDC_CONTRACT_ID: FAKE_USDC_CONTRACT_ID,
    };
    const merged = { ...defaults, ...overrides };

    return {
      get: jest.fn((key: string) => merged[key]),
      getOrThrow: jest.fn((key: string) => {
        if (!(key in merged) || merged[key] === undefined) {
          throw new Error(`Config key "${key}" is required but not set.`);
        }
        return merged[key];
      }),
    };
  }

  async function createService(
    configOverrides: Record<string, string | undefined> = {},
  ): Promise<RouterService> {
    configService = buildConfig(configOverrides);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouterService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    return module.get<RouterService>(RouterService);
  }


  function mockServer(
    svc: RouterService,
    overrides: Record<string, jest.Mock> = {},
  ) {
    const defaults: Record<string, jest.Mock> = {
      getAccount: jest.fn().mockResolvedValue(mockAccount),
      prepareTransaction: jest.fn().mockResolvedValue({ sign: jest.fn() }),
      sendTransaction: jest
        .fn()
        .mockResolvedValue({ hash: "abc123txhash", status: "PENDING" }),
      simulateTransaction: jest
        .fn()
        .mockResolvedValue({ result: { retval: null } }),
      getTransaction: jest.fn().mockResolvedValue({
        status: StellarRpc.Api.GetTransactionStatus.SUCCESS,
      }),
    };

    (svc as any)["server"] = { ...defaults, ...overrides };

    return (svc as any)["server"];
  }

  // Sets up a full success path: balance positive, TX signed, confirmed.
  function mockForSuccess(svc: RouterService) {
    const mockTx = { sign: jest.fn() };
    const server = mockServer(svc, {
      prepareTransaction: jest.fn().mockResolvedValue(mockTx),
      sendTransaction: jest
        .fn()
        .mockResolvedValue({ hash: "abc123txhash", status: "PENDING" }),
    });
    jest
      .spyOn(svc as any, "waitForConfirmation")
      .mockResolvedValue(StellarRpc.Api.GetTransactionStatus.SUCCESS);
    return { mockTx, server };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── Balance zero ────────────────────────────────────────────────────────────

  describe("Does not call distribute() when balance is zero", () => {
    it("returns skipped status and does not call sendTransaction", async () => {
      service = await createService();
      const server = mockServer(service);

      jest.spyOn(service as any, "getRouterBalance").mockResolvedValue(0n);

      const result = await service.distribute({
        routerContractId: FAKE_ROUTER_CONTRACT_ID,
        reason: "escrow_released",
      });

      expect(result.status).toBe("skipped");
      expect(result.reason).toBe("zero_balance");
      expect(server.sendTransaction).not.toHaveBeenCalled();
    });
  });

  // ─── Balance positive ────────────────────────────────────────────────────────

  describe("Attempts to call distribute() when balance is positive", () => {
    it("calls sendTransaction and returns success with txHash", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);
      const { mockTx, server } = mockForSuccess(service);

      const result = await service.distribute({
        routerContractId: FAKE_ROUTER_CONTRACT_ID,
        reason: "escrow_released",
        sourceEscrowId: "CSOURCE123",
      });

      expect(server.sendTransaction).toHaveBeenCalledTimes(1);
      expect(mockTx.sign).toHaveBeenCalledWith(expect.any(Keypair));
      expect(result.status).toBe("success");
      expect(result.txHash).toBe("abc123txhash");
      expect(result.routerContractId).toBe(FAKE_ROUTER_CONTRACT_ID);
    });
  });

  // ─── Returns tx hash on success ──────────────────────────────────────────────

  describe("Returns tx hash on success", () => {
    it("includes txHash in the success response", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(5_000_000n);
      mockForSuccess(service);

      const result = await service.distribute({
        routerContractId: FAKE_ROUTER_CONTRACT_ID,
        reason: "grant_distribution",
      });

      expect(result.txHash).toBeDefined();
      expect(typeof result.txHash).toBe("string");
      expect(result.txHash!.length).toBeGreaterThan(0);
    });
  });

  // ─── Handles failed signing ───────────────────────────────────────────────────

  describe("Handles failed signing", () => {
    it("throws when AUTOMATION_SECRET_KEY is invalid", async () => {
      service = await createService({
        AUTOMATION_SECRET_KEY: "INVALID_NOT_A_REAL_KEY",
      });
      mockServer(service);
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);

      await expect(
        service.distribute({
          routerContractId: FAKE_ROUTER_CONTRACT_ID,
          reason: "escrow_released",
        }),
      ).rejects.toThrow("Failed to load automation signing key.");
    });

    it("throws when preparedTx.sign() throws", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);

      const brokenTx = {
        sign: jest.fn(() => {
          throw new Error("crypto failure");
        }),
      };
      mockServer(service, {
        prepareTransaction: jest.fn().mockResolvedValue(brokenTx),
      });

      await expect(
        service.distribute({
          routerContractId: FAKE_ROUTER_CONTRACT_ID,
          reason: "escrow_released",
        }),
      ).rejects.toThrow("Failed to sign transaction: crypto failure");
    });
  });

  // ─── Handles failed transaction submission ───────────────────────────────────

  describe("Handles failed transaction submission", () => {
    it("throws when sendTransaction rejects (network error)", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);
      mockServer(service, {
        sendTransaction: jest
          .fn()
          .mockRejectedValue(new Error("connection timeout")),
      });

      await expect(
        service.distribute({
          routerContractId: FAKE_ROUTER_CONTRACT_ID,
          reason: "escrow_released",
        }),
      ).rejects.toThrow("Failed to submit transaction: connection timeout");
    });

    it("throws when sendTransaction returns ERROR status", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);
      mockServer(service, {
        sendTransaction: jest.fn().mockResolvedValue({
          hash: "",
          status: "ERROR",
          errorResult: { result: () => "insufficient fee" },
        }),
      });

      await expect(
        service.distribute({
          routerContractId: FAKE_ROUTER_CONTRACT_ID,
          reason: "escrow_released",
        }),
      ).rejects.toThrow("Transaction submission rejected by the network");
    });
  });

  // ─── Idempotency ─────────────────────────────────────────────────────────────

  describe("Prevents duplicate processing when idempotency key is reused", () => {
    it("returns the cached result on the second call with the same key", async () => {
      service = await createService();
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(1_000_000n);
      const { server } = mockForSuccess(service);

      const dto = {
        routerContractId: FAKE_ROUTER_CONTRACT_ID,
        reason: "escrow_released",
        idempotencyKey: "unique-key-abc",
      };

      const firstResult = await service.distribute(dto);
      expect(firstResult.status).toBe("success");

      // Make sendTransaction reject — should never be called due to cache hit
      server.sendTransaction.mockRejectedValue(
        new Error("should not be called again"),
      );

      const secondResult = await service.distribute(dto);
      expect(secondResult).toEqual(firstResult);
    });

    it("caches skipped results too", async () => {
      service = await createService();
      mockServer(service);
      jest.spyOn(service as any, "getRouterBalance").mockResolvedValue(0n);

      const dto = {
        routerContractId: FAKE_ROUTER_CONTRACT_ID,
        reason: "escrow_released",
        idempotencyKey: "key-for-zero-balance",
      };

      const first = await service.distribute(dto);
      expect(first.status).toBe("skipped");

      // Mock balance to return positive — should still get the cached skipped result
      jest
        .spyOn(service as any, "getRouterBalance")
        .mockResolvedValue(9_999_999n);

      const second = await service.distribute(dto);
      expect(second.status).toBe("skipped");
    });
  });

  // ─── Missing required config ──────────────────────────────────────────────────

  describe("Throws when required env vars are missing", () => {
    it("throws when AUTOMATION_SECRET_KEY is not configured", async () => {
      service = await createService({ AUTOMATION_SECRET_KEY: undefined });
      mockServer(service);
      jest.spyOn(service as any, "getRouterBalance").mockResolvedValue(1n);

      await expect(
        service.distribute({
          routerContractId: FAKE_ROUTER_CONTRACT_ID,
          reason: "escrow_released",
        }),
      ).rejects.toThrow();
    });
  });
});
