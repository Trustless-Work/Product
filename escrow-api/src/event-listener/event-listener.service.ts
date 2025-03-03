import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { rpc as StellarRpc } from "@stellar/stellar-sdk";

@Injectable()
export class EventListenerService {
  private readonly logger = new Logger(EventListenerService.name);
  private readonly sorobanServer: StellarRpc.Server;
  private readonly contractId: string;

  constructor(private configService: ConfigService) {
    this.sorobanServer = new StellarRpc.Server(
      this.configService.get<string>("SOROBAN_RPC_URL") ?? "https://soroban-testnet.stellar.org"
    );
    this.contractId = this.configService.get<string>("CONTRACT_ID") ?? "CDOA2TCTQXLNEVTODWE3ROCRPUYTS5G2AIZUGIA2N6CYLFKMRM7BMDKU";
  }

  /** Fetch latest ledger before querying events */
  private async getLatestLedger(): Promise<number> {
    const requestBody = {
      jsonrpc: "2.0",
      id: 8675309,
      method: "getLatestLedger",
    };

    try {
      const response = await fetch(this.configService.get<string>("SOROBAN_RPC_URL") ?? "https://soroban-testnet.stellar.org", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

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

  @Interval("pollEvents", 1000) // Poll every second
  async pollContractEvents() {
    try {
      this.logger.log("Checking for new contract events...");
      
      const latestLedger = await this.getLatestLedger();
      this.logger.log(`Polling from ledger: ${latestLedger}`);

      const eventsResponse = await this.sorobanServer.getEvents({
        startLedger: latestLedger,
        filters: [
          {
            type: "contract",
            contractIds: [this.contractId],
            topics: [["AAAADwAAAAh0cmFuc2Zlcg==", "*", "*", "*"]],
          },
        ],
      });

      if (eventsResponse?.events?.length) {
        this.logger.log(`Detected ${eventsResponse.events.length} new events`);
        eventsResponse.events.forEach((event) => this.handleEvent(event));
      }
    } 
    
    catch (error) {
      this.logger.error(`Error polling events: ${error.message}`);
    }
  }

  private handleEvent(event: any) {
    this.logger.log(`Event received: ${JSON.stringify(event)}`);

    if (event.topic[0] === "fund_esc") {
      this.logger.log(
        `Escrow Funded - signer: ${event.data.signer}, Amount: ${event.data.amount_to_deposit}`
      );
    } 
  }
}
