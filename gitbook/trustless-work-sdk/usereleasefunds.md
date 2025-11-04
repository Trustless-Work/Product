---
description: You release the escrow funds to the service provider through the approver.
icon: square-dollar
---

# useReleaseFunds

## Usage

This custom hook exposes a function to release the funds of an escrow.

{% code overflow="wrap" %}
```typescript
import { useReleaseFunds } from "@trustless-work/escrow/hooks";
import { SingleReleaseReleaseFundsPayload, MultiReleaseReleaseFundsPayload } from "@trustless-work/escrow/types";

/*
 *  useReleaseFunds
*/
const { releaseFunds } = useReleaseFunds();

/* 
 * It returns an unsigned transaction
 * payload should be of type `MultiReleaseReleaseFundsPayload` or `SingleReleaseReleaseFundsPayload`
*/
const { unsignedTransaction } = await releaseFunds(payload);

```
{% endcode %}

### Mutation Function

`releaseFunds`

Responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**SingleReleaseReleaseFundsPayload:** An object with fields necessary to release a **single-release** escrow.

**MultiReleaseReleaseFundsPayload:** An object with fields necessary to release a **multi-release** escrow by a specific milestone.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: An object containing the required fields to release an escrow or milestone.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
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
  SingleReleaseReleaseFundsPayload, MultiReleaseReleaseFundsPayload
} from "@trustless-work/escrow/types";

export const useReleaseFundsForm = () => {

 /*
  *  useReleaseFunds
 */
 const { releaseFunds } = useReleaseFunds();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: MultiReleaseReleaseFundsPayload | SingleReleaseReleaseFundsPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the releaseFunds function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await releaseFunds(
        payload,
        "multi-release"
        // or ...
        // "single-release"
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
      const data = await sendTransaction(signedXdr);

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

