---
description: Deploy the escrow contract and define the escrow properties.
icon: circle-plus
---

# useInitializeEscrow

## Usage

This custom hook exposes a function to deploy an escrow.

{% code overflow="wrap" %}
```typescript
import { useInitializeEscrow } from "@trustless-work/escrow/hooks";
import { InitializeSingleReleaseEscrowPayload, InitializeMultiReleaseEscrowPayload } from "@trustless-work/escrow/types";

/*
 *  useInitializeEscrow 
*/
const { deployEscrow } = useInitializeEscrow();

/* 
 * It returns an unsigned transaction
 * payload should be of type `InitializeMultiReleaseEscrowPayload` or `InitializeSingleReleaseEscrowPayload`
*/
const { unsignedTransaction } = await deployEscrow(payload);

```
{% endcode %}

### Function

`deployEscrow`\
Responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**InitializeSingleReleaseEscrowPayload:** An object with fields necessary to initialize a **single-release** escrow.

**InitializeMultiReleaseEscrowPayload:** An object with fields necessary to initialize a **multi-release** escrow.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: An object containing the required fields to initialize an escrow.

{% content-ref url="../developer-resources/types/payloads/deploy.md" %}
[deploy.md](../developer-resources/types/payloads/deploy.md)
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
  InitializeMultiReleaseEscrowPayload,
  InitializeSingleReleaseEscrowPayload
} from "@trustless-work/escrow/types";

export const useInitializeEscrowForm = () => {

 /*
  *  useInitializeEscrow
 */
 const { deployEscrow } = useInitializeEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: InitializeSingleReleaseEscrowPayload | InitializeMultiReleaseEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the deployEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await deployEscrow(
        payload,
        "multi-release"
        // or ...
        // "single-release"
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
      const data = await sendTransaction(signedXdr);

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

