# API Fundamental Code

## Important blocks in the dApp to make TW works

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

In our case, as we're using Stellar, so we'll use the [Stellar Wallet Kit](https://stellarwalletskit.dev) library, but you can use whatever you want.

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

export const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: // wallets that you'd like to add,
  modules: // modules that you'd like to add,
});

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
