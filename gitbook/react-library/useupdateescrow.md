---
description: >-
  This endpoint allows you to change the properties of an escrow as long as a
  series of requirements are met, which will be mentioned in this section.
icon: pencil
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

# useUpdateEscrow

## Usage

This custom hook exposes a mutation function to update an escrow.

{% code overflow="wrap" %}
```typescript
import { useUpdateEscrow} from "@trustless-work/escrow/hooks";
import { UpdateEscrowPayload} from "@trustless-work/escrow/types";

/*
 *  useInitializeEscrow 
*/
const { updateEscrow, isPending, isError, isSuccess } = useUpdateEscrow();

/* 
 * It returns an unsigned transaction
 * payload should be of type `UpdateEscrowPayload`
*/
const { unsignedTransaction } = await updateEscrow(payload);

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

* `updateEscrow`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

_Argument:_

`UpdateEscrowPayload`: An object containing the required fields to update an escrow.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

<pre class="language-typescript" data-title="src/hooks/useUpdateEscrowForm.ts" data-overflow="wrap"><code class="lang-typescript"><strong>import {
</strong>  useUpdateEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  UpdateEscrowPayload
} from "@trustless-work/escrow/types";

export const useUpdateEscrowForm = () => {

 /*
  *  useUpdateEscrow
 */
 const { updateEscrow, isPending, isError, isSuccess } = useUpdateEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: UpdateEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the updateEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await updateEscrow(
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from updateEscrow response."
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
        returnEscrowDataIsRequired: true, // make sure that in update this property is true
      });

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow updated successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        toast.success("Escrow Updated");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

</code></pre>

