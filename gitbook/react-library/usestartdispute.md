---
description: >-
  Responsible for setting the escrow in dispute state. Changes the value of the
  escrow's "disputed" flag property to true.
icon: face-angry
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

# useStartDispute

## Usage

This custom hook exposes a mutation function to start a dispute in an escrow.

{% code overflow="wrap" %}
```typescript
import { useStartDispute } from "@trustless-work/escrow/hooks";
import { SingleReleaseStartDisputePayload, MultiReleaseStartDisputePayload } from "@trustless-work/escrow/types";

/*
 *  useStartDispute
*/
const { startDispute, isPending, isError, isSuccess } = useStartDispute();

/* 
 * It returns an unsigned transaction
 * payload should be of type `MultiReleaseStartDisputePayload` or `SingleReleaseStartDisputePayload`
*/
const { unsignedTransaction } = await startDispute(payload);

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

`startDispute`

This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**SingleReleaseStartDisputePayload:** An object with fields necessary to dispute a **single-release** escrow.

**MultiReleaseStartDisputePayload:** An object with fields necessary to dispute a **multi-release** escrow by milestone.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: An object containing the required fields to initialize an escrow.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useStartDisputeForm.ts" overflow="wrap" %}
```typescript
import {
  useStartDispute,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  SingleReleaseStartDisputePayload, MultiReleaseStartDisputePayload
} from "@trustless-work/escrow/types";

export const useStartDisputeForm = () => {

 /*
  *  useStartDispute
 */
 const { startDispute, isPending, isError, isSuccess } = useStartDispute();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: SingleReleaseStartDisputePayload | MultiReleaseStartDisputePayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the startDispute function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await startDispute({
        payload,
        type: "multi-release"
        // or ...
        type: "single-release"
      });

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from startDispute."
        );
      }

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

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Dispute started successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
         toast.success("Dispute Started");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

