# Roles and Permissions

OfferHub uses Trustless Work’s role model to support goods and services marketplaces.

### Role mapping

| Role             | Assigned To       | Purpose                            |
| ---------------- | ----------------- | ---------------------------------- |
| Payer            | Buyer             | Funds the escrow                   |
| Receiver         | Seller            | Receives released funds            |
| Milestone Marker | Seller            | Marks delivery / completion        |
| Approver         | Buyer             | Approves delivery or disputes      |
| Dispute Resolver | OfferHub Platform | Customer support resolves disputes |
| Release Signer   | OfferHub Platform | Executes release/refund            |
| Escrow Issuer    | OfferHub Platform | Creates/configures escrows         |

### Notes

* Dispute Resolver and Release Signer can be the same platform address.
* Roles should be configurable to support different operational models.
