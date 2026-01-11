# User Accounts & Profiles



OfferHub separates **user identity**, **financial accounts**, and **escrow enforcement** into distinct systems.

This separation is intentional and required to:

* minimize custodial risk,
* avoid storing sensitive financial data,
* remain compatible with Airtm’s API scope,
* keep Trustless Work focused on enforcement.

***

### System Responsibilities

#### OfferHub + Supabase (Identity & Profile)

Handled by **Supabase**.

Responsibilities:

* user signup and login
* authentication and sessions
* marketplace profile data
* user roles (buyer / seller)
* linking external accounts (Airtm reference)

Supabase is recommended because it provides:

* auth (email, OAuth, magic links)
* row-level security
* auditability
* easy integration with backend services

***

#### Airtm (Financial Account & KYC)

Handled entirely by **Airtm**.

Responsibilities:

* KYC and compliance
* financial account creation
* balances
* deposits (top-ups)
* withdrawals (payouts)
* virtual bank accounts and local rails

OfferHub does **not** store:

* identity documents
* bank details
* balances

***

#### Trustless Work (Escrow & Enforcement)

Handled by **Trustless Work on Stellar**.

Responsibilities:

* escrow creation per order
* milestone tracking
* dispute states
* release and refund enforcement

Trustless Work never manages users directly. It only enforces **roles and signatures**.

***

### User Creation Flow (Reference)

#### Step 1 — Signup & Login

```
User → OfferHub UI
OfferHub UI → Supabase Auth
Supabase → User session established
```

At this point:

* the user exists in OfferHub
* the user has a profile record
* no financial actions are allowed yet

#### Step 2 — Airtm Account Linking (KYC)

When the user attempts a financial action (top-up, sell, withdraw):

```
OfferHub → Check: Airtm linked?
If NO:
  → Redirect user to Airtm hosted onboarding
```

User completes on Airtm:

* signup or login
* identity verification (KYC)
* account readiness

***

#### Step 3 — Airtm Callback & Linking

```
Airtm → OfferHub redirect/callback
OfferHub receives:
  - airtm_user_id (or reference)
```

OfferHub stores the reference in Supabase:

```json
{
  "user_id": "offerhub_user_123",
  "airtm_user_id": "airtm_user_abc"
}
```

No credentials or balances are stored.

***

#### Step 4 — User Is Financially Enabled

After linking:

* user can top up balance
* user can fund escrows
* user can receive payouts

All financial actions are orchestrated through Airtm APIs using the linked identity.

***

### Why This Model Is Used

#### Why Supabase Handles Profiles

* Marketplace identity ≠ financial identity
* Cleaner access control
* Easier role management (buyer / seller)
* Avoids compliance scope creep

#### Why Airtm Handles KYC

* Regulated entity
* Purpose-built for financial compliance
* Avoids duplicating KYC workflows

#### Why OfferHub Only Orchestrates

* Reduces legal and technical risk
* Keeps architecture modular
* Makes the template reusable with other providers

***

### Sequence Diagram (Simplified)

```
User → UI → Supabase (signup/login)
User → UI → Airtm (KYC onboarding)
Airtm → OfferHub (user reference)
OfferHub → Supabase (link stored)
```

***

### Design Constraint (Important)

OfferHub **must not**:

* create Airtm users via API
* store KYC documents
* act as a custodian

If a platform requires full custodial control, OfferHub is not the correct pattern.

***

### Summary

OfferHub treats:

* **Supabase** as the system of record for users
* **Airtm** as the system of record for money
* **Trustless Work** as the system of record for escrow enforcement

OfferHub itself remains an orchestration layer.
