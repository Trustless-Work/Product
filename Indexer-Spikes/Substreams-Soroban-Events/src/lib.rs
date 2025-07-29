use substreams::prelude::*;
use substreams::pb::substreams::Clock;
use serde_json::Value;
use hex;

// Proto definitions for our output types
pub mod pb {
    pub mod trustless {
        pub mod work {
            pub mod v1 {
                include!("trustless.work.v1.rs");
            }
        }
    }
}

use pb::trustless::work::v1::{EscrowEvent, EscrowEvents};

// Known contract addresses for Trustless Work escrows
const TRUSTLESS_WORK_CONTRACTS: &[&str] = &[
    "CBAZK4CXB7LQYUNIIX4RO2LMBJBTCO64FQRNETAJPRKPPQMG6OY2AZVC",
    "CC6XXJ76J3BAMQUXBJ6MI35NSIDW5LQWLWSGKRSO375IFLIZBC5ABRB7",
    "CBO6GUJ5UXSJEAEB3ADB36Z3YTMRNGSL5M7DPXQQOZLHLWQC3SO4LHDF",
];

// Event topics we want to index
const TARGET_EVENT_TOPICS: &[&str] = &["init_esc", "fund_esc", "dis_esc", "chg_esc"];

#[substreams::handlers::map]
pub fn map_soroban_events(
    clock: Clock,
    block: substreams_stellar::pb::Block,
) -> Result<EscrowEvents, substreams::errors::Error> {
    let mut escrow_events = EscrowEvents { events: vec![] };
    let timestamp = clock.timestamp.unwrap().seconds as u64;

    // Process each transaction in the block
    for transaction in block.transactions {
        for (op_index, operation) in transaction.operations.iter().enumerate() {
            // Look for contract invocation operations
            if let Some(invoke_contract_op) = &operation.invoke_contract {
                process_contract_invocation(
                    &mut escrow_events,
                    invoke_contract_op,
                    &transaction,
                    op_index,
                    block.sequence,
                    timestamp,
                )?;
            }
        }
    }

    substreams::log::info!(
        "Block {}: Found {} escrow events", 
        block.sequence, 
        escrow_events.events.len()
    );

    Ok(escrow_events)
}

fn process_contract_invocation(
    escrow_events: &mut EscrowEvents,
    invoke_op: &substreams_stellar::pb::InvokeContractOp,
    transaction: &substreams_stellar::pb::Transaction,
    op_index: usize,
    ledger: u32,
    timestamp: u64,
) -> Result<(), substreams::errors::Error> {
    // Check if this is one of our target contracts
    if !TRUSTLESS_WORK_CONTRACTS.contains(&invoke_op.contract_address.as_str()) {
        return Ok(());
    }

    // Process events emitted by this contract invocation
    if let Some(events) = &invoke_op.events {
        for (event_index, event) in events.iter().enumerate() {
            if let Some(escrow_event) = extract_escrow_event(
                event,
                &invoke_op.contract_address,
                &transaction.hash,
                op_index,
                event_index,
                ledger,
                timestamp,
            )? {
                escrow_events.events.push(escrow_event);
            }
        }
    }

    Ok(())
}

fn extract_escrow_event(
    event: &substreams_stellar::pb::ContractEvent,
    contract_address: &str,
    tx_hash: &str,
    op_index: usize,
    event_index: usize,
    ledger: u32,
    timestamp: u64,
) -> Result<Option<EscrowEvent>, substreams::errors::Error> {
    // Parse event topic - looking for our target events
    let topic = parse_event_topic(&event.topic)?;
    
    if !TARGET_EVENT_TOPICS.contains(&topic.as_str()) {
        return Ok(None);
    }

    // Create unique event ID
    let event_id = format!("{}-{}-{}", tx_hash, op_index, event_index);

    // Extract event data based on event type
    let (engagement_id, signer, amount, platform_address) = match topic.as_str() {
        "init_esc" => {
            // init_esc events have minimal payload - extract engagement_id from contract state
            let engagement_id = extract_engagement_id_from_context(&event.data)?;
            (engagement_id, None, None, None)
        }
        "fund_esc" => {
            // fund_esc: (signer, amount_to_deposit)
            let (signer, amount) = parse_fund_event_data(&event.data)?;
            let engagement_id = extract_engagement_id_from_context(&event.data)?;
            (engagement_id, Some(signer), Some(amount), None)
        }
        "dis_esc" => {
            // dis_esc: (release_signer, trustless_work_address) 
            let (signer, platform_addr) = parse_distribute_event_data(&event.data)?;
            let engagement_id = extract_engagement_id_from_context(&event.data)?;
            (engagement_id, Some(signer), None, Some(platform_addr))
        }
        "chg_esc" => {
            // chg_esc: (platform_address, escrow_properties)
            let (platform_addr, engagement_id) = parse_change_event_data(&event.data)?;
            (engagement_id, None, None, Some(platform_addr))
        }
        _ => return Ok(None),
    };

    let escrow_event = EscrowEvent {
        id: event_id,
        event_type: topic,
        engagement_id,
        contract_address: contract_address.to_string(),
        signer,
        amount,
        platform_address,
        payload: hex::encode(&event.data),
        ledger: ledger as u64,
        timestamp,
        transaction_hash: tx_hash.to_string(),
    };

    substreams::log::info!(
        "Extracted {} event for engagement {}", 
        topic, 
        engagement_id
    );

    Ok(Some(escrow_event))
}

