---
description: We don’t hold your money—we hold the logic.
icon: layer-group
---

# Escrow Design

Trustless Work escrows are role-based. It is important to understand the roles to be able to correctly configure the escrows. Updates to the contract status have to be signed by addresses, and only the addresses which have a role assigned can perform the functions that only that role can sign.&#x20;

***

### Roles&#x20;

Every escrow includes a **roles object**. These are the available roles:

* **Service Provider** → Can update milestone status, can raise a dispute.
* **Approver** → validates milestone completion, can raise a dispute.
* **Platform Address** → can make changes before escrow is funded. Is the platform fee receiver (optional configurable %fee)&#x20;
* **Release Signer** → executes funds release.
* **Dispute Resolver** → arbitrates when things go wrong, can re-route funds if dispute is raised.
* **Receiver** → final destination of funds.&#x20;

Other roles which play no role:&#x20;

**Issuer:** has no powers over the contract.&#x20;

**Depositor:** Every incoming transaction to the escrow is indexed. But depositors play no role.

**Observer (coming in next version):** Addreses that want to be observe a escrow. They play no role, but are indexed as an observer, which facilitates tracking of escrows by role.&#x20;

{% content-ref url="roles-in-trustless-work.md" %}
[roles-in-trustless-work.md](roles-in-trustless-work.md)
{% endcontent-ref %}

### Escrow structure

But Roles are only the beginning, here are more properties you should know about:

* **Escrow ID:** On-chain identifier of the contract. Deposit Address. We call it like this, but it is we also reference to it as Contract Address.&#x20;
* **Engagement ID** → configurable string, Is meant to be used to connect the escrow with an invoice number or an external secuencer. Facilitates indexation.&#x20;
* **Title** → configurable string, Title of the contract.&#x20;
* **Roles** → who marks, approves, releases, resolves, and receives
* **Description** → why the escrow exists
* **Milestones** → Action that must be completed to unlock funds
* **Amount & Fees** → how much is locked, how much the platform earns
* **Platform Fee** → optional,  how much the platform (marketplace, app, etc) earns
* **Trustline** → which asset is used (USDC, or any Stellar-issued token)
* **Flags** → state indicators (disputed, released, resolved)

{% content-ref url="what-does-a-smart-escrow-look-like.md" %}
[what-does-a-smart-escrow-look-like.md](what-does-a-smart-escrow-look-like.md)
{% endcontent-ref %}

***

### Two Escrow Types

We currently support **two escrow types**:

1. **Single-Release Escrow**\
   Multiple milestones, one payout.\
   Useful for deposits, one-off jobs, or simple deliveries.<br>
2. **Multi-Release Escrow**\
   Multiple milestones, multiple payouts (one per milestone).\
   Perfect for projects, grants, or milestone-based funding.

More iterations are coming as we learn from your requirements! Feel free to reach out!

{% content-ref url="escrow-types.md" %}
[escrow-types.md](escrow-types.md)
{% endcontent-ref %}

***

***

### Lifecycle Integration

We constantly talk about the escrow lifecycle, which follows this path.&#x20;

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
&#x20;[**Integrate Trustless Work into your platform** ](/broken/pages/bknsGrFeT0G5xw1ebl4u)\
[**Try out our Vibe-Coding Guide**](../readme/ai-optimized-docs.md)\
[**Use our escrow-blocks**](/broken/pages/SVsqMbxWQC9NNkQm4sRr)



***
