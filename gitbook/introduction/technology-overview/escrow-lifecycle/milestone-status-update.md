# Change Milestone Status

<figure><img src="../../../.gitbook/assets/image (5) (1) (1).png" alt=""><figcaption></figcaption></figure>

## Phase 3 — Change Milestone Status (Signaling Progress)

Once the escrow is funded, the work begins.\
This phase is where the **Service Provider** (or _Milestone Marker_) communicates progress to everyone else — by signing an update that changes the milestone’s status.

It’s how the escrow “breathes.”\
Each update becomes a traceable, on-chain proof of what’s happening off-chain.

***

### 🧱 What “Change Milestone Status” Means

Every milestone in an escrow has two types of information:

1. **Structural data** — defined at deployment (title, receiver, amount).
2. **Dynamic status** — updated as work evolves.

The **Change Milestone Status** action updates that dynamic state.\
It’s not limited to pre-set words like _pending_ or _done_ — your platform defines the vocabulary.

A milestone could move through any flow you design:

* _“Design Started” → “Ready for Review” → “Approved”_
* _“Product Packed” → “In Transit” → “Delivered”_
* _“Pull Request Opened” → “Code Merged” → “Deployed”_

> 💬 **Trustless Work doesn’t impose statuses.**\
> It only ensures that the update comes from the correct role — the Service Provider — and that every change is signed and recorded.

***

### ✍️ Who Can Perform This Action

Only the **Service Provider (Milestone Marker)** can sign milestone status updates.\
This preserves accountability: progress always originates from the party doing the work.

Once signed, the update is broadcast on-chain, and the contract records:

* The **new status label** (a text string defined by your platform)
* An optional **evidence field**

Other participants — Approver, Release Signer, Platform — can view the update but cannot alter it.

***

### 🧾 Adding Evidence

Each update can include an **evidence input**, typically a URL or reference pointing to external proof of progress.

This could be:

* A link to a code repository, pull request, or merge commit
* A delivery receipt, tracking page, or signed document
* A file stored on decentralized storage like IPFS, Filecoin, or Arweave

> 📎 **Note:** Trustless Work doesn’t store media or documents.\
> It only stores the _reference_ — keeping the escrow lightweight and privacy-respectful.\
> Platforms decide where evidence lives, and how much they want to display publicly.

***

### 🔁 How Platforms Can Use This

Platforms can build their own workflows on top of this mechanism:

* Display a real-time progress feed on dashboards
* Require specific evidence types before allowing “Approve” actions
* Automate milestone transitions based on external data (e.g., an API confirming delivery)

Each status update becomes part of the escrow’s event history — a transparent, auditable record of progress.

***

### ⚙️ What Changes On-Chain

Every signed update triggers:

* A **Milestone Status Event**, visible on Stellar explorers and in the Escrow Viewer
* A refreshed view of the milestone’s metadata (`status`, `evidence`, and timestamp)

It doesn’t release funds — it just advances the state.\
The **Approval Phase** that follows decides whether payment moves forward or the milestone is disputed.

***

### 📦 Outcome of the Change Milestone Status Phase

By the end of this phase:

* The Service Provider has submitted a new, verifiable progress update.
* The escrow now reflects the most recent milestone status and evidence.
* All participants can see the change on-chain and in the [**Escrow Viewer**](https://viewer.trustlesswork.com).

> This phase transforms subjective progress into verifiable data — one signed update at a time.
