---
description: >-
  Wallet provider, validators and a connect button powered by Stellar Wallets
  Kit.
icon: wallet
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
---

# Wallet Kit

### Installation

Execute this command to add the code component.

{% tabs %}
{% tab title="npm" %}
```sh
npx trustless-work add wallet-kit
```
{% endtab %}
{% endtabs %}

### Interface

How does it look like?

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

### Important Notes

* This block is required for all escrow blocks. It is used to provide the wallet provider, validators and a connect button powered by Stellar Wallets Kit. @Credit-Tech
* When you already added the block to your project, you should add the USDC trustline to your Wallet. Otherwise, the escrow interaction will not work.
* If you don't want to use the escrowProvider context, you'll need to provide the payload through an alternative method.
