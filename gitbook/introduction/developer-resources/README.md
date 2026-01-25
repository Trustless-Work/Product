---
description: Start building on Trustless Work with the REST API or SDKs.
icon: brackets-curly
---

# Developer Guide

Trustless Work is **Escrow-as-a-Service** on **Stellar (Soroban)**.

Use it to deploy escrows, fund them, track milestones, and release funds. Your app drives the flow via **REST API** or **SDKs**.

{% hint style="info" %}
Most write endpoints return an **unsigned XDR**.\
You must sign it client-side with the correct **role wallet**.
{% endhint %}

### Pick your integration path

#### REST API

Use this if you want full control and you’re already signing Stellar transactions.

* [REST API: Introduction](../../api-rest/introduction.md)

#### React SDK (hooks)

Use this if you want typed hooks for every escrow action.

* [React SDK: Getting Started](../../escrow-react-sdk/getting-started.md)

#### Escrow Blocks SDK (UI blocks)

Use this if you want ready-made UI blocks and wallet connectivity.

* [Escrow Blocks SDK: Getting Started](../../escrow-blocks-sdk/getting-started.md)

### Quickstart (recommended order)

{% stepper %}
{% step %}
### 1) Get access

Request an API key. You’ll need it for deploy/fund/release/dispute flows.

* [Request API Key](request-api-key.md)
{% endstep %}

{% step %}
### 2) Set up auth + signing

Wire up the auth header. Then get your wallet(s) ready to sign XDR.

* [Authentication](authentication.md)
{% endstep %}

{% step %}
### 3) Learn the data model

You’ll use these types in every request/response.

* [Schema](schema.md)
* [Types](types/)
{% endstep %}

{% step %}
### 4) Implement the core flow

Typical sequence:

1. Deploy / initialize escrow
2. Fund escrow
3. Approve or update milestones (if used)
4. Release funds (or dispute + resolve)

Use the checklist to cover edge cases and role permissions.

* [Integration checklist](integration-checklist.md)
{% endstep %}
{% endstepper %}

### Prereqs (Stellar)

* [Stellar Wallets](../stellar-and-soroban-the-backbone-of-trustless-work/stellar-wallets/)
* [Trustlines](../stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md)
* [Testnet Tokens](../stellar-and-soroban-the-backbone-of-trustless-work/testnet-tokens.md)

### Concepts and architecture

* [Escrow Design](../technology-overview/)
* [Architecture](architecture.md)
* [Escrow products Mix & Match Guide](../technology-overview/smart-escrow-design.md)

### Try the Backoffice dApp

Use it to request API keys and test flows end-to-end.

{% embed url="https://dapp.trustlesswork.com" %}
