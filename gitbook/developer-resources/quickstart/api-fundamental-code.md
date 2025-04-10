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

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### Entities Typescript

<details>

<summary>Milestones</summary>

```typescript
export type MilestoneStatus = "" | ""; // You can set the necessary statuses

export type Milestone = {
  description: string;
  status?: MilestoneStatus;
  approved_flag?: boolean;
};
```

</details>

<details>

<summary>Trustlines</summary>

```typescript
export interface Trustline {
  name: string;
  trustline: string;
  trustlineDecimals: number;
}

```

</details>

<details>

<summary>Roles</summary>

```typescript
export type RolesInEscrow =
  | "issuer"
  | "approver"
  | "disputeResolver"
  | "serviceProvider"
  | "releaseSigner"
  | "platformAddress"
  | "reciever";
```

</details>

<details>

<summary>Balance</summary>

```typescript
export interface BalanceItem {
  address: string;
  balance: number;
}
```

</details>

<details>

<summary>Escrows</summary>

```typescript
export interface Escrow {
  id: string;
  title: string;
  description: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  contractId?: string;
  balance?: string;
  trustline?: Trustline;
  milestones: Milestone[];
  serviceProvider: string;
  engagementId: string;
  disputeResolver: string;
  amount: string;
  platformAddress: string;
  platformFee: string;
  approver: string;
  releaseSigner: string;
  user: string;
  issuer: string;
  disputeFlag?: boolean;
  releaseFlag?: boolean;
  resolvedFlag?: boolean;
  approverFunds?: string;
  serviceProviderFunds?: string;
  receiver?: string;
  receiverMemo?: number;
  disputeStartedBy?: string;
}

// Payloads to each Endpoint
export type FundEscrowPayload = Pick<Escrow, "amount" | "contractId"> & {
  signer: string;
};

export type DistributeEscrowEarningsEscrowPayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "serviceProvider" | "releaseSigner">> & {
    signer: string;
  };

export type EscrowPayload = Omit<
  Escrow,
  "user" | "createdAt" | "updatedAt" | "id" | "trustline"
>;

export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: MilestoneStatus;
  serviceProvider?: string;
};

export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

export type StartDisputePayload = Pick<Escrow, "contractId"> & {
  signer: string;
};

export type ResolveDisputePayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "disputeResolver">> & {
    approverFunds: string;
    serviceProviderFunds: string;
  };

export type EditMilestonesPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};
```

</details>

***

### Services - Endpoints

<details>

<summary>Initialize Escrow</summary>



```typescript
import { EscrowPayload } from "@/@types/escrow.entity";
import http from "@/lib/axios.ts";
import { kit, signTransaction } from ".lib/stellar-wallet-kit.ts";
import axios from "axios";

interface EscrowPayloadWithSigner extends EscrowPayload {
  signer?: string;
  trustlineDecimals: number | undefined;
}

export const initializeEscrow = async (
  payload: EscrowPayloadWithSigner,
  address: string,
) => {
  try {
    const payloadWithSigner: EscrowPayloadWithSigner = {
      ...payload,
      signer: address,
    };

    // FETCH - Initialize Escrow
    const response = await http.post(
      "/deployer/invoke-deployer-contract",
      payloadWithSigner,
    );

    // Get unsigned hash transaction 
    const { unsignedTransaction } = response.data;

    // Sign transaction
    const signedTxXdr = await signTransaction({ unsignedTransaction, address });

    // FETCH - Send transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
      returnEscrowDataIsRequired: true,
    });

    const { data } = tx;

    return data;
  } catch (error: unknown) {
    // catch logic
};

```

</details>

References:&#x20;

{% content-ref url="../api-reference/deploy/initialize-escrow.md" %}
[initialize-escrow.md](../api-reference/deploy/initialize-escrow.md)
{% endcontent-ref %}

{% content-ref url="../smart-escrow-design/escrow-lifecycle/initiation-phase.md" %}
[initiation-phase.md](../smart-escrow-design/escrow-lifecycle/initiation-phase.md)
{% endcontent-ref %}

***

<details>

<summary>Fund Escrow</summary>



</details>



















