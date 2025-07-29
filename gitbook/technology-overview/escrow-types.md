# Escrow Types

Trustless Work supports multiple escrow types, each tailored for different workflows. Whether you're building a marketplace, a grant platform, or a gig app, choosing the right escrow logic helps you balance simplicity, flexibility, and trust.

***

### Single-Release Escrow

A Single-Release Escrow holds funds until _all_ milestones (verifiable checkpoints, like "design done" or "code deployed") are completed and approved. Only then is the _entire_ amount released in one go. It’s built for projects where trust builds across multiple steps but payout happens once.

**Build it like this:**

1. **Deposit:** Funds are locked upfront by any party (e.g., a client) via a Stellar wallet.
2. **Milestone Completion:** The Service Provider (e.g., a freelancer) marks each milestone complete (e.g., "Logo delivered," "Site live").
3. **Approval & Release:** The Approver (e.g., the client) verifies _all_ milestones. Once all are signed off, the Release Signer (e.g., the platform) releases the full amount to the Receiver, minus any Platform fee.



<figure><img src="../.gitbook/assets/image (33).png" alt="single-release"><figcaption></figcaption></figure>

**Example:** A freelancer on a marketplace delivers a website (milestones: wireframe, design, launch). The buyer (Approver) confirms all are done, and the platform (Release Signer) releases the full payment.

***

### Multi-Release Escrow

A Multi-Release Escrow releases funds incrementally as each milestone is completed and approved. It’s designed for staged projects where trust and payments build step-by-step, reducing risk.

**Build it like this:**

1. **Deposit:** Funds are deposited upfront or in parts via Stellar wallets.
2. **Milestone Completion & Review:** The Service Provider (e.g., a DAO contributor) marks each milestone complete (e.g., "Prototype built"). The Approver (e.g., DAO voters) reviews each.
3. **Incremental Release:** For each approved milestone, the Release Signer (e.g., the platform) releases that milestone’s portion of funds to the Receiver. Dispute Resolvers handle conflicts, adjusting amounts or canceling if needed. (Note: Per-milestone payouts are coming, per doc.)

<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt="Multi-Release escrow"><figcaption></figcaption></figure>

**Example:** A DAO funds a developer for a project (milestones: code v1, v2, v3). Each milestone’s approval releases a portion of stablecoins, with a Dispute Resolver stepping in if voters contest progress.

**Why use it?**

* ✅ Flexible: Pay per milestone, not all at once.

***

| Aspect     | Single-Release                            | Multi-Release          |
| ---------- | ----------------------------------------- | ---------------------- |
| Payouts    | All at once, post all milestones          | Per milestone          |
| Use Case   | Freelance with staged checks              | Grant disbursements    |
| Complexity | Medium (multiple milestones, one release) | High (staged releases) |

### 🧪 Quickstart Tips

* Use **Single-Release** to get started fast.
* Use **Multi-Release** when you need milestone-based control.
* All escrows are **non-custodial**, programmable, and stablecoin-native.
