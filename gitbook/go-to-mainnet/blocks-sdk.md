---
description: In this section, you'll learn how to go mainnet by using our React Blocks SDK
icon: object-union
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

# Blocks SDK

### Go live with the React SDK

To move your React Blocks SDK integration to mainnet, update **three network-specific values**.

{% hint style="warning" %}
Do not mix testnet and mainnet values.

If one value still points to testnet, the flow can fail.
{% endhint %}

{% stepper %}
{% step %}
### Use the mainnet asset issuer

Your escrow asset must use the **mainnet issuer address**.

If you send a testnet issuer, such as testnet USDC, it will not work on mainnet.

Review the issuer addresses here:

{% content-ref url="../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md" %}
[trustlines.md](../introduction/stellar-and-soroban-the-backbone-of-trustless-work/trustlines.md)
{% endcontent-ref %}
{% endstep %}

{% step %}
### Change the provider base URL to mainnet

In your `TrustlessWorkProvider`, update `baseURL` from `development` to `mainNet`.

Use the provider setup shown in [Getting Started](../escrow-react-sdk/getting-started.md), but switch the network value before going live.

{% code title="src/trustless-work-provider.tsx" overflow="wrap" fullWidth="true" %}
```typescript
"use client";

import React from "react";
import {
  development,
  mainNet,
  TrustlessWorkConfig,
} from "@trustless-work/escrow";

interface TrustlessWorkProviderProps {
  children: React.ReactNode;
}

export function TrustlessWorkProvider({
  children,
}: TrustlessWorkProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  return (
    <TrustlessWorkConfig baseURL={mainNet} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}
```
{% endcode %}

{% hint style="info" %}
`development` points to testnet.

`mainNet` points to production.
{% endhint %}
{% endstep %}

{% step %}
### Generate a mainnet API key

Mainnet requires a **mainnet API key**.

A testnet API key will not authenticate against the mainnet environment.

When requesting the key in the dApp, switch to the **Mainnet** tab first.

Then request and store the key securely.

See the full process here:

{% content-ref url="../introduction/developer-resources/request-api-key.md" %}
[request-api-key.md](../introduction/developer-resources/request-api-key.md)
{% endcontent-ref %}
{% endstep %}
{% endstepper %}

### Mainnet checklist

Before shipping your React app, confirm this:

* Your asset issuer is the **mainnet** issuer.
* Your provider uses `baseURL={mainNet}`.
* Your API key was generated from the **Mainnet** tab.
* The wallets involved have the correct **mainnet trustlines**.

{% hint style="success" %}
If these four checks pass, your React SDK integration is ready for production.
{% endhint %}
