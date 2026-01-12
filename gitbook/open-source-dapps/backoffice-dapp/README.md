---
description: Interact with Escrows Seamlessly
---

# 🤖 Backoffice dApp

### **Introduction**

{% embed url="https://youtu.be/wps4iH_qtrA" %}

The Backoffice dApp  is a visual interface for interacting with **Trustless Work Escrows**. It serves as a **back-office for the complete escrow lifecycle**, allowing users, developers, and platforms to:

* **Deploy** an escrow
* **Sign** transactions
* **Approve** milestones
* **Release** funds
* **Resolve disputes**

This tutorial will guide you through the **full** [**escrow lifecycle**](../../technology-overview/escrow-lifecycle/) using it.&#x20;

***

### **1. Prerequisite**

This is a web3 dApp, which mean you must connect a **Stellar-compatible wallet**. Learn how to get one in the [Stellar wallets section](../../stellar-and-soroban-the-backbone-of-trustless-work/stellar-wallets/).&#x20;

#### **1.2.  Tokens & Trustlines**

The Dapp currently works both on Mainnet and Testnet.&#x20;

You will need xlm, and an approved [Trustline](../../stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md) to the asset you will use for this to work (for the   network you are going to use it). We limited the&#x20;

***

### **2. Full Escrow Lifecycle in the dApp**

{% embed url="https://youtu.be/Dv7ZEmZPxBc" %}

#### **Core Phases of the Escrow Lifecycle**

This section walks through the structured process of managing a transaction using the Dapp.

#### **2.1. Initiation Phase**

**Goal:** Define the escrow agreement and configure its parameters.

* Assign [**roles**](../../technology-overview/roles-in-trustless-work.md) (payer, receiver, approver, etc.).
* Set **milestones** and **funding conditions**.
* Deploy the **smart escrow contract**.

[➡️ Step-by-step guide for Initiation](step-3-creating-an-escrow.md)

***

#### **2.2. Funding Phase**

**Goal:** Deposit funds into the escrow, securing the transaction.

* The **payer** deposits funds (USDC/XLM).
* The escrow **status updates** to reflect the deposit.
* The **contract balance** is displayed in the UI.

[➡️ Step-by-step guide for Funding](step-4-funding-an-escrow.md)

***

#### **2.3. Milestone Updates Phase**

**Goal:** Track progress and mark work as completed.

* The **service provider** updates milestone completion.
* Status changes to **"Pending Approval"**.

[➡️ Step-by-step guide for Milestone Updates](step-5-marking-a-milestone-as-done.md)

***

#### **2.4. Approval Phase**

**Goal:** Approve or dispute completed milestones.

* The **payer or designated approver** reviews milestone progress.
* If approved, funds move to **pending release**.
* If disputed, the transaction enters the **Dispute Resolution Phase**.

[➡️ Step-by-step guide for Approvals](step-6-approving-the-milestone.md)

***

#### **2.5. Release Phase**

**Goal:** Finalize the escrow transaction by releasing funds.

* Upon milestone approval, funds are **automatically released** to the service provider.
* The escrow **status updates** to "Completed."
* The transaction is finalized.

[➡️ Step-by-step guide for Releasing Funds](step-7-releasing-the-payment.md)

***

### **3. Alternative Phases (Special Cases)**

Some transactions require additional steps:

#### **3.1. Dispute Resolution Phase**

**Goal:** Resolve conflicts when a milestone is disputed.

* The **dispute resolver** evaluates the case.
* Adjustments are made based on the ruling.
* Funds are either **released, partially released, or refunded**.

[➡️ Step-by-step guide for Dispute Resolution](resolving-disputes.md)
