---
description: >-
  Resolves escrow disputes by distributing funds to the approver and service
  provider as determined by the dispute resolver.
icon: handshake-simple
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

# useResolveDispute

## Usage

This custom hook exposes a mutation function to resolve a dispute in an escrow.

<pre class="language-typescript" data-overflow="wrap"><code class="lang-typescript">import { useResolveDispute } from "@trustless-work/escrow/hooks";
import { MultiReleaseResolveDisputePayload, SingleReleaseResolveDisputePayload } from "@trustless-work/escrow/types";

/*
 *  useResolveDispute
*/
const { resolveDispute, isPending, isError, isSuccess } = useResolveDispute();

/* 
 * It returns an unsigned transaction
<strong> * payload should be of type `MultiReleaseResolveDisputePayload` or `SingleReleaseResolveDisputePayload`
</strong>*/
const { unsignedTransaction } = await resolveDispute(payload);

</code></pre>

### Description of Return Values

* **`isPending`**\
  A boolean status flag indicating whether the mutation is currently in progress. Useful for showing loaders or disabling UI elements during the process.
* **`isError`**\
  A boolean status flag that becomes `true` if the mutation fails.
* **`isSuccess`**\
  A boolean status flag that becomes `true` once the mutation completes successfully.

### Mutation Function

`resolveDispute`

This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**SingleReleaseResolveDisputePayload:** An object with fields necessary to resolve a **single-release** escrow.

**MultiReleaseResolveDisputePayload:** An object with fields necessary to resolve a **multi-release** escrow by milestone.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: An object containing the required fields to resolve a dispute.

{% content-ref url="../api-reference/types/" %}
[types](../api-reference/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useResolveDisputeForm.ts" overflow="wrap" %}
```typescript
import {
  useResolveDispute,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  MultiReleaseResolveDisputePayload, SingleReleaseResolveDisputePayload
} from "@trustless-work/escrow/types";

export const useStartDisputeForm = () => {

 /*
  *  useResolveDispute
 */
 const { resolveDispute, isPending, isError, isSuccess } = useResolveDispute();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: MultiReleaseResolveDisputePayload | SingleReleaseResolveDisputePayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the resolveDispute function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await resolveDispute({
        payload,
        type: "multi-release"
        // or ...
        type: "single-release"
      });

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from resolveDispute."
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
       * - Dispute resolved successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
         toast.success("Dispute Resolved");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

