---
description: Stablecoin-powered marketplace
icon: shop-24
---

# OfferHub - Marketplace

OfferHub is an open-source reference implementation for building stablecoin-powered marketplaces on Stellar with a fully abstracted, Web2-like UX. This initiative aims to&#x20;

OfferHub composes three systems:

* **Airtm**: user accounts, deposits, withdrawals, compliance-aware rails. [Learn more. ](https://api.enterprise.airtm.com/docs#v2/)
* **Trustless Work**: non-custodial escrow engine + disputes
* **Stellar (USDC)**: settlement and enforcement layer

This documentation explains how OfferHub works so builders can fork it, deploy it, and extend it.

***

### Goals

* **Abstract stablecoins completely** from end users.
* **Non-custodial escrow enforcement** on Stellar.
* **User-level accounts** (no pooled platform treasury for user funds).
* **Explicit dispute workflow** with platform customer support as resolver (using the Bakcoffice dApp)
* **Open-source reference** that others can copy and modify.

***

### Non-Goals (v1)

* Multi-chain settlement (Stellar-first).
* Automated arbitration or AI dispute resolution.
* Auctions, subscriptions, complex carts.
* Fully decentralized governance.

***

### High-Level Architecture

OfferHub separates concerns into three layers:

1. **Account & Payments Layer (Airtm)**

* user account / balance
* deposit methods
* withdrawals
* compliance-aware onboarding

2. **Escrow & Enforcement Layer (Trustless Work on Stellar)**

* escrow contract per order
* milestone and dispute states
* release/refund enforcement

3. **Marketplace Orchestration Layer (OfferHub App)**

* listings, checkout, order management
* dispute case management (support workflow)
* events/webhooks processing
* audit log and backoffice controls

4. **Backoffice Operations and Auditing (backoffice dApp)**

* Dispute resolving
* Manual releases

5. **Escrow Viewer dApp**

* Decentralized Escrow Status viewer

***

### System Diagram

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### Quick Glossary

* **Order**: OfferHub off-chain object representing the marketplace transaction.
* **Escrow**: Trustless Work smart escrow contract representing conditional funds.
* **Top-up**: User deposit into their Airtm-backed marketplace balance.
* **Release**: On-chain transfer from escrow to seller based on conditions.
* **Dispute**: Explicit flagged state requiring customer support resolution.
