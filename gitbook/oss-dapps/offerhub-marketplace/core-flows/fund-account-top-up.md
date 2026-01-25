# Fund Account (Top-Up)



### Goal

Allow a user to **add funds to their marketplace account** using familiar local payment methods, **without exposing stablecoins, wallets, or blockchain concepts.** We are using USDC on Stellar for this example.&#x20;

***

### Actors

* **User**
* **OfferHub Frontend**
* **OfferHub Orchestrator (Backend)**
* **Supabase** (user profile & account linkage)
* **Airtm API**
* **Airtm Payment Rails**

***

### Preconditions

* User is authenticated via Supabase
* User has a valid OfferHub profile
* User has **linked an Airtm account** (KYC completed)
* OfferHub has valid Airtm API credentials
* Webhook endpoints are registered and verified

If the Airtm account is not linked, the user is redirected to the **Airtm onboarding flow** first.

***

### Flow Overview

The funding flow is **user-initiated**, **Airtm-executed**, and **OfferHub-orchestrated**.

OfferHub never receives or holds user funds.

***

### Step-by-Step Flow

#### 1. User Initiates Top-Up

```
User → OfferHub UI:
  “Add Funds”
```

The user selects:

* amount
* currency / payment method (as supported by Airtm)

OfferHub validates:

* user session (Supabase)
* Airtm account linkage

***

#### 2. OfferHub Creates Airtm Pay-In Intent

```
OfferHub Orchestrator → Airtm API:
  Create Purchase (pay-in intent)
```

The request includes:

* Airtm user reference (email or user ID)
* amount
* currency
* return / callback references

This step **does not move funds yet** — it creates a payment intent.

***

#### 3. User Completes Payment via Airtm

```
User → Airtm Hosted Payment Flow
```

Airtm handles:

* payment method selection
* local rails (bank transfer, wallet, etc.)
* compliance checks
* transaction execution

OfferHub is **not involved** during this step.

***

#### 4. Airtm Confirms Payment (Webhook)

```
Airtm → OfferHub Webhook:
  Purchase confirmed
```

The webhook includes:

* purchase ID
* Airtm user reference
* amount
* final status

OfferHub must:

* verify webhook signature
* ensure idempotency
* persist the event

***

#### 5. OfferHub Updates Marketplace Balance

OfferHub:

* records the successful top-up in its internal ledger (derived state)
* marks the user as **funding-ready**
* updates UI state

> Important:\
> OfferHub’s “balance” is **a view**, not custody.\
> Airtm remains the system of record for funds.

***

### Post-Conditions

* User has available balance for:
  * funding escrows
  * purchasing goods or services
* No funds have moved to the marketplace or escrow yet
* Audit log contains:
  * pay-in intent
  * confirmation event
  * user linkage

***

### Outputs

* ✅ User marketplace balance increased (derived)
* ✅ Airtm balance increased (source of truth)
* ✅ Audit log entry created
* ✅ User is eligible to fund escrows

***

### Failure Scenarios & Handling

#### Payment Failed

* Airtm sends failure webhook
* OfferHub updates UI and logs reason
* No balance change

#### Webhook Not Received

* OfferHub polls Airtm purchase status
* Reconciliation job retries

#### Duplicate Webhook

* Idempotency key prevents double credit

***

### Security & Compliance Notes

* OfferHub never stores:
  * bank details
  * payment credentials
  * Airtm balances
* All webhook endpoints must:
  * verify signatures
  * enforce replay protection
* All funding actions must be logged

***

### Sequence Diagram (Simplified)

```
User → OfferHub UI: Add Funds
OfferHub → Airtm API: Create Purchase
User → Airtm: Complete Payment
Airtm → OfferHub Webhook: Purchase Confirmed
OfferHub → Supabase: Update derived balance
```

***

### Design Rationale

#### Why Airtm Owns the Balance

* regulated financial entity
* compliance responsibility
* avoids custodial risk

#### Why OfferHub Tracks a Derived Balance

* improves UX
* enables instant eligibility checks
* avoids constant API calls

***

### Educational Note

This flow will work for any issued asset on Stellar network, you just have to point to the correct [Trustline](../../../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md). For this example we are using USDc on Stellar.&#x20;

