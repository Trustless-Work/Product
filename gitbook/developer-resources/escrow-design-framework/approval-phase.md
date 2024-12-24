# Approval phase

<figure><img src="../../.gitbook/assets/approval_phase.png" alt=""><figcaption></figcaption></figure>

The Approval Phase is where the client (e.g., Alice) reviews the milestone marked as **Done** by the service provider (e.g., Bob). The client must decide whether to approve or dispute the milestone based on the deliverable provided. This decision determines the next steps in the escrow process, transitioning the transaction toward completion or dispute resolution.

***

#### **Key Actions**

1. **Client Reviews the Milestone:**
   * The client (Alice) evaluates the deliverable associated with the milestone, using any supporting details or evidence provided by the service provider.
2. **Approval Decision:**
   * **Approve:** If satisfied, the client approves the milestone, updating the **Approved Flag** to `True`. This action signals that the transaction can proceed toward fund release.
   * **Dispute:** If concerns arise, the client disputes the milestone, updating the **Approved Flag** to `On Dispute`. This action pauses the transaction and escalates it to the dispute resolver.
3. **Notification and Next Steps:**
   * The escrow contract emits an event based on the client’s decision:
     * **Approval Event:** Indicates the milestone is approved and prepares the transaction for the release phase.
     * **Dispute Event:** Signals the need for dispute resolution before proceeding.

***

#### **Key Metadata**

1. **Milestone Status:**
   * **For Review:** Indicates the milestone is under client review.
2. **Approved Flag:**
   * **True:** Set when the client approves the milestone.
   * **On Dispute:** Set when the client disputes the milestone, transferring resolution authority to the dispute resolver.
3. **Dispute Metadata:**
   * Captures the client’s dispute reason or supporting evidence for the resolution process.

***

#### **Key Notes**

* **Client Authority:** The client holds the sole authority to approve or dispute milestones, ensuring their satisfaction with the deliverable.
* **Platform's Role:** The platform provides the client with tools and notifications to simplify the review process.
* **On-Chain Transparency:** All participants can track the milestone’s status and associated decisions on-chain.
* **Dispute Escalation:** When a dispute is raised, the transaction enters the dispute resolution phase, ensuring fair and transparent resolution.

***

#### **Phase Outcomes**

1. **Milestone Approved:**
   * The transaction progresses to the release phase, where funds are prepared for transfer to the service provider.
2. **Dispute Raised:**
   * The transaction enters the dispute resolution phase, pausing fund release until a resolution is achieved.
3. **Escrow Status Updated:**
   * The escrow contract reflects the milestone’s approved or disputed status, ensuring clarity for all participants.
