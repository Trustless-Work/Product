# Release

Release is the moment where **escrow conditions are fulfilled** and funds are **irreversibly transferred** according to the rules defined at escrow creation.

At this stage:

* the order has been completed,
* the buyer has approved delivery,
* no dispute is active.

Release is an **on-chain action**, enforced by Trustless Work.

***

### Goal

Release escrowed funds to the seller **only after approval**, without requiring buyers or sellers to manage keys or interact directly with the blockchain.

***

### Actors

* **Buyer** (approver)
* **OfferHub Platform**
* **Trustless Work Escrow**
* **Trustless Work dApp (Backoffice)**
* **Stellar Network**

***

### Preconditions

* Escrow exists and is fully funded
* Seller has marked delivery as done
* Buyer has approved delivery
* Escrow state is **Approved**
* No active dispute

***

### Release Flow

#### 1. Escrow Is Ready for Release

Once buyer approval is recorded:

```
Escrow state → Approved
Order state → Ready for Release
```

At this point:

* funds are still locked,
* no money has moved yet.

***

#### 2. Platform Executes Release

Release is executed by the **platform**, acting under the **Release Signer role**.

```
Platform → Trustless Work dApp:
  Execute Release
```

This action:

* is signed by the platform-controlled address,
* follows the escrow’s predefined rules,
* cannot be altered after execution.

***

#### 3. On-Chain Enforcement

```
Trustless Work Escrow → Stellar Network:
  Transfer funds to Receiver
```

Funds are transferred:

* directly from the escrow,
* to the seller’s configured receiver address.

The marketplace does **not** intermediate this transfer.

***

### Post-Conditions

* Escrow state → **Released**
* Order state → **Closed**
* Funds are no longer locked
* Transaction is final and auditable

***

### Outputs

* ✅ Funds released to seller
* ✅ Escrow closed on-chain
* ✅ Order marked as completed
* ✅ On-chain transaction hash available

***

### Security & Trust Notes

* Buyers cannot trigger release directly
* Sellers cannot self-release
* Platform can only release after approval
* Escrow rules cannot be bypassed

***

### Educational Notes

#### Why Release Is Platform-Signed

* Mirrors real marketplace behavior (customer support / ops)
* Avoids requiring users to manage wallets or keys
* Keeps UX simple while preserving trust guarantees

Trustless Work ensures:

> the platform can **only** act within the rules encoded in the escrow.

***

### Key Takeaway

> Approval expresses intent.\
> Release enforces value transfer.

Escrows ensure this separation is always respected.

***
