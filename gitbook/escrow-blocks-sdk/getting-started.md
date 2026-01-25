---
icon: flag-checkered
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Getting Started - Blocks

### Overview

Trustless Work Blocks is a set of React UI blocks, hooks, and providers.

It bundles (or expects) these core libraries:

* [**react-hook-form**](https://react-hook-form.com/) — Performant, flexible library for managing forms in React.
* [**zod**](https://zod.dev/) — TypeScript-first schema validation library.
* [**@trustless-work/escrow**](https://www.npmjs.com/package/@trustless-work/escrow) — SDK for handling escrow logic in decentralized apps.
* [**@tanstack/react-query**](https://tanstack.com/query/latest) — Data-fetching and caching library for React.
* [**@tanstack/react-query-devtools**](https://tanstack.com/query/latest/docs/react/guides/devtools) — Developer tools for inspecting React Query state.
* [**@hookform/resolvers**](https://react-hook-form.com/docs/useform/#resolver) — Resolvers for integrating validation libraries (like Zod) with React Hook Form.
* [**@creit.tech/stellar-wallets-kit**](https://www.npmjs.com/package/@creit.tech/stellar-wallets-kit) — Wallet connection toolkit for Stellar blockchain.
* [**axios**](https://axios-http.com/) — Promise-based HTTP client for making API requests.
* [**@tanstack/react-table**](https://tanstack.com/table/latest) — Headless table library for building flexible data grids.
* [**react-day-picker**](https://react-day-picker.js.org/) — Lightweight date picker component for React.
* [**recharts**](https://recharts.org/en-US/) — Charting library built with React and D3.

***

### Links

{% embed url="https://www.npmjs.com/package/@trustless-work/blocks" %}

### Setup

{% stepper %}
{% step %}
### Installation

Start by installing Trustless Work Blocks

{% tabs %}
{% tab title="npm" %}
```sh
npm install @trustless-work/blocks
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn add @trustless-work/blocks
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
### Initialize Configuration

Initialize your project with the CLI.

{% tabs %}
{% tab title="npm" %}
```sh
npx trustless-work init
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
### Configure Environment

The next step is to configure the Trustless Work provider. You need to configure the following:

* `baseURL`: Trustless Work API URL. Use `mainNet` or `development`.
* `apiKey`: Authorization provided by our dApp to use the API.

Create a provider that wraps your app with `TrustlessWorkConfig`.

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
  /**
   * Get the API key from the environment variables
   */
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  return (
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}

```
{% endcode %}

{% hint style="info" %}
Read-only flows can work without an API key.\
Write flows (deploy/fund/release/…) require a valid key.
{% endhint %}
{% endstep %}

{% step %}
### Wrap your app with providers

You must wrap your app with these providers:

* `ReactQueryClientProvider`
* `TrustlessWorkProvider`
* `WalletProvider`

If you want to use some blocks, you should wrap your app with their providers. See more in: [Dependencies](https://blocks.trustlesswork.com/get-started/dependencies)
{% endstep %}

{% step %}
### Add your First Component

Add wallet connectivity to your app:

```sh
npx trustless-work add wallet-kit
```

Example usage in a page:

{% code title="page.tsx" %}
```typescript
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Escrows</h1>
        <WalletButton />
      </div>
    </div>
  );
}
```
{% endcode %}
{% endstep %}
{% endstepper %}

Now, you are able to interact with Trustless Work blocks.
