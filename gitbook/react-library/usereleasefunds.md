---
description: You release the escrow funds to the service provider through the approver.
icon: square-dollar
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

# useReleaseFunds

## Usage

This custom hook exposes a mutation function to release the funds of an escrow.

{% code overflow="wrap" %}
```typescript
import { useReleaseFunds } from "@trustless-work/escrow/hooks";
import { ReleaseFundsPayload } from "@trustless-work/escrow/types";

/*
 *  useReleaseFunds
*/
const { releaseFunds, isPending, isError, isSuccess } = useReleaseFunds();

/* 
 * It returns an unsigned transaction
 * payload should be of type `ReleaseFundsPayload`
*/
const { unsignedTransaction } = await releaseFunds(payload);

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

* `releaseFunds`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

_Argument:_

`ReleaseFundsPayload`: An object containing the required fields to release the funds.

{% content-ref url="../api-reference/types/" %}
[types](../api-reference/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useReleaseFundsForm.ts" overflow="wrap" %}
```typescript
import {
  useReleaseFunds,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  ReleaseFundsPayload
} from "@trustless-work/escrow/types";

export const useReleaseFundsForm = () => {

 /*
  *  useReleaseFunds
 */
 const { releaseFunds, isPending, isError, isSuccess } = useReleaseFunds();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: ReleaseFundsPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the releaseFunds function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await releaseFunds(
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from useReleaseFunds."
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
      const data = await sendTransaction({
        signedXdr,
        returnEscrowDataIsRequired: false,
      });

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow released successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
         toast.success("The escrow has been released");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

