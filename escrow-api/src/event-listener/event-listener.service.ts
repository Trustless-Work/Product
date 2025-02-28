import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { rpc as StellarRpc } from "@stellar/stellar-sdk";

@Injectable()
export class EventListenerService {
  private readonly logger = new Logger(EventListenerService.name);
  private readonly sorobanServer: StellarRpc.Server;
  private readonly contractId: string;
  private readonly pollInterval: number;

  constructor(private configService: ConfigService) {
    this.sorobanServer = new StellarRpc.Server(
      this.configService.get<string>("SOROBAN_RPC_URL") ?? ""
    );
    this.contractId = this.configService.get<string>("CONTRACT_ID") ?? "";
    this.pollInterval = this.configService.get<number>("POLL_INTERVAL") ?? 10000;
  }

  @Interval("pollEvents", 10000) // Poll every 10 seconds
  async pollContractEvents() {
    try {
      this.logger.log("Checking for new contract events...");

      const eventsResponse = await this.sorobanServer.getEvents({
        startLedger: 0,
        filters: [
          {
            type: "contract",
            contractIds: [this.contractId],
            topics: [["AAAADwAAAAh0cmFuc2Zlcg==", "*", "*", "*"]],
          },
        ],
      });

      if (eventsResponse.events.length > 0) {
        this.logger.log(`Detected ${eventsResponse.events.length} new events`);
        eventsResponse.events.forEach((event) => this.handleEvent(event));
      }
    } catch (error) {
      this.logger.error(`Error polling events: ${error.message}`);
    }
  }

  private handleEvent(event: any) {
    this.logger.log(`Event received: ${JSON.stringify(event)}`);

    if (event.topic[0] === "escrow_funded") {
      this.logger.log(
        `Escrow Funded - ID: ${event.data.escrow_id}, Amount: ${event.data.amount}`
      );
    } else if (event.topic[0] === "milestone_status_changed") {
      this.logger.log(
        `Milestone Status Changed - ID: ${event.data.escrow_id}, Status: ${event.data.new_status}`
      );
    }
  }
}
