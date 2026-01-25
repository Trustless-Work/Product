# Purchase & Escrow Funding

### Context & Assumptions (Important)

Offer Hub models a **classic marketplace**:

* Sellers list goods or services in advance
* Buyers browse existing offers
* A buyer creates an order by clicking **Buy**
* Each order creates **one escrow**

This flow assumes:

* The seller and offer already exist
* The buyer is initiating the transaction
* Funds must be secured _before_ delivery begins

***

### Goal

Create **one escrow per order** and fund it **directly from the buyer**, while keeping the experience simple and fully abstracted.

***

### From the User’s Perspective

> “I click Buy.\
> If I already have money, it’s reserved.\
> If not, I pay the same way I always do.\
> The seller only gets paid if everything is approved.”

The user never chooses:

* blockchains
* wallets
* escrow addresses
* signing flows

***

### Actors

* **Buyer**
* **Seller**
* **OfferHub UI**
* **OfferHub Backend (Orchestrator)**
* **Supabase** (user profile + Airtm linkage)
* **Airtm** (accounts, balances, rails)
* **Trustless Work** (escrow engine on Stellar)
* **Stellar (USDC)**

***

### Preconditions

* Buyer is logged in (Supabase)
* Buyer has a **linked and KYC-approved Airtm account**
* Seller has an active offer
* Platform is configured as:
  * escrow issuer
  * dispute resolver
  * release signer

***

### High-Level Flow

```
Buyer clicks Buy
→ Escrow created
→ Escrow funded by buyer
→ Order starts
```

There are **two user-facing funding paths**, depending on whether the buyer already has funds.

***

### Path A — Buyer Has Sufficient Airtm Balance (Primary Path)

#### When This Happens

* Buyer already holds enough USDC (or equivalent) in their Airtm account
* This is the **default and preferred flow**

***

#### User Experience

> “I click Buy and the money is reserved.”

No additional payment steps are required.

***

#### System Flow

1. **Buyer clicks Buy**

```
Buyer → OfferHub UI: Buy
```

2. **OfferHub creates the escrow**

```
OfferHub → Trustless Work:
  Create escrow (order parameters)
```

3. **Buyer funds the escrow from Airtm balance**

```
Airtm:
  Transfer USDC from buyer account
  → Escrow address on Stellar
```

4. **Escrow becomes funded**

```
Escrow state → Funded
Order state → In Progress
```

***

#### Key Properties

* Funds move **directly from buyer to escrow**
* Marketplace never touches user funds
* Escrow is funded immediately
* Seller can safely proceed

This is the **cleanest and safest path**, and the one Offer Hub is designed around first.

***

### Path B — Buyer Does NOT Have Sufficient Balance (Pay-to-Escrow)

⚠️ **This path requires validation with the Airtm team**\
It is included here as an **educational and forward-looking pattern**.

***

#### When This Happens

* Buyer is KYC-approved on Airtm
* Buyer does not have enough balance
* Buyer still wants to complete the purchase immediately

***

#### User Experience

> “I click Buy and choose how to pay.”

The user may see:

* debit card
* credit card
* bank transfer (ACH, wire, etc.)

But still **never sees crypto or stablecoins**.

***

#### System Flow (Proposed / To Be Validated)

1. **Buyer clicks Buy**

```
Buyer → OfferHub UI: Buy
```

2. **OfferHub creates escrow (pending funding)**

```
OfferHub → Trustless Work:
  Create escrow
```

3. **Buyer selects payment method via Airtm**

```
Buyer → Airtm Hosted Payment Flow
```

4. **Payment funds the escrow directly**

```
Payment rail → Airtm
Airtm → Stellar escrow address
```

5. **Escrow becomes funded**

```
Escrow state → Funded
Order state → In Progress
```

***

#### Important Notes

* Funds **should not** settle in a platform account
* The intent is **pay → escrow**, not pay → balance → escrow
* This preserves:
  * non-custodial guarantees
  * clean accounting
  * correct trust boundaries

Whether Airtm can support **direct pay-to-escrow** flows is a **key validation item** for the pilot.

***

### What Happens Next (Both Paths)

Once the escrow is funded:

* Seller is notified
* Order enters **In Progress**
* Delivery can begin
* Dispute and approval logic applies identically

From this point on, **both paths converge**.

***

### Outputs

* ✅ Escrow created and funded
* ✅ Order state updated
* ✅ Seller notified
* ✅ Audit trail created (off-chain + on-chain)

***

### Failure Scenarios

#### Insufficient Balance (Path A)

* Order creation blocked
* Buyer prompted to top up or use Path B

#### Payment Failure (Path B)

* Escrow remains unfunded
* Order does not start
* Buyer retries payment

#### Escrow Funding Failure

* Order marked failed
* No delivery allowed
* Manual or automated retry

***

### Educational Summary

| Scenario          | User Action     | Result                      |
| ----------------- | --------------- | --------------------------- |
| Buyer has funds   | Click Buy       | Escrow funded instantly     |
| Buyer lacks funds | Click Buy → Pay | Escrow funded after payment |
| Platform          | —               | Never holds funds           |
| Seller            | —               | Protected by escrow         |

***

### Key Invariant (Very Important)

> **No order may enter “In Progress” unless the escrow is fully funded.**

This is the core safety guarantee Offer Hub enforces.
