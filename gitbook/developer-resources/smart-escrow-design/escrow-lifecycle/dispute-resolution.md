# Dispute Resolution

<figure><img src="../../../.gitbook/assets/dispute_resolution.png" alt=""><figcaption></figcaption></figure>

The Dispute Resolution Phase is triggered when the client (e.g., Alice) raises a dispute during the Approval Phase. This phase involves a thorough review by the designated dispute resolver (e.g., the platform, Marketplace) to determine how the funds should be allocated. The escrow contract remains in a locked state, with no funds released, until the dispute is resolved.

***

#### **Key Actions**

1. **Raising a Dispute:**
   * The client (Alice) identifies issues with the milestone deliverable and raises a dispute.
   * Evidence or supporting documentation (e.g., screenshots, contracts, delivery notes) is submitted to the dispute resolver.
   * The escrow contract updates:
     * **Milestone Status:** Set to **In Dispute.**
     * **Approved Flag:** Updated to reflect the dispute status.
2. **Dispute Resolver Review:**
   * The dispute resolver (Marketplace) reviews the case, including:
     * Evidence provided by the client.
     * Responses or counter-evidence from the service provider (Bob).
   * The resolver makes a decision on fund allocation (e.g., full refund to client, partial payment to service provider).
3. **Escrow Contract Updates:**
   * Based on the resolver’s decision, the escrow contract is updated with:
     * **Resolver Decision:** Details of the resolution.
     * **Updated Amounts:** Adjustments to the escrowed funds (e.g., splitting funds, issuing a refund).
4. **Final Approval and Resolution:**
   * The resolver sets the **Final Approval Flag** to `True,` enabling the transaction to proceed to the Release Phase.
   * The escrow emits an event, notifying all participants of the resolution.

***

#### **Key Metadata**

1. **Milestone Status:**
   * **In Dispute:** Indicates the milestone is under review by the dispute resolver.
2. **Dispute Details:**
   * Captures the client’s reason for raising the dispute, supported by evidence.
3. **Resolver Decision:**
   * Contains the final decision, including updated allocations of funds.
4. **Updated Amounts:**
   * Reflects any changes to the original escrowed amount based on the resolution.
5. **Final Approval Flag:**
   * Set to `True` once the dispute is resolved, enabling the transition to the Release Phase.

***

#### **Key Notes**

* **Transparency and Fairness:** The dispute resolver ensures a neutral and unbiased resolution process, with all decisions recorded on-chain.
* **Evidence-Based Decisions:** Supporting documentation and evidence are critical to the resolution process, providing clarity for all parties involved.
* **Locked State:** While in dispute, the escrow contract prevents any unauthorized release of funds, safeguarding all participants.

***

#### **Phase Outcomes**

1. **Resolution Achieved:**
   * Funds are allocated according to the dispute resolver’s decision, ensuring a fair outcome for both parties.
2. **Escrow Prepared for Release:**
   * The Final Approval Flag is set, enabling the transaction to transition to the Release Phase.
3. **Dispute Transparency Ensured:**
   * All resolution details, including fund adjustments and final decisions, are recorded and visible to participants.
