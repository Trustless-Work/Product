---
description: 'High-level architecture: Smart contracts, APIs, and escrow workflows.'
---

# ⚒️ Core Concepts

### 🔍 What Is a Smart Escrow?

A **Smart Escrow** is a smart contract that securely holds funds and only releases them when predefined conditions are met — like a milestone being completed or approved.

Escrows on Trustless Work are:

* 🔒 **Non-Custodial** — no third-party control
* ⚙️ **Programmable** — define roles and rules
* 💵 **Stablecoin-native** — supports USDC and XLM
* ⚡ **Fast & Cheap** — runs on Stellar + Soroban

→ Explore [Smart Escrow Design](smart-escrow-design/)

***

**🧩 Escrow Types**

* **Single-Release** — One payout, one approval, done.
* **Multi-Release** — Break it into milestones. Pay over time.

***

**🔄 Escrow Lifecycle**

Every escrow follows a flow:

1. **Initiate** the rules
2. **Fund** it with stablecoins
3. **Mark** progress
4. **Approve** the work
5. **Release** the funds\
   (6. **Dispute**, if needed)

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

→ Dive into the [Escrow Lifecycle](escrow-lifecycle/)

***

**🧑‍⚖️ Roles & Permissions**

Each action is signed by a wallet:

* Marker → says work is done
* Approver → confirms it
* Releaser → sends funds
* Resolver → handles disputes
* Receiver → gets paid

→ See [Roles & Responsibilities](roles-in-trustless-work.md)

***

**📦 Escrow as Data**

Every escrow is just a **JSON config**. You define:

* Roles
* Milestones
* Token to use
* Fees (optional)

Then deploy it via API or dApp. Done.

***

#### ⬇️ Next Steps

* ✏️ [Customize your roles](roles-in-trustless-work.md)
* 🔄 [Test in our dApp](http://dapp.trustlesswork.com/)
* 🌐 [Deploy via API](https://github.com/Trustless-Work)
* 🎓 [Explore vertical use cases](https://dots.trustlesswork.com/use-cases)

***
