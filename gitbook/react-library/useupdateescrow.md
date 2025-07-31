---
description: >-
  This endpoint allows you to change the properties of an escrow as long as a
  series of requirements are met, which will be mentioned in this section.
icon: pencil
---

# useUpdateEscrow

## Usage

This custom hook exposes a function to update an escrow.

{% code overflow="wrap" %}
```typescript
import { useUpdateEscrow} from "@trustless-work/escrow/hooks";
import { UpdateSingleReleaseEscrowPayload, UpdateMultiReleaseEscrowPayload } from "@trustless-work/escrow/types";

/*
 *  useUpdateEscrow
*/
const { updateEscrow } = useUpdateEscrow();

/* 
 * It returns an unsigned transaction
 * payload should be of type `UpdateSingleReleaseEscrowPayload` or `UpdateMultiReleaseEscrowPayload`
*/
const { unsignedTransaction } = await updateEscrow(payload);

```
{% endcode %}

### Function

`updateEscrow`

Responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**UpdateSingleReleaseEscrowPayload:** An object with fields necessary to update a **single-release** escrow.

**UpdateMultiReleaseEscrowPayload:** An object with fields necessary to update a **multi-release** escrow.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: An object containing the required fields to update an escrow.

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
  UpdateSingleReleaseEscrowPayload, UpdateMultiReleaseEscrowPayload
} from "@trustless-work/escrow/types";

export const useUpdateEscrowForm = () => {

 /*
  *  useUpdateEscrow
 */
 const { updateEscrow } = useUpdateEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: UpdateSingleReleaseEscrowPayload | UpdateMultiReleaseEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the updateEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await updateEscrow(
        payload,
        "multi-release"
        // or ...
        // "single-release"
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
      const data = await sendTransaction(signedXdr);

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

