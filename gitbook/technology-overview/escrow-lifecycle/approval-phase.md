# Approval phase

<figure><img src="../../.gitbook/assets/image (6) (1).png" alt=""><figcaption></figcaption></figure>

## Phase 4 — Approval (Validating Progress and Unlocking Readiness)

After the Service Provider updates a milestone’s status, the **Approver** steps in.\
This is the phase where intent meets validation — the moment a platform or client officially confirms that progress is satisfactory.

Approval is the **green light** that tells the escrow:

> “This milestone has met the conditions. It can now move toward payment.”

***

### 🧾 What Approval Means

Approving a milestone doesn’t move funds yet — it simply updates the milestone’s internal flag:\
`approved: true`

That single flag transforms the milestone from _in progress_ to _ready for release_.

It’s a lightweight change in data but a heavy one in meaning — because once approved, the milestone is permanently recorded as validated.\
There’s no “unapprove” function.\
The decision becomes part of the escrow’s history.

***

### 👤 Who Approves

Only the **Approver** — the wallet assigned to that role — can sign the approval.\
This address is often:

* The **buyer** in a freelance contract,
* The **sponsor** in a grant,
* Or the **platform logic** in automated or multi-party flows.

The Approver’s signature confirms that:

1. The milestone has been delivered satisfactorily, and
2. The platform can now safely move toward release.

***

### 🔁 How Approval Works Across Escrow Types

#### **Single-Release Escrow**

* All milestones must be approved before any funds can move.
* Once every milestone carries the `approved: true` flag, the escrow becomes “ready for release.”
* The Release Signer can then execute the payout in one transaction.

#### **Multi-Release Escrow**

* Each milestone has its own approval and release logic.
* Approving one milestone makes _that milestone’s funds_ eligible for release, regardless of others.
* This allows multiple, independent approval-release cycles within the same escrow.

> 🧩 **In short:**
>
> * **Single-Release** → approval is collective (all or nothing).
> * **Multi-Release** → approval is modular (one milestone at a time).

***

### 🪶 The Freedom of Approval Timing

Approvals can happen at any moment, regardless of the milestone’s current “status” text.

Even if the Service Provider used a custom status like _“Under Review”_ or _“In Transit”_,\
the Approver can sign approval immediately if they’re satisfied.

That flexibility allows each platform to define its own logic — maybe auto-approving after a timer, or requiring manual review before payment.

Once approved:

* The milestone’s `approved` flag turns **true**,
* The escrow recognizes that milestone as complete,
* And it remains approved for the rest of its lifecycle.

***

### 🧩 Relation to Disputes and Release

Approval is also what separates smooth transactions from disputes.\
If the Approver signs, the flow advances to **Release**.\
If they refuse or challenge, the same milestone can instead move into **Dispute Resolution**.

> 🧭 Approval is the fork in the road —\
> One path leads to payment, the other to mediation.

***

### 📦 Outcome of the Approval Phase

By the end of this phase:

* The milestone’s `approved` flag is set to **true**.
* The escrow recognizes that milestone as _ready for release_.
* The approval event is permanently logged on-chain.
* Participants can view the approval in real time through the [**Escrow Viewer**](https://viewer.trustlesswork.com).

> 💡 Approval doesn’t release funds — it unlocks the ability to.\
> It’s the signal that work is accepted, and the escrow can now fulfill its purpose.
