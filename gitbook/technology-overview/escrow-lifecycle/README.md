---
description: >-
  The escrow lifecycle is the structured flow of actions and responsibilities
  that secure a transaction. At Trustless Work, we break this into clear phases,
  ensuring transparency, adaptability, and cons
---

# Escrow Lifecycle

{% embed url="https://youtu.be/Dv7ZEmZPxBc" %}

## Core Phases:

#### **1. Initiation Phase:**

The foundation of the escrow:

* Roles and responsibilities are defined
* Transaction terms (amount, milestones, fees, trustline) are set
* The escrow contract is created on-chain

&#x20;[Learn More](initiation-phase.md)

#### **2. Funding Phase:**

* Anyone can deposit funds
* Once funded, the escrow is live and ready for milestone tracking

. [Learn More](funding-phase.md)

#### **3. Milestone Updates Phase:**

* Marked as completed
* Optional evidence or proof can be added
* Provides visibility for review

[Learn More](milestone-status-update.md)

#### 4. Approval

Milestones are reviewed by the **Approver**.

* Can approve if conditions are met
* Can raise a dispute if unsatisfied

Approval moves the escrow closer to payout.

&#x20;[Learn More](approval-phase.md)

#### 5. Release

The **Release Signer** authorizes payout.

* **Single-Release** → all milestones must be approved before one payout
* **Multi-Release** → funds are released milestone by milestone

Funds are transferred to the **Receiver**, minus any platform fee.

&#x20;[Lean More](release-phase.md)

***

### ⚠️ Alternative Phase: Dispute Resolution

If any party raises a dispute, the lifecycle takes a detour:

#### Dispute Resolution

* **Dispute Resolver** steps in to resolve the conflict
* Can redirect funds, adjust milestones, or cancel the escrow
* Outcomes can be:
  * Full refund to client
  * Partial refund
  * No refund (funds go to provider)

[Learn more](dispute-resolution.md)
