---
description: We don’t hold your money—we hold the logic.
---

# ⚒️ Escrow Design

Every escrow on Trustless Work is just a **structured contract**: a set of keys and values that define **who does what, when funds move, and under which conditions.**

This page gives you the **mental model** for designing escrows before you ever touch code.\
The schema defines the _shape of an escrow_; you decide the logic.

***

### Escrow structure

An escrow is a **JSON body** with these core parts:

* **Escrow ID:** On-chain identifier of the contract. Deposit Address.&#x20;
* **Engagement ID & Title** → configurable strongs, help identify the contract.&#x20;
* **Roles** → who marks, approves, releases, resolves, and receives
* **Description** → why the escrow exists
* **Milestones** → what must be completed to unlock funds
* **Amount & Fees** → how much is locked, how much the platform earns
* **Trustline** → which asset is used (USDC, or any Stellar-issued token)
* **Flags** → state indicators (disputed, released, resolved)

{% content-ref url="what-does-a-smart-escrow-look-like.md" %}
[what-does-a-smart-escrow-look-like.md](what-does-a-smart-escrow-look-like.md)
{% endcontent-ref %}

***

### Two Escrow Types

Trustless Work supports **two escrow types**:

1. **Single-Release Escrow**\
   Multiple milestones, one payout.\
   Useful for deposits, one-off jobs, or simple deliveries.\

2. **Multi-Release Escrow**\
   Multiple milestones, multiple payouts (one per milestone).\
   Perfect for projects, grants, or milestone-based funding.

{% content-ref url="escrow-types.md" %}
[escrow-types.md](escrow-types.md)
{% endcontent-ref %}

***

### Roles in Context

Every schema includes a **roles object**. Roles are:

* **Approver** → validates milestone completion.
* **Service Provider** → delivers work, provides status updates.
* **Platform Address** → can make chanes before escrow is funded. Optional: can earn fees (platform fee).
* **Release Signer** → executes fund release.
* **Dispute Resolver** → arbitrates when things go wrong, can re-route funds if dispute is raised.
* **Receiver** → final destination of funds

{% content-ref url="roles-in-trustless-work.md" %}
[roles-in-trustless-work.md](roles-in-trustless-work.md)
{% endcontent-ref %}

***

### Lifecycle Integration

Schemas map directly into the **escrow lifecycle**:

1. Initiation → define schema
2. Funding → lock assets via trustline
3. Milestone updates → service provider adds progress
4. Approvals → approver signs off
5. Release → release signer triggers transfer
6. (Optional) Dispute & Resolution

{% content-ref url="escrow-lifecycle/" %}
[escrow-lifecycle](escrow-lifecycle/)
{% endcontent-ref %}

***

### 🚀 Next Steps

* Define [Escrow Properties](what-does-a-smart-escrow-look-like.md)
* Choose Your[ Escrow Type](escrow-types.md)
* Assign [Roles](roles-in-trustless-work.md)
* Follow the [Lifecycle](escrow-lifecycle/)

Then:\
[ **Test it in our dApp** ](https://dapp.trustlesswork.com)\
&#x20;[**Integrate Trustless Work into your platform** ](../developer-resources/getting-started.md)\
[**Try out our Vibe-Coding Guide**](../vibe-coding.md)\
[**Use our escrow-blocks**](../escrow-blocks/)



***
