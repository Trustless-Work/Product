---
description: What is escrow? Blockchain-based escrows vs. traditional solutions.
---

# Core Concepts

Understanding the core principles of Trustless Work is key to unlocking its full potential. This section explains what makes Trustless Work unique, how it works, and why it’s essential for modern digital economies.

***

### **What is Escrow?**

Escrow is a neutral way to hold funds while specific conditions are met. Think of it as a **secure envelope**:

1. **Funds are deposited**: Money is placed in a trusted location.
2. **Conditions are met**: The agreed-upon tasks or milestones are achieved.
3. **Funds are released**: The money is sent to the intended recipient.

In traditional setups, escrow is managed by centralized entities like banks or lawyers. Trustless Work replaces these intermediaries with **blockchain-powered smart contracts**.

***

### **Why Use Blockchain for Escrows?**

Traditional escrows come with inefficiencies, such as high fees, slow processing times, and limited transparency. Blockchain technology eliminates these challenges by offering:

* **Decentralization**: No single point of control or failure.
* **Transparency**: Every transaction is verifiable on the blockchain.
* **Immutability**: Smart contracts ensure funds are handled exactly as programmed.

Trustless Work builds on **Stellar’s Soroban** smart contract platform, combining the low costs and high speed of Stellar with the power of decentralized automation.

***

### **How Trustless Work Escrows Operate**

#### **1. Setup**

* A smart escrow is configured using Trustless Work’s API.
* Key parameters include:
  * **Amount**: The value being held.
  * **Roles**: Learn more about roles [here](../smart-escrow-design/roles-in-trustless-work.md)
  * **Milestones**: Rules for releasing funds.

#### **2. Funding**

* The payer deposits funds into the escrow.
* Funds are securely held on the blockchain, ensuring they cannot be tampered with.

#### **3. Milestone Updates**

* The service provider updates the escrow status.

#### **4. Approval or Dispute**

* The client approves the release of funds.
* In case of disputes, the escrow holds the funds until the issue is resolved by Dispute Resolver.

#### **5. Release**

* Once conditions are met, funds are released to the recipient.
* A small fee (0.3%) is deducted as a commission for Trustless Work.
* Extra Fee can be configured for the platform.&#x20;

***

### **Key Features of Trustless Work Escrows**

* **Customizable**: Configure escrows for a variety of use cases, from marketplaces to crowdfunding.
* **Cost-Efficient**: Leverage Stellar’s low transaction fees.
* **API-First**: Seamless integration into your platform using simple API calls.
* **Open-Source Templates**: Accelerate implementation with ready-to-use configurations.

***

### **Traditional vs. Trustless Escrows**

| **Feature**       | **Traditional Escrow**     | **Trustless Work Escrow**       |
| ----------------- | -------------------------- | ------------------------------- |
| **Speed**         | Slow (manual processes)    | Instant (blockchain-based)      |
| **Fees**          | High (bank/lawyer fees)    | Low (0.3%-0.5%)                 |
| **Transparency**  | Limited                    | Full visibility                 |
| **Accessibility** | Region-locked              | Global reach                    |
| **Control**       | Centralized intermediaries | Decentralized (smart contracts) |

***

### **Benefits of Trustless Work**

* **For Developers**: Simplify payment workflows with an API-driven approach.
* **For Businesses**: Build trust and reduce fraud in transactions.
* **For Innovators**: Unlock new business models using blockchain escrows.

***

### **Next Steps**

* Dive deeper in our [Technolgy Overview.](../technology-overview/)
* Explore [API Reference](../developer-resources/api-reference/) to see how to implement these concepts in your platform.
* Learn about [Use Cases](../use-cases-unlocking-the-potential-of-smart-escrows/).
