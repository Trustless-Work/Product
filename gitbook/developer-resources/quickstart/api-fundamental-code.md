---
description: >-
  It is important to clarify that the technologies being used are only examples,
  as provided in our dApp. You can use any other technology you need.
---

# API Fundamental Code

## Core Configuration

### Fetching

In this part, you can use the library of your choice. In TW case, we're using [axios](https://axios-http.com/docs/intro), but you can use whatever you want.

In order to set the **.env**, please go to:

{% content-ref url="dapp-locally.md" %}
[dapp-locally.md](dapp-locally.md)
{% endcontent-ref %}

{% tabs %}
{% tab title="npm" %}
npm install axios
{% endtab %}

{% tab title="yarn" %}
yarn add axios
{% endtab %}

{% tab title="pnpm" %}
pnpm add axios
{% endtab %}

{% tab title="bun" %}
bun add axios
{% endtab %}
{% endtabs %}



_src\lib\axios.ts_

```tsx
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 60000, // 1 minute
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export default http;
```

***

### Wallet Integration

In our case, we're using [**Stellar Wallet Kit**](https://stellarwalletskit.dev), a library that simplifies connecting to Stellar-compatible wallets like **Freighter**. A wallet is necessary because all escrow actions—such as creating, funding, or releasing—require users to **sign blockchain transactions (XDR format)** with their private keys. Stellar Wallet Kit handles the interaction and signing process securely from the frontend. That said, you’re free to use any wallet that supports XDR signing, as long as it integrates smoothly with your app.

{% tabs %}
{% tab title="npm" %}
npm install "@creit.tech/stellar-wallets-kit"
{% endtab %}

{% tab title="yarn" %}
yarn add "@creit.tech/stellar-wallets-kit"
{% endtab %}

{% tab title="pnpm" %}
pnpm add "@creit.tech/stellar-wallets-kit"
{% endtab %}

{% tab title="bun" %}
bun add "@creit.tech/stellar-wallets-kit"
{% endtab %}
{% endtabs %}



_src\lib\stellar-wallet-kit.ts_

```typescript
import {
  StellarWalletsKit,
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

// KIT Configuration
export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: // wallets that you'd like to add,
  modules: // modules that you'd like to add,
});

// Sign Transaction
interface signTransactionProps {
  unsignedTransaction: string;
  address: string;
}

export const signTransaction = async ({
  unsignedTransaction,
  address,
}: signTransactionProps): Promise<string> => {
  const { signedTxXdr } = await kit.signTransaction(unsignedTransaction, {
    address,
    networkPassphrase: WalletNetwork.TESTNET, // or Mainnet
  });

  return signedTxXdr;
};


```

***

### Global State Management

In our case, as we're using  [Zustand ](https://zustand-demo.pmnd.rs)library, but you can use whatever you want.

{% tabs %}
{% tab title="npm" %}
npm install zustand
{% endtab %}

{% tab title="yarn" %}
yarn add zustand
{% endtab %}

{% tab title="pnpm" %}
pnpm add zustand
{% endtab %}

{% tab title="bun" %}
bun add zustand
{% endtab %}
{% endtabs %}



**src\components\modules\auth\wallet\hooks\wallet.hook.ts**

```typescript
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { kit } from ".lib/stellar-wallet-kit.ts";
import { useGlobalAuthenticationStore } from "@/core/store/data";

export const useWallet = () => {
  const { connectWalletStore, disconnectWalletStore } =
    useGlobalAuthenticationStore(); /* If you're using some global state 
    management, in our case is Zustand */

  const connectWallet = async () => {
    await kit.openModal({
      modalTitle: "Connect to your favorite wallet",
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);

        const { address } = await kit.getAddress();
        const { name } = option;

        connectWalletStore(address, name); /* save the adddress and name's wallet 
        into your state management */
      },
    });
  };

  const disconnectWallet = async () => {
    await kit.disconnect();
    disconnectWalletStore(); /* remove the adddress and name's wallet 
    of your state management */
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    handleConnect,
    handleDisconnect,
  };
};

```

{% hint style="info" %}
When you already have this part done, you can create some buttons to use the `handleConnect` and `handleDisconnect` functions.
{% endhint %}

## Integration TW API

### Basic Flow

<figure><img src="../../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>

***

### Services - Endpoints

Flow that must always be executed at each Endpoint **except** `Get Balances`

<figure><img src="../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

