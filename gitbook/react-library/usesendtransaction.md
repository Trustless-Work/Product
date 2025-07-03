---
description: >-
  Most Trustless Work endpoints return an unsigned transaction in XDR format.
  This endpoint is used to sign such unsigned transactions and send them to the
  Stellar network.
icon: comment-arrow-up-right
---

# useSendTransaction

{% hint style="info" %}
This endpoint must be used for all the endpoints after we execute it. Except getEscrowBalances, getEscrowsByContractId, getEscrowsByRole and getEscrowsBySigner .
{% endhint %}

## Usage

This custom hook exposes a function to send a signed transaction to the network.&#x20;

{% code overflow="wrap" %}
```typescript
import { useSendTransaction} from "@trustless-work/escrow/hooks";

/*
 *  useSendTransaction
*/
const { sendTransaction } = useSendTransaction();

/* 
 * It returns a SendTransactionResponse
 * payload should be of type string
*/
const data = await sendTransaction(signedXdr);

```
{% endcode %}

### Function

* `sendTransaction`\
  Responsible for building and returning data based on the provided payload.

_Argument:_

`payload`: An string containing the required fields to send a transaction to the network.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
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
 const { someFunction } = useSomeEndpoint();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

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
      const data = await sendTransaction(signedXdr);

    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

