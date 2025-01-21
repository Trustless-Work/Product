# E-commerce Marketplace (e.g., eBay)

* **Parties:**
  * **Buyer:** Milestone Approver.
  * **Seller:** Milestone Marker, Receiver.
  * **Platform (eBay):** Release Signer, Dispute Resolver, Platform Address.
* **Fees:**
  * **Trustless Work Fee:** Charged on all transactions.
  * **Platform Fee:** Paid to the eBay platform.
* **Flow:**

**Initiation Phase:**

1. eBay deploys the escrow contract.

**Funding Phase:** 2. Buyer funds the escrow by paying for the item.

**Milestone Status Update:** 3. Seller marks the milestone as "item shipped."

**Approval Phase:** 4. Buyer confirms receipt and approves the milestone.

**Release Phase:** 5. eBay releases funds to the Seller. 6. Platform fee is deducted.

**Dispute Resolution:** 7. If the Buyer disputes (e.g., item not received), eBay resolves the issue and releases funds based on its resolution.
