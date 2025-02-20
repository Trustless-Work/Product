---
icon: arrow-progress
description: >-
  Here you'll find the basic flow in order to use Trustless Work API. In this
  flows tutorial, we'll use as an example the integration of Trustless Work in
  our dApp.
---

# How to Integrate us

{% hint style="warning" %}
**Important Notes**

Be sure to checkout the [Smart Escrow Design](../../smart-escrow-design/) section for visual helpers.&#x20;
{% endhint %}

* We are using the Stellar Wallet Kit library.

{% embed url="https://stellarwalletskit.dev" %}

* We are using axios library with a pre-configuration with the Trustless Work URL and the Bearer token.

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: process.env.API_URL || "", // Trustless Work API URL
  timeout: 60000, // time
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`, // Trustless Work API Key
  },
});

export default http;

```

* You should connect to your favorite wallet, if you are in development, Freighter is recommended.

{% content-ref url="../../stellar-wallets/" %}
[stellar-wallets](../../stellar-wallets/)
{% endcontent-ref %}

* You'll be able to see the **Escrow** entity in the page below.

{% content-ref url="../escrows/schema.md" %}
[schema.md](../escrows/schema.md)
{% endcontent-ref %}

***



## Steps

1. **Initialize Escrow**

The escrow contract must be deployed, which in turn initializes the escrow with its metadata.

> **Payload Type:**

```tsx
export type EscrowPayload = Omit<
  Escrow,
  "user" | "createdAt" | "updatedAt" | "id"
>;
```

> **Execute Endpoint:**

```tsx
interface EscrowPayloadWithSigner extends EscrowPayload {
  signer?: string;
}

export const initializeEscrow = async (
  payload: EscrowPayloadWithSigner,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Add the signer
    const payloadWithSigner: EscrowPayloadWithSigner = {
      ...payload,
      signer: address,
    };

    // Execute the endpoint
    const response = await http.post(
      "/deployer/invoke-deployer-contract",
      payloadWithSigner,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
      returnValueIsRequired: true,
    });

    const { data } = tx;

    return data;
  } catch (error: unknown) {
    // catch code ...
  }
};
```



> **References:**

{% content-ref url="../deploy/initialize-escrow.md" %}
[initialize-escrow.md](../deploy/initialize-escrow.md)
{% endcontent-ref %}

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/initiation-phase.md" %}
[initiation-phase.md](../../smart-escrow-design/escrow-lifecycle/initiation-phase.md)
{% endcontent-ref %}



2. **Fund Escrow**

Each escrow must be funded before the release funds or resolve dispute. It's important to clarify that you can fund the escrow in any moment, but just for this case, we'll fund it in the beginning.

> **Payload Type:**

```typescript
export type FundEscrowPayload = Pick<Escrow, "amount" | "contractId"> & {
  signer: string;
};
```



> **Execute Endpoint:**

```typescript
export const fundEscrow = async (payload: FundEscrowPayload) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post("/escrow/fund-escrow", payload);

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
    // catch code...
  }
};

```



> **References:**

{% content-ref url="../escrows/fund-escrow.md" %}
[fund-escrow.md](../escrows/fund-escrow.md)
{% endcontent-ref %}

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/funding-phase.md" %}
[funding-phase.md](../../smart-escrow-design/escrow-lifecycle/funding-phase.md)
{% endcontent-ref %}



***

{% hint style="info" %}
These endpoints don't have any specific order to execute them
{% endhint %}

3. **Edit Milestones**

You can edit the milestones in any moment, but **just the Platform Entity** will be able to do it. Only the pending milestones will be editable.

> **Payload Type:**

```tsx
export type EditMilestonesPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};
```



> **Execute Endpoint:**

```typescript
export const editMilestones = async (payload: EditMilestonesPayload) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.put(
      "/escrow/update-escrow-by-contract-id",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
    // catch code...
  }
};
```



> **References:**

<mark style="color:red;">ADD REFERENCES</mark>



4. **Change Milestone Status**

With this endpoint you'll change the status of the milestones, but **just the Service Provider** will be able to do it.

> **Payload Type:**

```typescript
export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: MilestoneStatus; // you can custom your status
  serviceProvider?: string;
};
```



> **Execute Endpoint:**

```typescript
export const changeMilestoneStatus = async (
  payload: ChangeMilestoneStatusPayload,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post(
      "/escrow/change-milestone-status",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
   // catch code...
  }
};
```



> **References:**

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/milestone-status-update.md" %}
[milestone-status-update.md](../../smart-escrow-design/escrow-lifecycle/milestone-status-update.md)
{% endcontent-ref %}

