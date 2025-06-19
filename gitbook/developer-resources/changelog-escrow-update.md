---
description: 'Release Date: June 2025'
---

# Changelog — Escrow Update

#### 1. 🚀 New Escrow Types: `Single-Release` & `Multi-Release`

Trustless Work now supports two distinct types of smart escrow contracts:

* `Single-Release`: for simple, one-time fund releases
* `Multi-Release`: for milestone-based, progressive releases

***

#### 2. 🔁 Endpoint Renaming for Escrow-Type Support

All major endpoints have been updated to reflect the escrow type in the URL structure.

| Endpoint Action         | Old URL                                 | New URL                                      |
| ----------------------- | --------------------------------------- | -------------------------------------------- |
| Initialize Escrow       | `/deployer/invoke-deployer-contract`    | `/deployer/{escrow-type}`                    |
| Fund Escrow             | `/escrow/fund-escrow`                   | `/{escrow-type}/fund-escrow`                 |
| Distribute Earnings     | `/escrow/distribute-escrow-earnings`    | `/{escrow-type}/release-funds`               |
| Change Milestone Status | `/escrow/change-milestone-status`       | `/{escrow-type}/change-milestone-status`     |
| Approve Milestone       | `/escrow/change-milestone-approve-flag` | `/{escrow-type}/approve-escrow`              |
| Set Dispute Flag        | `/escrow/change-dispute-flag`           | `/{escrow-type}/dispute-escrow`              |
| Resolve Dispute         | `/escrow/resolving-disputes`            | `/{escrow-type}/resolve-dispute`             |
| Update Escrow (by ID)   | `/escrow/update-escrow-by-contract-id`  | `/{escrow-type}/update-escrow`               |
| Get Multiple Balances   | `/helper/get-multiple-escrow-balance`   | `/{escrow-type}/get-multiple-escrow-balance` |
| Get Escrow              | `/escrow/get-escrow`                    | `/{escrow-type}/get-escrow`                  |

***

#### 3. 🧠 Escrow-Type Based API Routing

All main endpoints now follow this format:

```
arduinoCopyEdithttps://dev.api.trustlesswork.com/{escrow-type}/{endpoint}
```

Examples:

* `https://dev.api.trustlesswork.com/single-release/fund-escrow`
* `https://dev.api.trustlesswork.com/multi-release/fund-escrow`

This naming applies to _all_ escrow-specific endpoints.

> 🛑 **Exceptions:** These helper/auth endpoints remain universal (no escrow-type prefix):
>
> * `https://dev.api.trustlesswork.com/helper/set-trustline`
> * `https://dev.api.trustlesswork.com/helper/send-transaction`
> * `https://dev.api.trustlesswork.com/auth/request-api-key`

***

#### 4. 📦 New React Library

We’ve released an official **React library** for easier integration of Trustless Work into your frontend apps.\
It abstracts away boilerplate and simplifies API calls.

{% content-ref url="../react-library/" %}
[react-library](../react-library/)
{% endcontent-ref %}

***

#### 5. 🧱 Escrow Schema Refactor

We’ve restructured the internal schema of escrow objects for maintainability and scalability.

New Schema:

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

Old Schema:&#x20;

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
