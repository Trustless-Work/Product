---
description: Initial configuration of external libs.
icon: gear
---

# Configuration

Overview

In this section, we will configure the axios kit and stellar wallet. Everything you need to make it work.



## Environment Variables

For this project, we'll use the dev environment. In order to request the API Key, please go to our  [**dApp**](https://dapp.dev.trustlesswork.com) **and request it. You can see this section below as well:**

{% content-ref url="../../api-reference/authentication/request-api-key.md" %}
[request-api-key.md](../../api-reference/authentication/request-api-key.md)
{% endcontent-ref %}

```markup
NEXT_PUBLIC_API_URL_DEV=https://dev.api.trustlesswork.com
NEXT_PUBLIC_API_KEY=YOU API KEY
```



## Axios Configuration

```typescript
import axios from "axios";

/**
 *
 * Axios Instance
 * @Reference URL: https://axios-http.com/docs/intro
 *
 */
const http = axios.create({
  baseURL: NEXT_PUBLIC_API_URL_DEV,
  timeout: 60000, // 1 minute
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export default http;

```



## Stellar Wallet Kit Configuration

```typescript
import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  FreighterModule,
} from "@creit.tech/stellar-wallets-kit";

/**
 *
 * Stellar Wallets Kit
 * @Reference URL: https://stellarwalletskit.dev
 *
 */
export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: [new FreighterModule()],
});

```

