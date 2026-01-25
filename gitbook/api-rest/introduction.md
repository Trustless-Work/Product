---
description: How to get started in Trustless Work API REST
icon: play
---

# Introduction

### What is the Trustless Work API?

The **Trustless Work REST API** lets you create and manage **decentralized escrow contracts** on **Stellar** using **Soroban** smart contracts.

Use it to deploy escrows, fund them, track milestones, and release funds.

### Base URLs

{% tabs %}
{% tab title="Mainnet" %}
{% code title="Base URL (Mainnet)" %}
```
https://api.trustlesswork.com
```
{% endcode %}
{% endtab %}

{% tab title="Testnet" %}
{% code title="Base URL (Testnet)" %}
```
https://dev.api.trustlesswork.com
```
{% endcode %}
{% endtab %}
{% endtabs %}

### Core capabilities

* **Deploy escrows** with roles, milestones, and conditions.
* **Fund escrows** using Stellar assets (example: USDC).
* **Approve / update milestones** to drive releases.
* **Dispute and resolution** flows (escrow-level or milestone-level).
* **Release funds** only when conditions are met.
* **Query status** for escrows, milestones, and balances.

### Escrow types

1. **Single-release escrow**
   * One release action for the full amount.
2. **Multi-release escrow**
   * Multiple milestone payouts.
   * Each milestone can be approved, disputed, and released independently.

### Rate limits

{% hint style="warning" %}
Limit: **50 requests per 60 seconds** per client.
{% endhint %}

### Transactions, signing, and permissions

{% hint style="info" %}
Most write endpoints return **unsigned XDR**.\
You must sign client-side with the correct role wallet.
{% endhint %}

Actions are **role-gated** (approve, dispute, resolve, release).

### Endpoint map (high level)

Use Swagger for the full spec. These groups cover most integrations:

#### Deployment

* `/deployer/single-release`
* `/deployer/multi-release`

#### Funding

* `/escrow/{type}/fund-escrow`

#### Milestones

* `/escrow/{type}/approve-milestone`
* `/escrow/{type}/change-milestone-status`

#### Release

* `/escrow/{type}/release-funds` (single)
* `/escrow/{type}/release-milestone-funds` (multi)

#### Disputes

* `/escrow/{type}/dispute-escrow`
* `/escrow/{type}/resolve-dispute`
* `/escrow/{type}/dispute-milestone` (multi)
* `/escrow/{type}/resolve-milestone-dispute` (multi)

#### Updates

* `/escrow/{type}/update-escrow`

#### Query / helpers

* `/escrow/get-multiple-escrow-balance`
* `/helper/get-escrows-by-signer`
* `/helper/get-escrows-by-role`
* `/helper/set-trustline`
* `/helper/send-transaction`

### Fees

Mainnet charges a **0.3% protocol fee**.

### API docs (Swagger)

{% tabs %}
{% tab title="Mainnet" %}
{% embed url="https://api.trustlesswork.com/docs" %}
{% endtab %}

{% tab title="Testnet" %}
{% embed url="https://dev.api.trustlesswork.com/docs" %}
{% endtab %}
{% endtabs %}

### Dev resources

* Dev map: [https://www.trustlesswork.com/developers](https://www.trustlesswork.com/developers)

### GitHub repository

{% embed url="https://github.com/Trustless-Work" %}
