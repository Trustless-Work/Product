# Integration checklist

Trustless Work Integration Checklist (v1 — Developer Edition)

**Goal:** Go from idea to live escrows in **under 1 week**.

**Time Estimate:** 4–8 hours of implementation (plus testing).

**Prerequisites:**

* Basic Web3 knowledge
* A Stellar wallet (Freighter, Albedo)
* Access to stablecoins (USDC/EURC on testnet or mainnet)

***

### **Phase 1 – Preparation (Setup & Planning)**

**1. Understand Your Use Case**

* \[ ] Define your escrow workflow: single-release (full payout at end) or multi-release (payout per milestone).
* \[ ] Map your transaction lifecycle: Initiation → Funding → Milestone Updates → Approval → Release (→ Dispute if needed).
  * 📄 [escrow-lifecycle](../technology-overview/escrow-lifecycle/ "mention")

**2. Choose the Correct Escrow Type**

* \[ ] **Single-Release** — full payout after all milestones approved.
* \[ ] **Multi-Release** — staged payouts per milestone.
  * 📄 [Escrow Types Docs](https://docs.trustlesswork.com/trustless-work/technology-overview/escrow-types)

**3. Define Roles**

Assign Stellar addresses to each role in your escrow:

* \[ ] **Approver** — approves or disputes milestones.
* \[ ] **Service Provider** — delivers work, marks milestones complete.
* \[ ] **Release Signer** — releases funds once approvals are complete.
* \[ ] **Dispute Resolver** — resolves disputes.
* \[ ] **Platform Address** — receives platform fees.
* \[ ] **Receiver** — final recipient of funds.
  * 📄 [Roles in Trustless Work](https://docs.trustlesswork.com/trustless-work/technology-overview/roles-in-trustless-work)

**4. Define Escrow Properties**

* \[ ] Asset & trustline setup
* \[ ] Amount & platform fee
* \[ ] Engagement ID (invoice/order ref)
* \[ ] Milestones (title, description, acceptance criteria)
