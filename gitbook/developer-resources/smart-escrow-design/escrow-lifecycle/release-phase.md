# Release phase

<figure><img src="../../../.gitbook/assets/Release Sign.png" alt=""><figcaption></figcaption></figure>



The Release Phase is initiated when the **Release Signer** approves the release of funds. This triggers the escrow smart contract to perform verification checks, deduct fees, and securely disburse funds to the **Receiver**. The escrow is then marked as completed, concluding the transaction.

***

#### **Key Actions**

**1. Triggering the Release**

* The **Release Signer** signs the release transaction, signaling the intent to disburse funds.
* The escrow smart contract initiates the release process.

**2. Verification of Milestones**

* The escrow smart contract verifies:
  * All milestones have their **Approved Flag** set to `True`.
  * No milestones are in a disputed state (**Approved Flag ≠ On Dispute**).

**3. Fee Deductions**

* Upon successful verification, the escrow contract calculates and deducts:
  * The **Platform Fee** (e.g., Marketplace fee%) as configured during the Initiation Phase.
  * The **Trustless Work Fee** (e.g., 0.3%).

**4. Funds Disbursement**

* The remaining funds are transferred to the **Receiver Address** designated during the Initiation Phase

**5. Completion**

* The escrow contract is marked as **Completed**, signaling the successful conclusion of the transaction.

***

#### **Key Metadata**

**1. Release Signer**

* The entity responsible for triggering the release by signing the transaction.

**2. Milestone Approval Check**

* Confirms that:
  * All milestones are approved (`Approved Flag = True`).
  * No unresolved disputes exist.

**3. Fee Deductions**

* **Platform Fee Deduction:** Calculated and deducted from the total escrowed amount.
* **Trustless Work Fee Deduction:** A fixed percentage (e.g., 0.3%) is deducted for using the Trustless Work infrastructure.

**4. Receiver Address**

* The blockchain address of the **Receiver**, who will receive the funds (e.g., Freelancer, Host, Company).

**5. Release Transaction ID**

* A blockchain reference (e.g., `tx456def`) for the release action, ensuring traceability and transparency.

***

#### **Phase Outcomes**

**1. Funds Transferred Securely**

* The **Receiver** (e.g., Freelancer, Host) receives the funds, minus the **Platform Fee** and **Trustless Work Fee**.

**2. Escrow Marked as Completed**

* The escrow status is updated to **Completed**, reflecting the transaction's successful conclusion.

**3. Transparency Maintained**

* All participants can trace the release process on-chain using the **Release Transaction ID**, ensuring full visibility and trust.

