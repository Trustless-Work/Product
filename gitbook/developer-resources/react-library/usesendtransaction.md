---
description: >-
  Most Trustless Work endpoints return an unsigned transaction in XDR format.
  This endpoint is used to sign such unsigned transactions and send them to the
  Stellar network.
icon: comment-arrow-up-right
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# useSendTransaction

{% hint style="info" %}
This endpoint must be used for all the endpoints after we execute it. Except getEscrow and getEscrowBalances.
{% endhint %}

## Usage

This custom hook exposes a mutation function to send a signed transaction to the network.&#x20;

{% code overflow="wrap" %}
```typescript
import { useSendTransaction} from "@trustless-work/escrow/hooks";
import { SendTransactionPayload } from "@trustless-work/escrow/types";

/*
 *  useSendTransaction
*/
const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/* 
 * It returns a SendTransactionResponse
 * payload should be of type `SendTransactionPayload`
*/
const data = await sendTransaction({
  signedXdr,
  returnEscrowDataIsRequired: false, // Should be true only for these endpoints: Initialize Escrow and Update Escrow
});

```
{% endcode %}

### Description of Return Values

* **`isPending`**\
  A boolean status flag indicating whether the mutation is currently in progress. Useful for showing loaders or disabling UI elements during the process.
* **`isError`**\
  A boolean status flag that becomes `true` if the mutation fails.
* **`isSuccess`**\
  A boolean status flag that becomes `true` once the mutation completes successfully.

### Mutation Function

* `sendTransaction`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning data based on the provided payload.

_Argument:_

`SendTransactionPayload`: An object containing the required fields to send a transaction to the network.

{% content-ref url="../quickstart/integration-demo-project/entities.md" %}
[entities.md](../quickstart/integration-demo-project/entities.md)
{% endcontent-ref %}

_Return Value:_

**For:** Fund Escrow, Resolve Dispute, Change Milestone Status, Change Milestone Approved Flag, Start Dispute, Release Funds:

* This object will be a type of _sendTransactionResponse_.&#x20;

**For:** Initialize Escrow:

* This object will be a type of _sendTransactionResponse_. But you can set it as _InitializeEscrowResponse_.

**For:** Update Escrow:

* This object will be a type of _sendTransactionResponse_. But you can set it as _UpdateEscrowResponse_.

***

## Usage Example

{% code title="src/hooks/useSendTransactionForm.ts" overflow="wrap" %}
```typescript
import {
  useFundEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  useSomeEndpointPayload
} from "@trustless-work/escrow/types";

export const useSomeEndpointForm= () => {

 /*
  *  useSomeEndpoint
 */
 const { someFunction, isPending, isError, isSuccess } = useSomeEndpoint();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: useSomeEndpointPayload) => {

    try {
      // get unsignedTransaction from some endpoint ...

      /**
       * @Note:
       * - We need to sign the transaction using your [private key] such as wallet
       * - The result will be a signed transaction
       */
      const signedXdr = await signTransaction({ /* This method should be provided by the wallet */
        unsignedTransaction,
        address: walletAddress || "",
      });

      if (!signedXdr) {
        throw new Error("Signed transaction is missing.");
      }

      /**
       * @Note:
       * - We need to send the signed transaction to the API
       * - The data will be an SendTransactionResponse
       */
      const data = await sendTransaction({
        signedXdr,
        returnEscrowDataIsRequired: false, // Should be true only for these endpoints: Initialize Escrow and Update Escrow
      });

    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

