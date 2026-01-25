---
icon: flag-checkered
---

# Getting Started

### Overview

The Trustless Work React SDK is a collection of hooks and typed entities.

It uses [Axios](https://axios-http.com/docs/intro) for HTTP requests.

{% hint style="info" %}
Write flows require an API key (`NEXT_PUBLIC_API_KEY`). Read-only calls can work without one.
{% endhint %}

### Quick links

<table data-view="cards"><thead><tr><th>Title</th><th data-card-target data-type="content-ref">Link</th></tr></thead><tbody><tr><td>NPM package</td><td><a href="https://www.npmjs.com/package/@trustless-work/escrow">https://www.npmjs.com/package/@trustless-work/escrow</a></td></tr><tr><td>API basics (base URLs, Swagger, limits)</td><td><a href="../api-rest/introduction.md">introduction.md</a></td></tr><tr><td>Send signed transactions (XDR)</td><td><a href="usesendtransaction.md">usesendtransaction.md</a></td></tr></tbody></table>

### Setup

{% stepper %}
{% step %}
### Installation

Install the SDK.

{% tabs %}
{% tab title="npm" %}
```sh
npm install "@trustless-work/escrow"
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn add "@trustless-work/escrow"
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
### Configure the provider

You’ll configure 2 things:

* `baseURL`: use `development` (testnet) or `mainNet` (mainnet).
* `apiKey`: from the BackOffice dApp.

The SDK exports `TrustlessWorkConfig`. Wrap your app with it to enable all hooks.

{% code title="src/trustless-work-provider.tsx" overflow="wrap" fullWidth="true" %}
```typescript
"use client"; // make sure this is a client component

import React from "react";
import {
  // development environment = "https://dev.api.trustlesswork.com"
  development,

  // mainnet environment = "https://api.trustlesswork.com"
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
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}

```
{% endcode %}

{% hint style="warning" %}
If you render this provider on the server, hooks will break. Keep it in a client component.
{% endhint %}
{% endstep %}

{% step %}
### Wrap your app

Pick the snippet that matches your setup.

{% tabs %}
{% tab title="Next.js (App Router)" %}
{% code title="app/layout.tsx" %}
```typescript
import { TrustlessWorkProvider } from "@/trustless-work-provider";
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TrustlessWorkProvider>{children}</TrustlessWorkProvider>
      </body>
    </html>
  );
}
```
{% endcode %}
{% endtab %}

{% tab title="React (SPA)" %}
{% code title="src/app.tsx" %}
```typescript
import { TrustlessWorkProvider } from "./trustless-work-provider";
 
export function App() {
  return (
    <TrustlessWorkProvider>
      <YourApp />
    </TrustlessWorkProvider>
  );
}
```
{% endcode %}
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
### Use hooks and entities

You can now call SDK hooks from any component under the provider.

Typical flow:

1. Call a hook to get an **unsigned XDR**.
2. Sign the XDR with the correct role wallet.
3. Submit it with `useSendTransaction`.

Read: [useSendTransaction](usesendtransaction.md).
{% endstep %}
{% endstepper %}

{% hint style="success" %}
This SDK supports **single-release** and **multi-release** escrows. Use the correct hook + payload type for each flow.
{% endhint %}
