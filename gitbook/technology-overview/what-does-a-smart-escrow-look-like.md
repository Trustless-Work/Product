---
description: >-
  An escrow is just structured data — a JSON body that defines how funds are
  held, released, and tracked. Each property tells the contract who does what,
  when funds move, and under which conditions.
---

# Escrow Properties

TLDR:&#x20;

* _Single-Release → all milestones must be approved for one payout._
* _Multi-Release → each milestone unlocks its own payout._

Below we break down the **core properties** of every escrow, and then highlight the **differences between Single-Release and Multi-Release.**

<figure><img src="../.gitbook/assets/image (23).png" alt=""><figcaption><p>Single Release escrow</p></figcaption></figure>

### Core Structure

* **Escrow ID**\
  The on-chain identifier of the contract (also the deposit address). This is where funds are actually sent and locked.
* **Engagement ID & Title**\
  Configurable strings that help you identify the escrow in your own system — for example, linking it to an invoice, project ID, or marketplace order.
* **Description**\
  Human-readable explanation of the escrow’s purpose. Useful for context in dashboards, audits, or dispute resolution.
* **Roles**\
  Every escrow defines who can act on it:
  * _Approver_ → validates milestone completion
  * _Service Provider_ → delivers the work
  * _Platform Address_ → the platform itself, able to take fees or adjust config before funding
  * _Release Signer_ → executes the release of funds
  * _Dispute Resolver_ → arbitrates conflicts, can re-route funds
  * _Receiver_ → final destination of the funds\
    👉 See Roles for full detail.
* **Amount & Platform Fee**
  * **Single-Release**: the total `amount` to be paid once conditions are met, plus an optional `platformFee` percentage sent to the platform.
  * **Multi-Release**: the total amount is distributed across milestones (each milestone defines its own `amount`). The platform fee still applies globally.
* **Trustline**\
  Defines the token being used (address and decimals). This is how Stellar escrows know which asset to accept. Typically USDC, but any Stellar-issued token is supported.
* **Flags**\
  Internal state markers that describe what’s happening:
  * `disputed` → a party raised a dispute
  * `released` → funds have already been released
  * `resolved` → a dispute has been settled
  * `approved` (Multi-Release only) → milestone has been approved by approver

***

### Milestones

Milestones define _what must be completed to unlock funds._

* **Single-Release Escrow**
  * You can define **one or many milestones**, but the release is **all-or-nothing**.
  * Funds are only released **once all milestones are approved**.
  * Each milestone tracks:
    * `description` → what’s being delivered
    * `status` → pending, approved, in dispute, etc.
    * `evidence` (optional) → proof of delivery
    * `approvedFlag` → true when the approver signs off
* **Multi-Release Escrow**
  * Each milestone has the same properties as the single release, plus its own amount and flags.
  * When a milestone is approved, its funds can be released without waiting for others.
  * Milestones include:
    * `amount` → how much is unlocked upon approval
    * `flags` → released, disputed, resolved

This structure allows a project to fund and release in **phases**, not all at once.

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt="Multi-Release escrow"><figcaption><p>Multi-release escrow properties</p></figcaption></figure>

***

### Putting It Together

* **Single-Release** = one payout, triggered when _all milestones are approved_.\
  Amount + release & dispute flags live at the **top level** of the escrow.
* **Multi-Release** = multiple payouts, each milestone has its own amount and flags.\
  The total escrowed amount is distributed across milestones.

Both share the same core structure — IDs, roles, description, trustline, and platform fee.\
The difference is:

* **Single-Release** → milestones are “checkpoints” for one big release.
* **Multi-Release** → milestones are “tranches,” each tied to its own release.

***

### 🚀 Next Steps

* Choose [Escrow Type](escrow-types.md)
* Assign [Roles](roles-in-trustless-work.md)
* Follow [Lifecycle Phases](escrow-lifecycle/)
* Test configs in [deploy in dApp](../open-source-dapps/dapp-overview/)

