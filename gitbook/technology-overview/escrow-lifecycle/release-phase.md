# Release phase

<figure><img src="../../.gitbook/assets/image (8) (1).png" alt=""><figcaption></figcaption></figure>

## Phase 5 — Release (Executing the Payout)

The **Release Phase** is where everything comes together — approvals turn into payouts, and logic turns into money movement.\
This is the only phase that actually _moves funds_ out of the escrow and into the hands of the receivers.

It’s also the most restricted phase:

> Only the **Release Signer** can execute the release.

***

### 🔑 Who Can Release Funds

Every escrow designates one address as the **Release Signer**.\
That wallet — and _only_ that wallet — can authorize the transfer of funds out of the escrow contract.

Depending on your workflow, this role can be configured in two main ways:

* **As a “push” model** — the platform or a neutral signer triggers the release to the receiver.
* **As a “claim” model** — the receiver _is also_ the release signer, meaning they can claim their own funds once approved.

Both options are valid, and each suits a different kind of use case:

| Use Case                           | Release Pattern | Example                                                        |
| ---------------------------------- | --------------- | -------------------------------------------------------------- |
| **Freelance marketplaces**         | Push            | Platform acts as release signer, paying out after approval     |
| **Escrow-based payouts or grants** | Claim           | Receivers themselves trigger withdrawal                        |
| **Automated dApps or DAO tooling** | Push or Claim   | Logic bots or scripts trigger release conditions automatically |

***

### 🧭 What Must Be True Before Release

The escrow enforces strict verification before funds can move.

#### **Single-Release Escrow**

* All milestones must have their `approved` flag set to **true**.
* No milestone can be in dispute.
* Once verified, the contract releases the **entire escrowed amount** (minus fees) to the receiver.

#### **Multi-Release Escrow**

* Only the milestone(s) being released need to be approved.
* Each milestone can be released independently.
* The contract disburses only the approved milestone’s amount to its corresponding receiver.

> 🧩 In essence:
>
> * **Single-Release:** “Release everything.”
> * **Multi-Release:** “Release just this part.”

***

### ⚙️ What Happens When Release is Signed

When the Release Signer executes the transaction:

1. The contract verifies all conditions.
2. It calculates deductions:
   * **Platform Fee** (set during initiation, e.g., 1%)
   * **Trustless Work Fee** (protocol fee, fixed at 0.3%)
3. It transfers the remaining balance to the receiver’s address.
4. It updates the milestone (or entire escrow) with:
   * `released: true`
   * A release transaction hash (visible on-chain).

This event becomes a permanent, auditable record of payout completion.

***

### 💬 Push vs. Claim — Two Faces of Release

#### **Push**

* The Release Signer (platform or operator) sends funds out proactively.
* Ideal for platforms that handle fund flow on behalf of users.
* Provides an extra layer of control and compliance.

#### **Claim**

* The Receiver _is also_ the Release Signer.
* They simply “claim” their approved funds directly from escrow.
* Ideal for trust-minimized environments, grants, or bounty-style setups.

> 🧠 Both flows coexist within Trustless Work.\
> The release logic doesn’t care _who_ presses the button — only that the signer has permission.

***

### 🌐 Visibility and Traceability

Every release emits a **Release Event** — a blockchain record containing:

* The escrow ID (contract address)
* The milestone(s) released
* The receiver address
* Amount sent
* Platform and protocol fees deducted

You can view these transparently through:

* [**Escrow Viewer**](https://viewer.trustlesswork.com) — human-readable milestone and release records
* [**Stellar Expert**](https://stellar.expert) — raw transaction details for verification and audit trails

***

### 📦 Outcome of the Release Phase

By the end of this phase:

* The approved milestones (or full escrow) have been paid out.
* Platform and Trustless Work fees have been distributed.
* The escrow contract updates its flags (`released: true`) accordingly.
* A complete payout record is available both on-chain and in the Viewer.

> 💡 The Release Phase is where trust becomes settlement —\
> money leaves the neutral zone and reaches its rightful destination.

