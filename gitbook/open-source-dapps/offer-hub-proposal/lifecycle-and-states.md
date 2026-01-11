# Lifecycle and States



OfferHub maintains an off-chain **Order** lifecycle that mirrors the on-chain escrow lifecycle.

### Order states

* Draft
* Awaiting Funding
* Funded
* In Progress
* For Review
* Approved
* Disputed
* Released
* Refunded
* Closed

### Escrow states (conceptual)

* Created
* Funded
* Milestone Done
* Approved or Disputed
* Released or Refunded
* Closed

OfferHub treats the escrow contract as the source of truth for funds movement.
