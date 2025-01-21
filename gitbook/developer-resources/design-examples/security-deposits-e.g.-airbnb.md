# Security Deposits (e.g., Airbnb)

* **Parties:**
  * **Tourist:** Milestone Marker, Receiver (if dispute resolved in their favor).
  * **Host:** Milestone Approver, Receiver (if dispute resolved in their favor).
  * **Platform (Airbnb):** Release Signer, Dispute Resolver, Platform Address.
* **Fees:**
  * **Trustless Work Fee:** Charged on all transactions.
  * **Platform Fee:** Paid to the Airbnb platform.
* **Flow:**

**Initiation Phase:**

1. Airbnb deploys the escrow contract.

**Funding Phase:** 2. Tourist deposits the security funds into escrow.

**Milestone Status Update:** 3. Tourist marks the milestone as "no damage" upon checkout.

**Approval Phase:** 4. Host reviews and approves the milestone (or disputes it if damage is found).

**Release Phase:** 5. If approved, Airbnb releases funds to the Tourist. 6. Platform fee is deducted.

**Dispute Resolution:** 7. If a dispute arises, Airbnb resolves it and releases funds to the Host if necessary.
