---
description: >-
  Single-Release Escrow is a type in which all your funds are released only
  once, either with the resolution of a dispute or by completing all the
  milestones defined for it.
icon: plane-departure
---

# Single Release Escrow

The Deploy endpoints allow users to deploy escrows efficiently. These endpoints provide the way to initialize escrows in the Stellar's Blockchain.

**Key Components**

* **Initial Fund Lockup**: Upon contract initiation, the escrow amoun plus the platform fee (“platformFee”) is deposited into an escrow account.
* **Flags**: The escrow status is interpreted by means of these flags: (`approved`, `dispute`, `released`, `resolved`).
* **Primary Roles**:
  * **Service Provider**: Delivers the deliverable corresponding to each milestone.
  * **Approver**: Verifies and approves a milestone before authorizing the release of funds.
  * **Dispute Resolver**: Intervenes in case of disagreement and decides whether to release or refund the locked amount.
  * **Receiver**: The final recipient of the funds if different from the Service Provider.

**Brief Workflow**

1. An escrow is initialized by defining all the necessary escrow properties.
2. The Service Provider completes a milestone and requests approval.
3. The approver reviews the deliverable; if approved, signs a transaction that releases the amount allocated as escrow reward (minus the platform and Trustless Work fee).
4. The Stellar network executes the transaction and transfers the payment to the Service Provider or the configured Receiver.
5. If a dispute arises, the Dispute Resolver evaluates the evidence and, upon signing their decision, marks the escrow as resolved to release or refund the corresponding funds.

This model protects all parties: the client knows that funds are available but cannot be released without validation, and the service provider receives payment upon completion of all milestones and the milestones themselves being approved by the approver, leveraging Stellar's transparency and immutability.
