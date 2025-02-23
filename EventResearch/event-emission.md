# Soroban Event Emission in Trustless Work Smart Contracts

## Overview
This document describes how event emission was implemented in the Trustless Work Smart Escrow contract using Soroban's event system.

## Research Overview  

### **Soroban’s Capabilities & Limitations**  
- Soroban allows **structured event emission** using `env.events().publish()`.  
- Events contain **topics** (categorization) and **data payloads** (actual event details).  
- **Events are discarded** if the contract fails (e.g., panics, budget exhaustion).  
- Topics should be **short and meaningful** for efficient indexing.  

### **Insights from Community & Tools Explored**  
- Best practice: Use `symbol_short!()` for concise event topics.  
- Events should include **essential metadata** to ensure usability.  
- Indexing events at scale may require **off-chain processing** (e.g., Trustless Work API).  

## Event Structure
The following events are emitted in key actions:

1. **Funding an Escrow**  
   - **Event Name:** `escrow_funded`  
   - **Payload:**  
     ```json
     {
       "escrow_id": "12345",
       "amount": 1000,
     }
     ```
  
2. **Changing an Escrow Milestone Status**  
   - **Event Name:** `milestone_status_changed`  
   - **Payload:**  
     ```json
     {
       "escrow_id": "12345",
       "milestone_index": 1,
       "old_status": "pending",
       "new_status": "completed",
     }
     ```

## Implementation Details
Event emission was added to:
- `fund_escrow` function (emits `escrow_funded` event).
- `change_milestone_status` function (emits `milestone_status_changed` event).

## How Events Can Be Consumed
- External systems can listen to these events using Stellar’s event API.
- The Trustless Work API can integrate with Soroban’s event logs to track escrow funding and milestone changes in real time.

## Tools & Best Practices Used
- Soroban event system (`env.events().publish()`).
- Community insights from Stellar Discord.
