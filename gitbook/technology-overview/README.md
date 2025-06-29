---
description: 'High-level architecture: Smart contracts, APIs, and escrow workflows.'
---

# ⚒️ Core Concepts

Trustless Work enables **programmable, non-custodial escrows** tailored to your specific workflow. This section gives you the **mental model and primitives** to design, deploy, and scale smart escrow integrations.

***

### 🔍 What Is a Smart Escrow?

A **Smart Escrow** is a smart contract that securely holds funds and only releases them when predefined conditions are met — like a milestone being completed or approved.

Escrows on Trustless Work are:

* 🔒 **Non-Custodial** — no third-party control
* ⚙️ **Programmable** — define roles and rules
* 💵 **Stablecoin-native** — supports USDC and XLM
* ⚡ **Fast & Cheap** — runs on Stellar + Soroban

→ Explore [Smart Escrow Design](smart-escrow-design/)

***

### 🛠️ How It Works (In 3 Phases)

1. **Set Up**\
   Define roles, amount, and milestone rules
2. **Fund**\
   Lock stablecoins into the escrow contract
3. **Execute**\
   Mark, approve, and release funds based on logic

→ Dive into the [Escrow Lifecycle](escrow-lifecycle/)

***

### **How It All Works Together** 🏗️

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

### 👥 Key Roles in an Escrow

Roles determine who can:

* Mark work as complete
* Approve it
* Release or dispute funds

→ See [Roles & Responsibilities](roles-in-trustless-work.md)

***

#### ⬇️ Next Steps

* ✏️ [Customize your roles](roles-in-trustless-work.md)
* 🔄 [Test in our dApp](http://dapp.trustlesswork.com/)
* 🌐 [Deploy via API](https://github.com/Trustless-Work)
* 🎓 [Explore vertical use cases](https://dots.trustlesswork.com/use-cases)

***
