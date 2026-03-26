---
description: In this section, you'll learn how to go mainnet by using our API REST
icon: plane-departure
layout:
  width: default
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
---

# API REST

### Go live with the REST API

To move your REST integration to mainnet, update **three network-specific values**.

{% hint style="warning" %}
Do not mix testnet and mainnet values.

If one value still points to testnet, the integration can fail.
{% endhint %}

{% stepper %}
{% step %}
### Use the mainnet asset issuer

Your escrow asset must use the **mainnet issuer address**.

If you send a testnet asset issuer, such as testnet USDC, it will not work on mainnet.

Review the issuer addresses here:

{% content-ref url="../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md" %}
[trustlines.md](../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md)
{% endcontent-ref %}
{% endstep %}

{% step %}
### Switch the API base URL

The testnet API URL is:

`https://dev.api.trustlesswork.com`

The mainnet API URL is:

`https://api.trustlesswork.com`

Make sure every request points to the mainnet URL before launch.

You can verify the base URLs here:

{% content-ref url="../api-rest/introduction.md" %}
[introduction.md](../api-rest/introduction.md)
{% endcontent-ref %}
{% endstep %}

{% step %}
### Generate a mainnet API key

Mainnet requires a **mainnet API key**.

A testnet API key will not authenticate against the mainnet API.

When requesting the key in the dApp, switch to the **Mainnet** tab first.

Then request and store the key securely.

See the full process here:

{% content-ref url="../introduction/developer-resources/request-api-key.md" %}
[request-api-key.md](../introduction/developer-resources/request-api-key.md)
{% endcontent-ref %}
{% endstep %}
{% endstepper %}

### Mainnet checklist

Before sending your first live request, confirm this:

* Your asset issuer is the **mainnet** issuer.
* Your API base URL is `https://api.trustlesswork.com`.
* Your API key was generated from the **Mainnet** tab.
* The wallets involved have the correct **mainnet trustlines**.

{% hint style="success" %}
If these four checks pass, your REST integration is ready for production traffic.
{% endhint %}
