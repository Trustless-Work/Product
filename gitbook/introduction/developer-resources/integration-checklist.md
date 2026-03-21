---
icon: list-ol
---

# Integration checklist

**Goal:** Go from idea to live escrows in **under 1 week**.

**Time Estimate:** 4–8 hours of implementation (plus testing).

**Prerequisites:**

* Basic Web3 knowledge
* A Stellar wallet (Freighter, Albedo)
* Access to stablecoins (USDC/EURC on testnet or mainnet)

***

### **Phase 1 – Preparation (Setup & Planning)**

**1. Understand Your Use Case**

* [ ] Define your escrow workflow: single-release (full payout at end) or multi-release (payout per milestone).
* [ ] Map your transaction lifecycle: Initiation → Funding → Milestone Updates → Approval → Release (→ Dispute if needed).

📄 [escrow-lifecycle](../technology-overview/escrow-lifecycle/ "mention")

**2. Choose the Correct Escrow Type**

* [ ] 📄 [escrow-types.md](../technology-overview/escrow-types.md "mention")
* [ ] **Single-Release** — full payout after all milestones approved.
* [ ] **Multi-Release** — staged payouts per milestone.

**3. Define Roles**

Assign the parties' Stellar addresses to each role in your escrow:📄 [roles-in-trustless-work.md](../technology-overview/roles-in-trustless-work.md "mention")

* [ ] **Approver** — approves or disputes milestones.
* [ ] **Service Provider** — delivers work, marks milestones complete.
* [ ] **Release Signer** — releases funds once approvals are complete.
* [ ] **Dispute Resolver** — resolves disputes.
* [ ] **Platform Address** — receives platform fees.
* [ ] **Receiver** — final recipient of funds.

**4. Define Escrow Properties**

[what-does-a-smart-escrow-look-like.md](../technology-overview/what-does-a-smart-escrow-look-like.md "mention")

* [ ] Asset & trustline setup
* [ ] Amount & platform fee
* [ ] Engagement ID (invoice/order ref)
* [ ] Milestones (title, description, acceptance criteria)

***

### **Phase 2 – Integration (Core Setup)**

**5. Get Access**

* [ ] Sign up at [dApp](https://dapp.trustlesswork.com).
* [ ] Request **API Key** (testnet; mainnet post-audit) [request-api-key.md](request-api-key.md "mention") -> you can see the videos on the dApp landing.
* [ ] You can deploy testney & Mainnet escrows on the backoffice. Great for testing and integrating.&#x20;

**6. Install SDK / Tools** [getting-started.md](../../escrow-react-sdk/getting-started.md "mention")

* [ ] Install NPM package.
* [ ] Import SDK into your project.
* [ ] Clone or reference open-source templates for your vertical (e.g., P2P, marketplace, grant platform).
* [ ] OR: Use escrow blocks&#x20;

**7. Configure Your Escrow**

* [ ] Set roles, addresses, amount, fees, and milestones.
* [ ] Choose single-release or multi-release logic.
* [ ] Use testnet asset for initial integration.

***

### **Phase 3 – Testing (Validation & Debugging)**

**8. Deploy on Testnet**

* [ ] Create your first escrow via API or SDK.
* [ ] Fund it using a testnet wallet (e.g., Freighter, Albedo).
* [ ] Walk through milestone completion and approval flow.

**9. Simulate Edge Cases**

* [ ] Dispute handling
* [ ] Partial funding
* [ ] Timeout or cancellation flows

**10. Run Compliance & UX Review**

* [ ] KYC/AML readiness (if needed for your vertical).
* [ ] Test wallet connection & signing UX.

***

### **Phase 4 – Launch (Go Live)**

**11. Migrate to Mainnet**

* [ ] Move Trustless Work to Mainnet
* [ ] Deploy Mainnet contracts using SDK or API.
* [ ] Fund first live escrows with stablecoins.

**12. Monitor & Optimize**

* [ ] Use viewer or dApp backoffice to track escrow status, funding, and release.

***

***
