import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { rpc as StellarRpc } from "@stellar/stellar-sdk";

@Injectable()
export class EventListenerService {
  private readonly logger = new Logger(EventListenerService.name);
  private readonly sorobanServer: StellarRpc.Server;
  private readonly contractIds: string[];
  private hasStarted = false;
  private currentContractIndex = 0;
  private startLedger: number | null = null;

  constructor(private configService: ConfigService) {
    this.sorobanServer = new StellarRpc.Server(
      this.configService.get<string>("SOROBAN_RPC_URL") ?? "https://soroban-testnet.stellar.org"
    );

    // Load from environment or use default list
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
      throw error;
    }
  }

  @Interval("pollEvents", 300) //set polling time in ms
  async pollContractEvents() {
    try {
      if (!this.hasStarted) {
        this.logger.log("Checking for new contract events...");
        this.startLedger = await this.getLatestLedger(); // Start with the latest ledger
        this.hasStarted = true;
      }

      if (this.contractIds.length === 0 || this.startLedger === null) return;

      // Cycle through contracts using index
      const contractId = this.contractIds[this.currentContractIndex];

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
        this.logger.log(`Detected ${eventsResponse.events.length} new events for contract ${contractId}`);
        eventsResponse.events.forEach(event => this.handleEvent(event, contractId));
      }

      this.currentContractIndex = (this.currentContractIndex + 1) % this.contractIds.length;

      if (this.currentContractIndex === 0) {
        this.startLedger++;
      }
    } catch (error) {
      const errorMessage = error.message || "";

      // Handle "startLedger must be within the ledger range" error
      if (errorMessage.includes("startLedger must be within the ledger range:")) {
        //this.logger.warn(`startLedger out of range. Resetting to latest ledger...`);
        this.startLedger = await this.getLatestLedger(); // Reset to latest ledger
      } else {
      }
    }
  }

  private handleEvent(event: any, contractId: string) {
    try {
      const usdcDeposited = Number(
        event.value._value.find(item => item._arm === "i128")._value._attributes.lo._value
      ) / 10000000;

      this.logger.log(`fund_escrow: ${usdcDeposited} USDC deposited to contract ${contractId}`);
    } catch (error) {
    }
  }
}
