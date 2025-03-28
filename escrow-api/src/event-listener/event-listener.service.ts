import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { rpc as StellarRpc } from "@stellar/stellar-sdk";

@Injectable()
export class EventListenerService {
  private readonly logger = new Logger(EventListenerService.name);
  private readonly sorobanServer: StellarRpc.Server;
  private readonly contractIds: string[];
  private readonly fundEventsMap: Map<string, number> = new Map();
  private startLedger: number | null = null;
  private hasStarted = false;
  private isProcessing = false;

  constructor(private configService: ConfigService) {
    this.sorobanServer = new StellarRpc.Server(
      this.configService.get<string>("SOROBAN_RPC_URL") ?? "https://soroban-testnet.stellar.org"
    );

    const contracts = this.configService.get<string>("CONTRACT_IDS") ?? "";
    this.contractIds = contracts
      ? contracts.split(",").map(id => id.trim())
      : [
          "CBAZK4CXB7LQYUNIIX4RO2LMBJBTCO64FQRNETAJPRKPPQMG6OY2AZVC",
          "CC6XXJ76J3BAMQUXBJ6MI35NSIDW5LQWLWSGKRSO375IFLIZBC5ABRB7",
          "CBO6GUJ5UXSJEAEB3ADB36Z3YTMRNGSL5M7DPXQQOZLHLWQC3SO4LHDF",
        ];

    if (!this.contractIds.length) {
      throw new Error("No contract IDs provided.");
    }

    // Initialize fund_event counts to 0
    this.resetFundEventsMap();
  }

  /** Reset fund event counts for all contracts */
  private resetFundEventsMap() {
    this.contractIds.forEach(id => this.fundEventsMap.set(id, 0));
  }

  /** Fetch latest ledger before querying events */
  private async getLatestLedger(): Promise<number> {
    const requestBody = {
      jsonrpc: "2.0",
      id: 8675309,
      method: "getLatestLedger",
    };

    try {
      const response = await fetch(
        this.configService.get<string>("SOROBAN_RPC_URL") ?? "https://soroban-testnet.stellar.org",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data?.result?.sequence) {
        return data.result.sequence;
      } else {
        throw new Error("Failed to fetch latest ledger.");
      }
    } catch (error) {
      this.logger.error("Error fetching latest ledger:", error);
      throw new Error("Failed to fetch latest ledger.");
    }
  }

  @Interval(1000) // Poll every second
  async pollContractEvents() {
    if (this.isProcessing) return; // Prevent overlapping calls
    this.isProcessing = true;

    try {
      if (!this.hasStarted) {
        this.logger.log("Initializing contract event listener...");
        this.startLedger = 137500//await this.getLatestLedger();
        this.hasStarted = true;
        this.logger.log("Listening...");
      }

      if (this.startLedger === null) return;

      for (const contractId of this.contractIds) {
        const previousEventCount = this.fundEventsMap.get(contractId) || 0;

        const eventsResponse = await this.sorobanServer.getEvents({
          startLedger: this.startLedger,
          filters: [
            {
              type: "contract",
              contractIds: [contractId],
            },
          ],
        });

        if (eventsResponse?.events?.length) {
          const newEvents = eventsResponse.events
            .map(event => this.extractUSDC(event))
            .filter(amount => amount !== null);

          const newEventCount = newEvents.length;

          if (newEventCount > previousEventCount) {
            // Handle new events
            const diff = newEventCount - previousEventCount;
            const newEventsToProcess = newEvents.slice(-diff);

            newEventsToProcess.forEach(amount => {
              this.logger.log(`fund_escrow: ${amount} USDC deposited to contract ${contractId}`);
            });

            // Update stored fund_event count
            this.fundEventsMap.set(contractId, newEventCount);
          }
        }
      }
    } catch (error) {
      const errorMessage = error.message || "";

      if (errorMessage.includes("startLedger must be within the ledger range:")) {
        this.logger.warn("startLedger out of range. Resetting to latest ledger...");
        this.startLedger = await this.getLatestLedger(); // Reset to latest ledger
        this.resetFundEventsMap(); //Reset fund_event counts when ledger is reset
      } else {
        this.logger.error(`Error polling events: ${errorMessage}`);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /** Extract USDC amount from event */
  private extractUSDC(event: any): number | null {
    try {
      const usdcDeposited = Number(
        event.value._value.find(item => item._arm === "i128")._value._attributes.lo._value
      ) / 10000000;

      return usdcDeposited;
    } catch {
      return null;
    }
  }
}
