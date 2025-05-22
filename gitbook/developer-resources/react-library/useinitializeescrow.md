---
description: Deploy the escrow contract and define the escrow properties.
icon: circle-plus
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

# useInitializeEscrow

## Usage

This custom hook exposes a mutation function to deploy an escrow.

{% code overflow="wrap" %}
```typescript
import { useInitializeEscrow } from "@trustless-work/escrow/hooks";
import { InitializeEscrowPayload } from "@trustless-work/escrow/types";

/*
 *  useInitializeEscrow 
*/
const { deployEscrow, isPending, isError, isSuccess } = useInitializeEscrow();

/* 
 * It returns an unsigned transaction
 * payload should be of type `InitializeEscrowPayload`
*/
const { unsignedTransaction } = await deployEscrow(payload);

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

* `deployEscrow`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

_Argument:_

`InitializeEscrowPayload`: An object containing the required fields to initialize an escrow.

{% content-ref url="../quickstart/integration-demo-project/entities.md" %}
[entities.md](../quickstart/integration-demo-project/entities.md)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

<pre class="language-typescript" data-title="src/hooks/useInitializeEscrowForm.ts" data-overflow="wrap"><code class="lang-typescript"><strong>import {
</strong>  useInitializeEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  InitializeEscrowPayload
} from "@trustless-work/escrow/types";

export const useInitializeEscrowForm = () => {

 /*
  *  useInitializeEscrow
 */
 const { deployEscrow, isPending, isError, isSuccess } = useInitializeEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: InitializeEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the deployEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await deployEscrow(
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from deployEscrow response."
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
        returnEscrowDataIsRequired: true, // make sure that in initialize this property is true
      });

      /**
       * @Responses:
       * data.status === "SUCCESS"
       * - Escrow initialized successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        toast.success("Escrow Created");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

</code></pre>

