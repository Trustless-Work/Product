# Dispute Resolution

<figure><img src="../../.gitbook/assets/image (10) (1).png" alt=""><figcaption></figcaption></figure>

## Phase 6 — Dispute Resolution (When Trust Meets Judgment)

No matter how well-designed a process is, disagreements happen.\
That’s why every Trustless Work escrow includes a final safeguard: **Dispute Resolution**.

This phase ensures that when parties disagree on delivery or results, funds don’t vanish into uncertainty.\
They stay locked in the escrow until a **Dispute Resolver** decides where they should go.

***

### ⚖️ The Role of the Dispute Resolver

The **Dispute Resolver** is the only address authorized to intervene once a dispute is raised.\
This role represents a **neutral authority** — it can be:

* A **platform’s customer support** team mediating between users
* A **DAO-based arbitration module**
* A **trusted third party or auditor**
* Or, in advanced setups, a **decentralized dispute resolution DAO**

The resolver’s job is to review both sides, look at the evidence, and decide how the locked funds will be distributed.

***

### 🧾 How a Dispute Is Raised

Disputes can be triggered by either:

* The **Service Provider** (e.g., claiming they delivered as promised), or
* The **Approver** (e.g., claiming the work was unsatisfactory).

Once raised:

* The milestone or escrow’s `disputed` flag is set to **true**.
* The contract enters a locked state — meaning **no further releases** can happen until it’s resolved.
* All updates and evidence remain visible on-chain for transparency.

***

### 🧠 How the Resolver Makes a Decision

The Dispute Resolver signs a **resolution transaction** that includes:

1. A **list of addresses and amounts** to re-route the funds to.
2. Optional **evidence** or reasoning (usually an off-chain link or case reference).

> 💡 This flexible format replaces the older binary system (refund or payout).\
> It allows more nuanced outcomes — partial refunds, multi-party settlements, or even new allocations in special cases (like shared credit lines or pooled contributions).

***

### 🔄 Transparency and Traceability

Every resolution is **publicly verifiable** and **immutable**:

* The contract emits a **Resolution Event** containing all the distributions.
* These amounts become part of the escrow’s historical record.
* Anyone can inspect who received what, when, and why.

This creates **transparent, tamper-proof accountability** — essential for platforms that need audit trails, regulatory compliance, or internal oversight.

You can verify resolution details directly in:

* [**Escrow Viewer**](https://viewer.trustlesswork.com) — structured breakdown of resolution outcomes
* [**Stellar Expert**](https://stellar.expert) — raw transaction data and event logs

***

### 👥 Who Plays This Role in Practice

Depending on the ecosystem, the Dispute Resolver can be implemented in different ways:

| Scenario                          | Dispute Resolver                          | Example                                             |
| --------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| **Marketplace or SaaS Platform**  | Platform’s customer support team          | Upwork, Fiverr-style review desk                    |
| **Grants or DAOs**                | Governance contract or arbitration module | Community voting or delegated resolution            |
| **Private Credit & Finance**      | Escrow manager or legal agent             | Adjusts amounts between borrower, lender, guarantor |
| **P2P / Trust-Minimized Systems** | Decentralized arbitration                 | Uses smart contracts or on-chain juries             |

> 🧩 The role is flexible — the key is that the resolver’s actions are traceable, transparent, and signed.

***

### 🪶 Evidence and Off-Chain Storage

Resolvers can attach **evidence** to their decisions — for example:

* Case reports
* Proof of refund agreements
* Links to decentralized storage (IPFS, Arweave, Filecoin)

Trustless Work stores only the **reference** (the URL or hash), not the file itself.\
This keeps the on-chain data light while preserving a full trail of proof.

***

### 📦 Outcome of the Dispute Resolution Phase

By the end of this phase:

* The **Dispute Resolver** has signed and submitted a resolution transaction.
* Funds have been re-routed according to the distribution list.
* The escrow’s `resolved` flag is set to **true**.
* All movements are publicly visible and auditable.

> 💡 The Dispute Phase proves that even in disagreement, trust can remain programmable.\
> No hidden decisions — every outcome is on-chain, traceable, and final.
