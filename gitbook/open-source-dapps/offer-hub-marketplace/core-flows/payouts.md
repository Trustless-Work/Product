# Payouts

After escrow release, funds are **no longer locked** and belong to the seller.

Payouts are **off-chain financial actions**, handled by Airtm.

Offer Hub does not manage or custody funds at this stage.

***

### Goal

Allow sellers to **withdraw their earnings** using familiar local payment methods, without exposing stablecoins or blockchain mechanics.

***

### Actors

* **Seller**
* **OfferHub UI**
* **OfferHub Backend**
* **Supabase** (profile & Airtm linkage)
* **Airtm API**
* **Local Payment Rails**

***

### Preconditions

* Escrow has been released
* Seller is linked to an Airtm account
* Seller has a positive available balance
* Airtm account is active and compliant

***

### Payout Flow

#### 1. Seller Balance Is Updated

After escrow release:

```
Escrow → Seller account
```

OfferHub:

* observes the release event,
* updates its **derived balance view**,
* marks funds as withdrawable.

> Airtm remains the source of truth for balances.

***

#### 2. Seller Initiates Withdrawal

```
Seller → OfferHub UI: Withdraw Funds
```

Seller selects:

* payout method (as supported by Airtm)
* destination (bank, wallet, etc.)
* amount

***

#### 3. OfferHub Creates Payout via Airtm

```
OfferHub → Airtm API:
  Create Payout
```

Airtm handles:

* compliance checks
* execution via local rails
* payout confirmation

OfferHub does not move money itself.

***

#### 4. Airtm Confirms Payout

```
Airtm → OfferHub Webhook:
  Payout completed
```

OfferHub:

* updates UI status,
* records payout event,
* closes the financial loop for the order.

***

### Post-Conditions

* Seller receives funds via local rails
* Seller balance is reduced accordingly
* Order remains closed
* Full audit trail is available

***

### Outputs

* ✅ Seller paid out successfully
* ✅ Payout status recorded
* ✅ Audit log entry created

***

### Failure Scenarios

#### Payout Failed

* Airtm returns failure status
* Seller notified
* Retry or alternate method allowed

#### Insufficient Balance

* Withdrawal blocked
* Seller prompted to adjust amount

***

### Security & Compliance Notes

* OfferHub never stores bank details
* OfferHub never executes payouts directly
* All payouts are logged and traceable

***

### Educational Notes

#### Why Payouts Are Separate from Release

* Release is **on-chain enforcement**
* Payouts are **off-chain money movement**

Separating these concerns:

* improves auditability,
* reduces risk,
* mirrors real financial systems.

***

### Key Takeaway

> Escrows decide **who gets paid**.\
> Payouts decide **how they receive the money**.

Offer Hub keeps these responsibilities cleanly separated.

***

###
