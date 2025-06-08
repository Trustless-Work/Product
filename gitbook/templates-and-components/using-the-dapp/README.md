---
description: Interact with Escrows Seamlessly
---

# 🤖 Using the dApp

### **Introduction**

{% embed url="https://youtu.be/wps4iH_qtrA" %}

The **Trustless Work Dapp** is the visual interface for interacting with the **Trustless Work Escrow API**. It serves as a **back-office for the escrow lifecycle**, allowing users, developers, and platforms to:\
✅ **Deploy** an escrow\
✅ **Sign** transactions\
✅ **Approve** milestones\
✅ **Release** funds\
✅ **Resolve disputes**

This tutorial will guide you through the **full escrow lifecycle** using the **Dapp UI**, breaking it into structured **phases** for clarity.

***

### **1. Getting Started**

Before using the Dapp, ensure you have the necessary **prerequisites**:

#### **1.1. Stellar Wallet Setup**

To log in, you must connect a **Stellar-compatible wallet**. Read more in the [Stellar wallets section](../../developer-resources/essential-tools-for-developers/stellar-wallets/).&#x20;

#### **1.2. Getting Testnet Tokens**

The Dapp currently operates on **Stellar Testnet**, so you’ll need:

* **XLM** (for transaction fees)
* **USDC** (to test escrow functionality)

Learn more at. [Get Testnet Tokens](./#id-1.2.-getting-testnet-tokens)

***

### **2. Full Escrow Lifecycle in the Dapp**

{% embed url="https://youtu.be/Dv7ZEmZPxBc" %}

#### **Core Phases of the Escrow Lifecycle**

This section walks through the structured process of managing a transaction using the Dapp.

#### **2.1. Initiation Phase**

📌 **Goal:** Define the escrow agreement and configure its parameters.

* Select **parties involved** (payer, receiver, approver, etc.).
* Set **milestones** and **funding conditions**.
* Deploy the **smart escrow contract**.

➡️ Step-by-step guide for Initiation

***

#### **2.2. Funding Phase**

📌 **Goal:** Deposit funds into the escrow, securing the transaction.

* The **payer** deposits funds (USDC/XLM).
* The escrow **status updates** to reflect the deposit.
* The **contract balance** is displayed in the UI.

➡️ Step-by-step guide for Funding

***

#### **2.3. Milestone Updates Phase**

📌 **Goal:** Track progress and mark work as completed.

* The **service provider** updates milestone completion.
* Status changes to **"Pending Approval"**.

➡️ Step-by-step guide for Milestone Updates

***

#### **2.4. Approval Phase**

📌 **Goal:** Approve or dispute completed milestones.

* The **payer or designated approver** reviews milestone progress.
* If approved, funds move to **pending release**.
* If disputed, the transaction enters the **Dispute Resolution Phase**.

➡️ Step-by-step guide for Approvals

***

#### **2.5. Release Phase**

📌 **Goal:** Finalize the escrow transaction by releasing funds.

* Upon milestone approval, funds are **automatically released** to the service provider.
* The escrow **status updates** to "Completed."
* The transaction is finalized.

➡️ Step-by-step guide for Releasing Funds

***

### **3. Alternative Phases (Special Cases)**

Some transactions require additional steps:

#### **3.1. Dispute Resolution Phase**

📌 **Goal:** Resolve conflicts when a milestone is disputed.

* The **dispute resolver** evaluates the case.
* Adjustments are made based on the ruling.
* Funds are either **released, partially released, or refunded**.

➡️ Step-by-step guide for Dispute Resolution

***

### **4. Additional Resources**

📖 **Guides & Tutorials**

* How to Set Up a Stellar Wallet
* How to Get Testnet Tokens
* Understanding Escrow Roles

***

#### **Next Steps**

🔹 **Ready to start?** Access the [Dapp](https://dapp.trustlesswork.com)\
🔹 Need support? Join our **Telegram** or Ask our AI.

