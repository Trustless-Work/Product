# Complete phase

{% hint style="info" %}
This explanation is for the Multiple-release type of contract (to be available soon). The single release is very similar, just that there is only one release if and only if all milestones are approved.&#x20;
{% endhint %}

<figure><img src="../../../.gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

The Milestone Status Update Phase is where the **Milestone Marker** signals progress by marking a milestone as completed. This step is critical for keeping all participants informed about the transaction's progress and prepares the milestone for review by the **Milestone Approver** in the subsequent Approval Phase.

***

#### **Key Actions**

**1. Milestone Marker Updates Milestone Status**

* The **Milestone Marker** logs into the platform or uses the Trustless Work API to update the milestone status to **For Review**, he signs the transaction, signaling the completion of the deliverable.

**2. Escrow Contract Updates**

* Upon the signed update, the escrow contract:
  * Changes the milestone status to **For Review**.
  * Retains the **Approved Flag** as `False` until explicitly approved or disputed by the **Milestone Approver**.

**3. Notification to Milestone Approver**

* The platform detects the status update and notifies the **Milestone Approver** that the milestone is ready for review.

**4. Transparency for All Participants**

* All participants, including the **Milestone Marker**, **Release Signer**, and **Platform Address**, can view the updated milestone status:
  * On-chain via the transaction ID or Stellar block explorer.
  * Through the **Escrow Viewer** or by querying the Trustless Work API.

***

#### **Key Metadata**

1. **Milestone Status:**
   * **For Review:** Indicates the milestone is ready for approval or dispute.
2. **Approved Flag:**
   * **Default = False:** Remains unchanged until explicitly approved or disputed by the client.
3. **Progress Details (to be added):**
   * Optional fields can include:
     * Delivery notes.
     * Evidence of completion (e.g., reference IDs or uploaded documentation).

***

#### **Key Notes**

* **Blockchain Visibility:** All participants can view the updated milestone status on-chain, ensuring transparency and traceability of progress.
* **Platform Notifications:** The platform plays a key role in notifying the client (Alice) about the milestone update, facilitating smooth communication.
* **Optional Progress Details:** The service provider can add supporting details or documentation (e.g., delivery receipts, tracking numbers) to enhance transparency.

***

#### **Phase Outcomes**

1. **Milestone Progress Recorded:**
   * The service provider’s update is recorded on-chain, ensuring transparency and traceability.
2. **Client Notified for Review:**
   * The client (Alice) is notified to review the milestone and take action in the next phase.
3. **Escrow Contract Reflects Progress:**
   * The escrow contract’s milestone status is updated, preparing the transaction for the Approval Phase.