{% content-ref url="../escrows/change-milestone-status.md" %}
[change-milestone-status.md](../escrows/change-milestone-status.md)
{% endcontent-ref %}



5. **Change Milestone Flag**

With this endpoint you'll approve the milestones, but **just the Approver** will be able to do it.

> **Payload Type:**

```typescript
export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};
```



> **Execute Endpoint:**

```tsx
export const changeMilestoneFlag = async (
  payload: ChangeMilestoneFlagPayload,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post(
      "/escrow/change-milestone-flag",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
   // catch code...
  }
};
```



> **References:**

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/approval-phase.md" %}
[approval-phase.md](../../smart-escrow-design/escrow-lifecycle/approval-phase.md)
{% endcontent-ref %}

{% content-ref url="../escrows/change-milestone-flag.md" %}
[change-milestone-flag.md](../escrows/change-milestone-flag.md)
{% endcontent-ref %}



6. **Change Dispute Flag**

In any moment, the **approver or service provider** can start a dispute. This cannot executed without funds in the escrow's balance.



> **Payload Type:**

```typescript
export type StartDisputePayload = Pick<Escrow, "contractId"> & {
  signer: string;
};
```



> **Execute Endpoint:**

```tsx
export const startDispute = async (
  payload: StartDisputePayload,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post(
      "/escrow/change-dispute-flag",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
   // catch code...
  }
};
```



> **References:**

{% content-ref url="../escrows/change-dispute-flag.md" %}
[change-dispute-flag.md](../escrows/change-dispute-flag.md)
{% endcontent-ref %}



***

{% hint style="warning" %}
**Case #1:** If all the milestones were completed and approved, you'll be able to release the funds.
{% endhint %}

7. **Distribute Escrow Earnings**

When the escrow is ready to be released, you can do it with this endpoint. Only the **release signer** can do it.

> **Payload Type:**

```typescript
export type DistributeEscrowEarningsEscrowPayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "serviceProvider" | "releaseSigner">> & {
    signer: string;
  };
```



> **Execute Endpoint:**

<pre class="language-tsx"><code class="lang-tsx"><strong>export const distributeEscrowEarnings = async (
</strong>  payload: DistributeEscrowEarningsEscrowPayload,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post(
      "/escrow/distribute-escrow-earnings",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
   // catch code...
  }
};
</code></pre>



> **References:**

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/release-phase.md" %}
[release-phase.md](../../smart-escrow-design/escrow-lifecycle/release-phase.md)
{% endcontent-ref %}

{% content-ref url="../escrows/distribute-escrow-funds.md" %}
[distribute-escrow-funds.md](../escrows/distribute-escrow-funds.md)
{% endcontent-ref %}



{% hint style="warning" %}
**Case #2:** If the approver or service provider started the dispute, you'll be able to resolve the dispute.
{% endhint %}

8. Resolve Dispute

When the escrow is in dispute, you can resolve it with this endpoint. Only the **dispute resolver** can do it.

> **Payload Type:**

```typescript
export type ResolveDisputePayload = Pick<Escrow, "contractId"> &
  Partial<Pick<Escrow, "disputeResolver">> & {
    approverFunds: string;
    serviceProviderFunds: string;
  };
```



> **Execute Endpoint:**

<pre class="language-tsx"><code class="lang-tsx"><strong>export const resolveDispute = async (
</strong>  payload: ResolveDisputePayload,
) => {
  try {
  
    // Get the address
    const { address } = await kit.getAddress();
  
    // Execute the endpoint
    const response = await http.post(
      "/escrow/resolving-disputes",
      payload,
    );

    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
   // catch code...
  }
};
</code></pre>



> **References:**

{% content-ref url="../../smart-escrow-design/escrow-lifecycle/dispute-resolution.md" %}
[dispute-resolution.md](../../smart-escrow-design/escrow-lifecycle/dispute-resolution.md)
{% endcontent-ref %}

{% content-ref url="../escrows/resolving-disputes.md" %}
[resolving-disputes.md](../escrows/resolving-disputes.md)
{% endcontent-ref %}



{% hint style="info" %}
**IMPORTANT NOTE**
{% endhint %}

**All endpoints related to escrow management return the&#x20;**_**transaction unsigned**_. This is done by means of a string returned in XDR (External Data Representation) format, which is a format that stellar uses to encode transactions. This string is what you should use to sign the transaction with the wallet of your choice. After being signed it will return the transaction signed in the same way by means of a string in XDR format.&#x20;

* This string is the one that must be sent to the next endpoint for the transaction to be sent to the Stellar network:&#x20;

{% embed url="https://dev.api.trustlesswork.com/helper/send-transaction" %}

That's all, thanks.
