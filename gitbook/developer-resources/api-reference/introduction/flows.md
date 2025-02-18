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

**Each escrow must be funded before the release funds or resolve dispute. It's important to clarify that you can fund the escrow in any moment, but just for this case, we'll fund it in the beginning.**

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



{% hint style="info" %}
**IMPORTANT NOTE**
{% endhint %}

**All endpoints related to escrow management return the&#x20;**_**transaction unsigned**_. This is done by means of a string returned in XDR (External Data Representation) format, which is a format that stellar uses to encode transactions. This string is what you should use to sign the transaction with the wallet of your choice. After being signed it will return the transaction signed in the same way by means of a string in XDR format.&#x20;

* This string is the one that must be sent to the next endpoint for the transaction to be sent to the Stellar network:&#x20;

{% embed url="https://dev.api.trustlesswork.com/helper/send-transaction" %}

That's all, thanks.