fn parse_event_topic(topic_bytes: &[u8]) -> Result<String, substreams::errors::Error> {
    // Soroban events use symbol_short! which creates 8-byte identifiers
    // Convert bytes to string representation
    if topic_bytes.len() >= 8 {
        let topic_str = String::from_utf8_lossy(&topic_bytes[..8]);
        Ok(topic_str.trim_end_matches('\0').to_string())
    } else {
        Ok(hex::encode(topic_bytes))
    }
}

fn extract_engagement_id_from_context(event_data: &[u8]) -> Result<String, substreams::errors::Error> {
    // For this spike, we'll extract engagement_id from the event data
    // In production, this might require additional contract state queries
    
    // Parse the event data as JSON or XDR depending on Soroban's encoding
    // For now, we'll create a placeholder based on contract address + timestamp
    let data_hash = hex::encode(&event_data[..std::cmp::min(8, event_data.len())]);
    Ok(format!("engagement_{}", data_hash))
}

fn parse_fund_event_data(event_data: &[u8]) -> Result<(String, u64), substreams::errors::Error> {
    // Parse fund_esc event: (signer: Address, amount_to_deposit: i128)
    // This is a simplified parser - production would use proper XDR decoding
    
    let signer = extract_address_from_data(event_data, 0)?;
    let amount = extract_amount_from_data(event_data, 32)?;
    
    Ok((signer, amount))
}

fn parse_distribute_event_data(event_data: &[u8]) -> Result<(String, String), substreams::errors::Error> {
    // Parse dis_esc event: (release_signer: Address, trustless_work_address: Address)
    
    let signer = extract_address_from_data(event_data, 0)?;
    let platform_address = extract_address_from_data(event_data, 32)?;
    
    Ok((signer, platform_address))
}

fn parse_change_event_data(event_data: &[u8]) -> Result<(String, String), substreams::errors::Error> {
    // Parse chg_esc event: (platform_address: Address, escrow_properties: Escrow)
    // Extract platform address and engagement_id from escrow_properties
    
    let platform_address = extract_address_from_data(event_data, 0)?;
    let engagement_id = extract_engagement_id_from_escrow_data(event_data, 32)?;
    
    Ok((platform_address, engagement_id))
}

fn extract_address_from_data(data: &[u8], offset: usize) -> Result<String, substreams::errors::Error> {
    // Extract Stellar address from event data
    // This is simplified - production would use proper Stellar address decoding
    
    if data.len() >= offset + 32 {
        let addr_bytes = &data[offset..offset + 32];
        Ok(hex::encode(addr_bytes))
    } else {
        Ok("unknown_address".to_string())
    }
}

fn extract_amount_from_data(data: &[u8], offset: usize) -> Result<u64, substreams::errors::Error> {
    // Extract i128 amount from event data
    // Convert to u64 for GraphQL compatibility (amounts in USDC with 7 decimals)
    
    if data.len() >= offset + 16 {
        let amount_bytes = &data[offset..offset + 8];
        let amount = u64::from_le_bytes([
            amount_bytes[0], amount_bytes[1], amount_bytes[2], amount_bytes[3],
            amount_bytes[4], amount_bytes[5], amount_bytes[6], amount_bytes[7],
        ]);
        Ok(amount)
    } else {
        Ok(0)
    }
}

fn extract_engagement_id_from_escrow_data(data: &[u8], offset: usize) -> Result<String, substreams::errors::Error> {
    // Extract engagement_id from Escrow struct in event data
    // This would parse the Escrow struct to get the engagement_id field
    
    let id_hash = hex::encode(&data[offset..std::cmp::min(data.len(), offset + 16)]);
    Ok(format!("engagement_{}", id_hash))
}
