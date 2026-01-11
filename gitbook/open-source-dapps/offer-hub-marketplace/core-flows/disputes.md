# Disputes

Disputes are an **explicit, human-driven mechanism** in Offer Hub.

They exist to handle cases where:

* delivery is contested,
* approval is withheld,
* cancellation is requested,
* or evidence must be reviewed.

Offer Hub does **not** rely on timeouts or automated arbitration.\
Instead, disputes are resolved by the **marketplace platform**, acting as customer support, with outcomes enforced by escrow contracts.

***

### Goal

Allow:

* **buyers or sellers** to raise a dispute,
* **the platform** to review evidence and decide the outcome,
* **the escrow** to enforce the final resolution (release or refund).

***

### Actors

* **Buyer**
* **Seller**
* **OfferHub UI**
* **OfferHub Backend (Orchestrator)**
* **Trustless Work Escrow**
* **Trustless Work dApp (Backoffice)**
* **Dispute Resolver Address (Platform-controlled)**

***

### When a Dispute Can Be Raised

A dispute can be initiated **at any time after the escrow is funded and before final release**.

Typical scenarios include:

#### Buyer-Initiated Disputes

* Product never arrived
* Service was not delivered as agreed
* Delivery evidence is insufficient
* Seller marked delivery prematurely

#### Seller-Initiated Disputes

* Buyer is unresponsive
* Buyer refuses to approve despite delivery
* Seller wants to cancel and refund
* Seller has strong evidence of fulfillment

Both parties have the right to **flag the transaction**, but neither can resolve it themselves.

***

### Dispute Initiation

#### 1. Buyer or Seller Raises a Dispute

```
User → OfferHub UI: Raise Dispute
```

This action:

* is initiated off-chain,
* records the intent to dispute,
* does not move funds yet.

OfferHub captures:

* who raised the dispute
* reason code
* optional evidence (messages, files, links)

***

#### 2. Escrow Is Marked as Disputed

```
OfferHub → Trustless Work:
  Mark escrow as Disputed
```

Once disputed:

* the escrow is frozen,
* no release or refund can occur automatically,
* control moves to the **Dispute Resolver role**.

The order status is updated to **Disputed**.

***

### Platform Resolution (Backoffice Flow)

#### Important Design Decision

> **Offer Hub does not implement its own dispute backoffice.**

Instead, it leverages the **existing Trustless Work dApp**, which already supports:

* escrow inspection,
* role-based signing,
* release and refund execution.

This avoids duplication and ensures consistent behavior.

***

#### 3. Platform Logs Into Trustless Work dApp

A platform operator (customer support) logs into the Trustless Work dApp using the **Dispute Resolver / Release Signer address** assigned to the escrow.

📌 Reference:

* Trustless Work dApp (Backoffice)
* Login using the resolver wallet configured for the marketplace

***

#### 4. Platform Reviews the Case

Using:

* OfferHub-provided evidence (off-chain)
* On-chain escrow state
* Transaction history

The platform decides one of the following outcomes:

* **Release funds to the seller**
* **Refund funds to the buyer**

***

#### 5. Platform Signs the Resolution

```
Trustless Work dApp → Escrow:
  Execute Release OR Refund
```

This action:

* is signed by the platform’s resolver/release signer address,
* is enforced on-chain,
* is final.

***

### Post-Resolution State

After resolution:

* Escrow moves to **Released** or **Refunded**
* Order moves to **Closed**
* Funds are transferred accordingly
* Full audit trail exists (on-chain + off-chain)

***

### Outputs

* ✅ Dispute recorded
* ✅ Escrow frozen during review
* ✅ Resolution enforced on-chain
* ✅ Order closed with final outcome

***

### What Users See

#### Buyer

* Dispute status updates
* Final outcome (refund or not)
* Clear explanation from platform

#### Seller

* Dispute status updates
* Final outcome (paid or refunded)
* Platform decision explanation

***

### Security & Trust Model

* Buyers **cannot** release funds
* Sellers **cannot** release funds
* Platform **can only act within escrow rules**
* All resolution actions are signed and auditable

***

### Educational Notes

#### Why Both Parties Can Raise Disputes

This mirrors real marketplaces:

* disputes are signals, not decisions,
* raising a dispute does not imply wrongdoing,
* resolution is handled by customer support.
