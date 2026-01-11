# Disputes

### Goal

Allow buyer or seller to raise a dispute and let platform customer support resolve it.

### Trigger

Buyer or seller raises a dispute flag.

### Steps

1. Escrow enters **Disputed**
2. OfferHub support collects evidence off-chain
3. Dispute Resolver decides outcome:
   * Release to seller
   * Refund buyer
4. Release Signer executes the resolution on-chain
5. Escrow closes

### Outputs

* Final on-chain resolution
* Order moves to Released or Refunded
* Full audit trail
