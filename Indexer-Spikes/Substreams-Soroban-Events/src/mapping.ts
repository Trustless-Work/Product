import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { EscrowEvent } from "../generated/schema";

// Import the protobuf types generated from our Substreams
import { EscrowEvents } from "../generated/TrustlessWorkEvents/TrustlessWorkEvents";

/**
 * Main handler for processing escrow events from Substreams
 */
export function handleEscrowEvents(events: EscrowEvents): void {
  log.info("Processing {} escrow events from Substreams", [
    events.events.length.toString()
  ]);

  // Process each event in the batch
  for (let i = 0; i < events.events.length; i++) {
    let eventData = events.events[i];
    
    // Create and save the individual event entity
    let escrowEvent = new EscrowEvent(eventData.id);
    
    escrowEvent.type = eventData.eventType;
    escrowEvent.engagementId = eventData.engagementId;
    escrowEvent.contractAddress = eventData.contractAddress;
    escrowEvent.payload = eventData.payload;
    escrowEvent.ledger = BigInt.fromString(eventData.ledger.toString());
    escrowEvent.timestamp = BigInt.fromString(eventData.timestamp.toString());
    
    escrowEvent.save();
    
    log.info("Processed {} event for engagement {} at ledger {}", [
      eventData.eventType,
      eventData.engagementId,
      eventData.ledger.toString()
    ]);
  }
}
