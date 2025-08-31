---
description: >-
  On Stellar, accounts must explicitly opt in to hold and use assets. This
  opt-in is called a trustline.
---

# Trustlines

### What Are Trustlines in Stellar?

* A **trustline** is an explicit opt-in setup by a Stellar account that authorizes it to hold, receive, and transact with a non‑native asset (i.e. anything other than XLM), issued by a specific issuer&#x20;
* Without a trustline, an account **cannot receive or keep** that asset on the Stellar network&#x20;
* Each trustline requires **0.5 XLM** in base reserve, increasing the minimum balance and limiting abuse&#x20;
* Trustlines also include a **trust limit**—the maximum amount the account is willing to hold—and record the current balance and liabilities (e.g., open offers)&#x20;

Without a trustline, an account **cannot receive or hold** a token like USDC.

***

### 🔑 Why Trustlines Matter

* **Authorization:** They give permission for an account to hold a specific asset (e.g., USDC from its issuer).
* **Reserves:** Each trustline requires a small XLM reserve, so accounts can’t spam unlimited assets.
* **Limits:** A trustline sets a maximum balance the account is willing to hold.

***

### ⚡ Trustlines in Escrows

* **Escrows depend on trustlines.**

Our escrows can be configured for ANY trustline on Stellar. But all roles must have the Trustline with that asset.&#x20;

* **Practical impact:** All participants must have the proper trustline set up first.



***
