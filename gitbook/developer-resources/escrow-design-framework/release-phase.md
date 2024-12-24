# Release phase

<figure><img src="../../.gitbook/assets/release_phase.png" alt=""><figcaption></figcaption></figure>

The Release Phase is the final step in the escrow process. At this stage, funds are disbursed to the service provider (e.g., Bob) after all milestones have been approved and there are no disputes. This phase ensures the integrity of the transaction by verifying all conditions before releasing funds and marking the escrow as completed.

***

#### **Key Actions**

1. **Verification of Milestones:**
   * The escrow smart contract verifies that:
     * All milestones have their **Approved Flag** set to `True`.
     * No milestones are in a disputed state (i.e., `Approved Flag ≠ On Dispute`).
2. **Fee Deductions:**
   * The escrow contract:
     * Calculates and deducts the platform fee (e.g., Marketplace fee%).
     * Deducts the Trustless Work fixed fee (e.g., 0.3%).
3. **Funds Disbursement:**
   * The remaining funds are transferred to the **Receiver Address** (e.g., Bob's blockchain address).
   * A blockchain **Release Event** is emitted to notify all participants.
4. **Completion:**
   * The escrow contract is marked as **Completed**, signaling the successful conclusion of the transaction.

***

#### **Key Metadata**

1. **Milestone Approval Check:**
   * Confirms that all milestones are approved and undisputed.
2. **Platform Fee Deduction:**
   * Calculates and deducts the agreed platform fee from the total escrowed amount.
3. **Trustless Work Fixed Fee Deduction:**
   * Deducts a fixed fee (e.g., 0.3%) for using the Trustless Work infrastructure.
4. **Receiver Address:**
   * The blockchain address of the party receiving the released funds (e.g., Bob).
5. **Release Transaction ID:**
   * A blockchain reference (e.g., `tx456def`) for the release action, ensuring traceability.

***

#### **Key Notes**

* **Integrity of the Process:** No premature or unauthorized release occurs, as the release requires verification of milestone approval and the absence of disputes.
* **Blockchain Traceability:** All actions, including deductions and fund transfers, are recorded on-chain, ensuring transparency and auditability.
* **Final Notification:** A Release Event is emitted, notifying all participants of the transaction's conclusion.

***

#### **Phase Outcomes**

1. **Funds Transferred Securely:**
   * The service provider (Bob) receives the funds, minus platform and Trustless Work fees.
2. **Escrow Marked as Completed:**
   * The escrow status updates to reflect its successful completion.
3. **Transparency Maintained:**
   * All participants can trace the release process on-chain using the Release Transaction ID.
