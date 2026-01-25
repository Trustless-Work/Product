# Delivery & Approval

## Delivery & Approval

### Context

Once an order is **funded**, the marketplace enters the **execution phase**.

At this point:

* funds are locked in escrow,
* the seller can safely deliver,
* the buyer knows payment is secured,
* the platform enforces the process.

This flow applies to **both goods and services**.

***

### Goal

Allow the seller to:

* provide delivery updates,
* mark the order as completed,

and allow the buyer to:

* approve the delivery **or**
* raise a dispute,

with outcomes enforced by the escrow.

***

### Actors

* **Seller**
* **Buyer**
* **OfferHub UI**
* **OfferHub Backend (Orchestrator)**
* **Supabase** (profiles & roles)
* **Trustless Work Escrow**
* **Stellar Network**

***

### Preconditions

* Order exists and is in **Funded / In Progress**
* Escrow exists and is fully funded
* Seller and buyer are linked to the order
* Escrow roles are already assigned:
  * Seller = Milestone Marker
  * Buyer = Approver
  * Platform = Dispute Resolver & Release Signer

***

### Lifecycle Alignment

This flow moves the order and escrow through these states:

```
In Progress
→ For Review (Delivery Done)
→ Approved OR Disputed
→ Released OR Refunded
```

***

### Seller Experience — Delivery Phase

#### 1. Seller Is Notified

```
Escrow funded → Seller notified
```

Seller can now begin fulfillment.

***

#### 2. Seller Provides Delivery Updates (Off-Chain)

The seller has access to a **seller dashboard** where they can:

* update order status (e.g. “processing”, “shipped”)
* upload evidence (tracking number, files, notes)
* communicate with the buyer

These updates are:

* **off-chain**
* **informational**
* **not enforced by escrow**

They exist to support UX and dispute resolution later.

***

#### 3. Seller Marks Delivery as Done (On-Chain Signal)

When delivery is complete:

```
Seller → OfferHub UI: Mark as Delivered
OfferHub → Trustless Work:
  Mark milestone as Done
```

This action:

* moves the escrow to **For Review**
* signals that the seller claims completion
* **does not release funds**

At this point:

* seller can no longer change the delivery status
* buyer action is required

***

### Buyer Experience — Review Phase

#### 4. Buyer Reviews the Order

Buyer sees:

* delivery status
* seller updates and evidence
* order timeline

Buyer must choose **one of two actions**.

***

### Path A — Buyer Approves Delivery

#### User Experience

> “Everything looks good.”

***

#### System Flow

```
Buyer → OfferHub UI: Approve
OfferHub → Trustless Work:
  Approve milestone
```

This moves the escrow to **Approved**.

⚠️ **Signing Requirement (Important)**\
This approval **requires a signature** tied to the Approver role.

What signs this approval depends on the final integration model:

* **Option 1 (Preferred UX):**
  * Buyer approval is authorized via OfferHub
  * Platform signs on-chain as delegated authority
* **Option 2 (To be validated with Airtm):**
  * Buyer’s Airtm-linked account can authorize/sign escrow approval
  * This would require Airtm support for signing or delegated signing

👉 **This is a key exploration point in the Airtm pilot.**

***

### Path B — Buyer Raises a Dispute

#### User Experience

> “Something is wrong.”

***

#### System Flow

```
Buyer → OfferHub UI: Raise Dispute
OfferHub → Trustless Work:
  Mark escrow as Disputed
```

This:

* freezes the escrow
* prevents release
* hands control to the platform (dispute resolver)

From here, the **Disputes & Resolution** flow applies.

***

### What Happens Next

#### If Approved

* Escrow is ready for release
* Platform executes fund release
* Seller gets paid

#### If Disputed

* Escrow remains locked
* Platform investigates and resolves
* Outcome is enforced on-chain

***

### Outputs

* ✅ Delivery marked as done
* ✅ Escrow moved to **For Review**
* ✅ Buyer action recorded (approve or dispute)
* ✅ Full audit trail (off-chain + on-chain)

***

### Failure & Edge Cases

#### Seller Marks Delivery Too Early

* Buyer can dispute
* Evidence is reviewed
* No automatic release occurs

#### Buyer Is Inactive

* Escrow remains in **For Review**
* No time-based auto-release by default
* Platform may intervene manually (policy decision)

***

### Security & Trust Notes

* Seller **cannot release funds**
* Buyer **cannot self-release funds**
* Platform **cannot release funds unless conditions are met**
* Escrow enforces state transitions

***

### Educational Notes

#### Why Delivery Updates Are Off-Chain

* Flexible
* UX-friendly
* Avoids unnecessary on-chain writes
* Still usable as dispute evidence

#### Why Approval Requires Signing

Approval is the **economic trigger** for release.\
It must be cryptographically authorized, not just a UI click.

***

### Open Questions (Pilot Validation)

The Offer Hub pilot will explicitly explore:

1. **Can Airtm accounts participate in escrow signing flows?**
2. **Can Airtm support delegated or proxied signing?**
3. **Should approvals always be platform-signed for UX simplicity?**

These decisions affect:

* trust assumptions
* UX friction
* compliance boundaries
