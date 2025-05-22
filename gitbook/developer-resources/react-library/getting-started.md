---
icon: flag-checkered
layout:
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
---

# Getting Started

## Overview

Trustless Work React library is a collection of React hooks and entities. It combines the following packages:

* [**Axios**](https://axios-http.com/es/docs/intro) for https requests.
* [**Tanstak Query**](https://tanstack.com/query/latest/docs/framework/react/overview) from fetching data.

***

## Links

{% embed url="https://www.npmjs.com/package/@trustless-work/escrow" %}

{% embed url="https://github.com/Trustless-Work/react-library-trustless-work" %}

## Setup

{% stepper %}
{% step %}
### Installation

Start by installing Trustless Work React Library.

{% tabs %}
{% tab title="npm" %}
```sh
npm i @trustless-work/escrow
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn add @trustless-work/escrow
```
{% endtab %}
{% endtabs %}


{% endstep %}

{% step %}
#### Configure the provider

The next step is to configure the Trustless Work provider. You need to configure the following:

* `baseURL`: Trustless Work URL, this should be the main or development environment. We provide `mainNet`and `development`constants. So you only need to import one of them and pass it to the baseURL prop.
* `apiKey`: Authorization provided by our dApp to use the API.

Trustless Work React provides the `TrustlessWorkConfig` to provides all the custom hooks and entities to the whole project. To achieve this you'll need to create a Provider.

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
{% endstep %}

{% step %}
#### Wrap your app in the provider

Wrap your app in the provider just created.

{% code title="app.tsx" %}
```typescript
import { TrustlessWorkProvider} from "@/trustless-work-provider.tsx";
 
export function App() {
  return (
    <TrustlessWorkProvider>
      <YourApp />
    </TrustlessWorkProvider>
  );
}
```
{% endcode %}

Notice that if you are using Next.js app routes, you should place the provider in the root layout file.

{% code title="app/layout.tsx" %}
```typescript
import { TrustlessWorkProvider} from "@/trustless-work-provider.tsx";
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TrustlessWorkProvider>
          {children}
        </TrustlessWorkProvider>
      </body>
    </html>
  );
}
```
{% endcode %}
{% endstep %}

{% step %}
#### Using hooks

You can now use the Trustless Work React hooks from any component wrapped by the root provider!


{% endstep %}
{% endstepper %}

