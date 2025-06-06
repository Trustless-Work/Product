---
icon: plane-departure
---

# Multi Release Escrow

A Multi-Release Contract is an escrow agreement on the Stellar blockchain that divides the total payment of a project into multiple deliveries (“milestones”). Each milestone is released only upon verification of its completion, ensuring that funds remain secure until the associated work is validated.

**Key Components**

* **Initial Fund Lockup**: Upon contract initiation, the total of all milestone amounts plus the platform fee (“platformFee”) is deposited into an escrow account.
* **Milestones**: Each stage includes a description, a specific amount, and status flags (`approved`, `dispute`, `released`, `resolved`).
* **Primary Roles**:
  * **Service Provider**: Delivers the deliverable corresponding to each milestone.
  * **Approver**: Verifies and approves a milestone before authorizing the release of funds.
  * **Dispute Resolver**: Intervenes in case of disagreement and decides whether to release or refund the locked amount.
  * **Receiver**: The final recipient of the funds if different from the Service Provider.

**Brief Workflow**

1. The Service Provider completes a milestone and requests approval.
2. The Approver reviews the deliverable; if approved, they sign a transaction that releases only the amount allocated to that milestone (minus the platform and Trustless Work fee).
3. The Stellar network executes the transaction and transfers the payment to the Service Provider or the configured Receiver.
4. If a dispute arises, the Dispute Resolver evaluates the evidence and, upon signing their decision, marks the milestone as `resolved` to release or refund the corresponding funds.

This model protects all parties: the client knows that funds are available but cannot be released without validation, and the Service Provider receives payment for each verified delivery—leveraging Stellar’s transparency and immutability.
