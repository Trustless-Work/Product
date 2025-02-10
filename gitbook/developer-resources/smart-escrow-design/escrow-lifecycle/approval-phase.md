# Approval phase

<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

The Approval Phase is where the **Milestone Approver** evaluates the milestone marked as **For Review** by the **Milestone Marker**. This critical step determines whether the milestone is approved or disputed, dictating the next steps in the escrow process and transitioning the transaction toward completion or resolution.

***

#### **Key Actions**

**1. Milestone Approver Reviews the Milestone**

* The **Milestone Approver** evaluates the deliverable or service associated with the milestone, referencing any supporting evidence or details provided by the **Milestone Marker**.

**2. Decision: Approve or Dispute**

* **Approve:**
  * If satisfied, the **Milestone Approver** approves the milestone.
  * The **Approved Flag** is updated to `True`, signaling that the transaction can proceed toward the **Release Phase**.
* **Dispute:**
  * If concerns arise, the **Milestone Approver** disputes the milestone.
  * The **Approved Flag** is updated to `On Dispute`, pausing the transaction and escalating it to the **Dispute Resolver**.

Next Steps:\
\
the approved / dispute flag determines what Next step on the excrow lifecycle is enabled.&#x20;

If the milestone is approved, the Release is possible,

If a dispute is raised, the dispute resolver must set a resolution and either update the amount, or cancel the milestone.&#x20;

***

#### **Key Metadata**

**1. Milestone Status**

* **For Review:** Indicates the milestone is under review by the **Milestone Approver**.
* **On Dispute:** Set when the milestone is disputed, triggering resolution by the **Dispute Resolver**.

**2. Approved Flag**

* **True:** Set when the **Milestone Approver** approves the milestone.

***

#### **Key Notes**

* **Milestone Approver Authority:**\
  The **Milestone Approver** has sole authority to approve or dispute milestones, ensuring their satisfaction with the deliverable.
* **Platform's Role:**\
  The platform facilitates the review process by providing tools and notifications to assist the **Milestone Approver**.
* **On-Chain Transparency:**\
  All participants, including the **Milestone Marker**, **Release Signer**, and **Platform Address**, can track the milestone’s status and associated decisions on-chain.
* **Dispute Escalation:**\
  Disputes trigger the transaction to enter the **Dispute Resolution Phase**, ensuring fair and transparent resolution before proceeding.
