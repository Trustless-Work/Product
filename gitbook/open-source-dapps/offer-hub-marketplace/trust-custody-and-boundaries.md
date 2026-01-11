# Trust, Custody, and Boundaries

### Custody model

* **Airtm** manages user balances and rails.
* **Trustless Work escrows** hold USDC on Stellar (non-custodial).
* **OfferHub** does not custody pooled user funds.

### What OfferHub is trusted for

* Orchestrating flows and user experience
* Handling disputes as customer support
* Signing release/refund actions according to dispute outcomes

### What OfferHub is NOT trusted for

* Holding user money in pooled accounts
* Changing escrow rules after creation
* Moving escrow funds outside the role-based flow

### Enforcement points

* Escrow conditions are enforced on-chain.
* Airtm provides compliant rails and account infrastructure off-chain.
