---
description: >-
  On Stellar, accounts must explicitly opt in to hold and use assets. This
  opt-in is called a trustline.
icon: ring
---

# Trustlines

Trustlines are how Stellar accounts opt in to **issued assets**.

If an account has no trustline, it cannot hold that asset.

{% hint style="info" %}
Each trustline increases the account’s minimum balance by **0.5 XLM** (base reserve).
{% endhint %}

### What is a trustline?

* A trustline links an account to an **asset issuer**.
* It allows the account to **receive, hold, and send** that asset.
* It includes a **limit** (max balance you accept).
* It tracks balance and liabilities (like open offers).

### Why trustlines matter for escrows

Trustless Work escrows can use **any Stellar-issued asset**.

Every participant must be able to hold that asset.

{% hint style="warning" %}
If a signer can’t hold the escrow asset, their step may fail. Set trustlines before testing any escrow flow.
{% endhint %}

### Issuer addresses (USDC / EURC)

Use these issuer addresses when you configure the escrow trustline.

{% tabs %}
{% tab title="USDC" %}
**Testnet issuer**

[`GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`](https://stellar.expert/explorer/testnet/asset/USDC-GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5)

**Mainnet issuer**

[`GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`](https://stellar.expert/explorer/public/asset/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN)
{% endtab %}

{% tab title="EURC" %}
**Testnet issuer**

[`GB3Q6QDZYTHWT7E5PVS3W7FUT5GVAFC5KSZFFLPU25GO7VTC3NM2ZTVO`](https://stellar.expert/explorer/testnet/asset/EURC-GB3Q6QDZYTHWT7E5PVS3W7FUT5GVAFC5KSZFFLPU25GO7VTC3NM2ZTVO?asset%5B%5D=EURC-GB3Q6QDZYTHWT7E5PVS3W7FUT5GVAFC5KSZFFLPU25GO7VTC3NM2ZTVO-1)

**Mainnet issuer**

[`GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2`](https://stellar.expert/explorer/public/asset/EURC-GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**References**

* Circle: [USDC contract addresses](https://developers.circle.com/stablecoins/usdc-contract-addresses)
* Circle: [EURC contract addresses](https://developers.circle.com/stablecoins/eurc-contract-addresses)
* Community: [Stellar stablecoin explorer](https://stablecoin.stellarlight.xyz/)
{% endhint %}
