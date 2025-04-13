---
description: What is escrow? Blockchain-based escrows vs. traditional solutions.
---

# 📘 Core Concepts & Escrow Glossary

***

#### 🏦 Escrow

An arrangement in which a third party temporarily holds funds or assets on behalf of two other parties who are completing a transaction.

> In traditional finance, escrow services are often offered by banks, lawyers, or specialized custodians.

In **Trustless Work**, escrow is managed by a smart contract — no third-party custodian needed.

***

#### 🤖 Smart Escrow

A blockchain-based escrow contract that executes programmable rules.

* Automatically releases funds based on milestone completion
* Ensures no single party can unilaterally move funds
* Fully auditable and transparent

🔗 See [Understanding Smart Escrows](https://dots.trustlesswork.com/understanding-smart-escrows)

***

#### 🧠 Roles

Each participant in an escrow plays one or more roles:

* **Milestone Marker** – submits work or progress
* **Approver** – validates the work
* **Release Signer** – signs off on fund release
* **Receiver** – ultimately receives payment
* **Platform** – optionally collects fees or mediates disputes

🔗 Learn more in the [Roles & Permissions Guide](https://dots.trustlesswork.com/roles)

***

#### 🔄 Escrow Lifecycle

A structured flow that defines how a transaction progresses:

1. **Initiation** – Create the contract and define rules
2. **Funding** – Lock funds into escrow
3. **Milestone Update** – Mark work as complete
4. **Approval** – Approver verifies the milestone
5. **Release** – Funds are released
6. **Dispute Resolution** – (Optional) arbitration if there's disagreement

🔗 Full explanation: [Escrow Lifecycle](https://dots.trustlesswork.com/lifecycle)

***

#### 🪙 Stablecoin

A cryptocurrency pegged to a stable asset, such as the US dollar.

Trustless Work supports:

* USDC on Stellar
* Testnet assets for development

🔗 Setup guide: [Wallets & Testnet](https://dots.trustlesswork.com/wallets)

***

#### 🔐 Non-Custodial

Means that **no centralized party holds your funds**. Only the contract and designated signers can move assets. This is core to how Trustless Work operates.

***

#### 🧾 Engagement ID

A reference field that links an escrow to an external system — like an invoice number, contract, or project.

Useful for indexing, notifications, or dispute resolution.

***

#### ⚙️ Trustline

A setting on the Stellar network that lets an account accept a specific token.

* Required for using USDC or other stablecoins
* Trustless Work escrows require that the sender and receiver both have trustlines to the asset used

🔗 [How Trustlines Work](https://docs.stellar.org/docs/issuing-assets/an-overview-of-trustlines/)

***

#### 📊 Schema

The structure of the data that defines an escrow contract.

Common fields:

* `escrow_id`
* `engagement_id`
* `amount`
* `asset`
* `receiver`
* `approver`
* `release_signer`

🔗 Full structure in the [API Reference](https://github.com/Trustless-Work/docs)

***

#### 📚 More Concepts Coming Soon

We’re always expanding this section. Let us know what terms you'd like us to clarify!
