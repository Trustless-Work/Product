# Crowdfunding (e.g., Kickstarter)

* **Parties:**
  * **Donors:** Funders.
  * **Company (Project Creator):** Milestone Marker, Receiver.
  * **Platform (Kickstarter):** Milestone Approver, Release Signer, Dispute Resolver, Platform Address.
* **Fees:**
  * **Trustless Work Fee:** Charged on all transactions.
  * **Platform Fee:** Paid to the Kickstarter platform.
* **Flow:**

**Initiation Phase:**

1. Kickstarter deploys the escrow contract.

**Funding Phase:** 2. Donors fund the escrow with their contributions.

**Milestone Status Update:** 3. The Company marks the milestone as completed (e.g., product shipped or campaign milestone achieved).

**Approval Phase:** 4. Kickstarter reviews and approves the milestone.

**Release Phase:** 5. Kickstarter releases funds to the Company. 6. Platform fee is deducted.

**Dispute Resolution:** 7. If a dispute arises (e.g., the campaign fails to deliver), Kickstarter resolves it and refunds funds to the Donors as necessary.
