# Initiation Phase

<figure><img src="../../../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

The **Initiation Phase** is where the escrow takes shape.

You’re not moving money yet — you’re defining the logic that will _govern_ how it moves later.

Think of this as the **architecture of trust**: setting the rules, actors, and conditions before anything hits the chain.

&#x20;**Participants and Roles**

In the initiation phase key roles are assigned to specific parties. These roles determine responsibilities and actions throughout the transaction.

***

### 🎭 Define the Roles

Every escrow is role-based — meaning only specific addresses can perform specific actions.

You can [read more about roles here → Roles in Trustless Work](https://chatgpt.com/g/g-p-6849f5b035a88191b0faae5593cab5e8-tw-content/c/690d2534-f8b8-832d-bcc2-dc3108a4f1a3).

During initiation, you assign which addresses will act as:

* **Milestone Marker (Service Provider)** — delivers work and marks milestones as done
* **Approver** — validates each milestone and can raise disputes
* **Release Signer** — triggers the release of funds once conditions are met
* **Dispute Resolver** — resolves conflicts and reallocates funds
* **Receiver** — the final destination of funds
* **Platform Address** — the address of the platform itself (receives a percentage fee and can adjust configuration before funding)

> 🔑 Roles are permissions, not identities.
>
> The same wallet can hold more than one role, depending on your workflow.

***

### 💰 Decide the Amounts and Milestones

This is where you define **what gets paid, and when**.

* For a **Single-Release escrow**, you’ll have **one total amount** and **one receiver**.
  * The payment only happens once, after all milestones are approved.
  * Example: a one-off design project or security deposit.
* For a **Multi-Release escrow**, you’ll define **multiple milestones**, each with:
  * Its **own amount**
  * Its **own receiver**
  * Its **own flags and status**

This structure allows you to fund once and pay multiple parties or stages over time.

> 💡 You can even add milestones later — turning one escrow into an ongoing contract.

***

### 🪙 Select the Trustline (Asset Configuration)

On Stellar, every token (like USDC) is identified by its **issuer address**.

To hold that token, your wallet must explicitly “trust” that issuer — this is called a **Trustline**.

*   When you create an escrow, you must define which **trustline** (asset) it will hold.

    Example: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` = USDC.
*   All participating addresses (Approver, Marker, Release Signer, etc.) must have that trustline enabled in their wallet.

    Otherwise, they won’t be able to receive or send that asset.

> ⚠️ Without the trustline set, the transaction will fail — so ensure every role wallet is ready before deployment.

***

### 🧾 Assign the Engagement ID (Reference Tracking)

Every escrow includes an **Engagement ID**, which acts like your external reference number.

It’s a human-readable tag that connects the on-chain escrow to your off-chain logic.

Examples:

* `ORDER_2025_00234`
* `INVOICE_98B-13`
* `DAO_GRANT_ROUND2`

> The Engagement ID is optional for blockchain logic, but essential for indexing and analytics.
>
> It lets platforms query, group, and monitor escrows easily through the API or the viewer.

***

### ⚙️ Configure Platform Fee

Platforms can earn a **Platform Fee** on each escrow.

This fee is taken at release, alongside the protocol’s **0.3% Trustless Work fee**.

* Example:
  * Platform Fee = 1%
  * Trustless Fee = 0.3%
  * Total deduction = 1.3% (automatically split between platform and protocol)

The platform fee is sent to the **Platform Address** defined in the roles.

> 💡 For marketplaces and SaaS platforms, this is a native monetization layer built into the escrow logic — no separate billing flow required.

***

### 📦 Output of the Initiation Phase

At the end of Initiation, you have:

* A **complete schema** defining every role, milestone, fee, and asset
* A **trustline** selected and validated for all participants
* An **engagement ID** linking your escrow to external records
* A **clear understanding** of what needs to happen before any money moves

This is the blueprint.

Once finalized, it’s deployed to the blockchain as an immutable contract.

From here on, every signature, approval, or release event happens _on-chain_.

Also, you should be able to view the escrow and it’s configuration on the escrow viewer or on Stellar expert.

***
