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

### Entities Typescript

<details>

<summary>Milestones</summary>

```typescript
export type MilestoneStatus = "" | ""; // You can set the necessary statuses

export type Milestone = {
  description: string;
  status: MilestoneStatus;
  evidence: string;
  approvedFlag: boolean;
};

```

</details>

<details>

<summary>Trustlines</summary>

```typescript
export interface Trustline {
  name?: string;
  address: string;
  decimals: number;
}

```

</details>

<details>

<summary>Roles</summary>

```typescript
export type Roles = {
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  releaseSigner: string;
  disputeResolver: string;
  receiver: string;
};
```

</details>

<details>

<summary>Flags</summary>

```typescript
export type Flags = {
  disputeFlag?: boolean;
  releaseFlag?: boolean;
  resolvedFlag?: boolean;
};
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
  signer?: string;
  contractId?: string;
  engagementId: string;
  title: string;
  roles: Roles;
  description: string;
  amount: string;
  platformFee: string;
  balance?: string;
  milestones: Milestone[];
  flags?: Flags;
  trustline: Trustline;
  receiverMemo: number;
}

// Payloads to each Endpoint
import type { Escrow } from "./escrow.entity";

// Payload base
export type EscrowPayload = Escrow;

export type InitializeEscrowPayload = Omit<
  EscrowPayload, "contractId"
> & {};

export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: string;
  evidence?: string;
  serviceProvider?: string;
};

export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

export type StartDisputePayload = {
  contractId: string;
  signer: string;
};

export type ResolveDisputePayload = {
  contractId: string;
  disputeResolver?: string;
  approverFunds: string;
  receiverFunds: string;
};

export type FundEscrowPayload = {
  amount: string;
  contractId: string;
  signer: string;
};

export type GetEscrowPayload = {
  contractId: string;
  signer: string;
};

export type ReleaseFundsEscrowPayload = {
  contractId: string;
  serviceProvider?: string;
  releaseSigner?: string;
  signer: string;
};

export type UpdateEscrowPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};

export type GetBalanceParams = {
  signer: string;
  addresses: string[];
};

export type EscrowPayloadService =
  | Escrow
  | InitializeEscrowPayload
  | GetEscrowPayload
  | ChangeMilestoneStatusPayload
  | ChangeMilestoneFlagPayload
  | StartDisputePayload
  | ResolveDisputePayload
  | FundEscrowPayload
  | ReleaseFundsEscrowPayload
  | UpdateEscrowPayload
  | GetBalanceParams;
crowPayload;
  signer: string;
};
```

</details>

***

### Services - Endpoints

Flow that must always be executed at each Endpoint **except** `Get Balances`

<figure><img src="../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>



1. Initialize Escrow

{% content-ref url="../api-reference/deploy/initialize-escrow.md" %}
[initialize-escrow.md](../api-reference/deploy/initialize-escrow.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/initiation-phase.md" %}
[initiation-phase.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/initiation-phase.md)
{% endcontent-ref %}

***

2. Fund Escrow

{% content-ref url="../api-reference/escrows/fund-escrow.md" %}
[fund-escrow.md](../api-reference/escrows/fund-escrow.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/funding-phase.md" %}
[funding-phase.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/funding-phase.md)
{% endcontent-ref %}

***

3. Get Multiple Escrow Balance

{% content-ref url="../api-reference/escrows/get-multiple-escrow-balance.md" %}
[get-multiple-escrow-balance.md](../api-reference/escrows/get-multiple-escrow-balance.md)
{% endcontent-ref %}

***

4. Update Escrow

{% content-ref url="../api-reference/escrows/update-escrow-properties.md" %}
[update-escrow-properties.md](../api-reference/escrows/update-escrow-properties.md)
{% endcontent-ref %}

***

5. Change Milestone Status

{% content-ref url="../api-reference/escrows/change-milestone-status.md" %}
[change-milestone-status.md](../api-reference/escrows/change-milestone-status.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/milestone-status-update.md" %}
[milestone-status-update.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/milestone-status-update.md)
{% endcontent-ref %}

***

6. Change Milestone Flag

{% content-ref url="../api-reference/escrows/change-milestone-flag.md" %}
[change-milestone-flag.md](../api-reference/escrows/change-milestone-flag.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/approval-phase.md" %}
[approval-phase.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/approval-phase.md)
{% endcontent-ref %}

***

7. Distribute Escrow Earnings

{% content-ref url="../api-reference/escrows/release-funds.md" %}
[release-funds.md](../api-reference/escrows/release-funds.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/release-phase.md" %}
[release-phase.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/release-phase.md)
{% endcontent-ref %}

***

8. Change Dispute Flag

{% content-ref url="../api-reference/escrows/change-dispute-flag.md" %}
[change-dispute-flag.md](../api-reference/escrows/change-dispute-flag.md)
{% endcontent-ref %}

***

9. Resolve Dispute

{% content-ref url="../api-reference/escrows/resolving-disputes.md" %}
[resolving-disputes.md](../api-reference/escrows/resolving-disputes.md)
{% endcontent-ref %}

{% content-ref url="../../technology-overview/smart-escrow-design/escrow-lifecycle/dispute-resolution.md" %}
[dispute-resolution.md](../../technology-overview/smart-escrow-design/escrow-lifecycle/dispute-resolution.md)
{% endcontent-ref %}

## Best Use Cases

**Trustless Work** provides a flexible **Escrow-as-a-Service** platform that can be applied across many different use cases.

{% content-ref url="../../use-cases-unlocking-the-potential-of-smart-escrows/" %}
[use-cases-unlocking-the-potential-of-smart-escrows](../../use-cases-unlocking-the-potential-of-smart-escrows/)
{% endcontent-ref %}

