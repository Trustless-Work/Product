# Dispute Resolution

<figure><img src="../../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

The Dispute Resolution Phase is triggered when either the client or the service provider raises a dispute. This phase involves a review by the designated dispute resolver (e.g., the platform, Marketplace) to determine how the funds should be allocated. The escrow contract remains in a locked state, with no funds released, until the dispute is resolved.

***

#### **Key Actions**

1. **Raising a Dispute:**
   * The client (or Service Provider) identifies issues with the milestone deliverable and raises a dispute.
   * Evidence or supporting documentation (e.g., screenshots, contracts, delivery notes) is submitted to the dispute resolver (As a URL)
   * The escrow contract updates:
     * **Milestone Status:** Set to **In Dispute.**
     * **Dispute Flag:** Updated to reflect the dispute status.
2. **Dispute Resolver Review:**
   * The dispute resolver (Marketplace) reviews the case, including:
     * Evidence provided by the client.
     * Responses or counter-evidence from the service provider (Bob).
   * The resolver makes a decision on fund allocation (e.g., full refund to client, partial payment to service provider).
3. **Escrow Contract Updates:**
   * Based on the resolver’s decision, the escrow contract is called for the release with:
     * **Funds for Service Provider:** Amount to be sent to service provider
     * **Funds for Client:** Amount to be sent back to the client
4. **Sign and Release:**
   * The resolver signs the resolution, releasing payment as set and setting the released flag to TRUE

***

#### **Key Metadata**

1. **Milestone Status:**
   * **In Dispute:** Indicates the milestone is under review by the dispute resolver.
2. **Resolver Decision:**
   * Contains the final decision, including updated allocations of funds.
3. **Updated Amounts:**
   * Reflects any changes to the original escrowed amount based on the resolution.
4. **Final Approval Flag:**
   * Set to `True` once the dispute is resolved, enabling the transition to the Release Phase.

***

#### **Phase Outcomes**

1. **Resolution Achieved:**
   * Funds are allocated according to the dispute resolver’s decision, ensuring a fair outcome for both parties.
2. **Escrow Prepared for Release:**
   * The resolution is set, enabling the transaction to transition to the Release Phase.
3. **Dispute Transparency Ensured:**
   * All resolution details, including fund adjustments and final decisions, are recorded and visible to participants.
