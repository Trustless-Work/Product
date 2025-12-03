---
description: >-
  Allows users to deposit funds into an existing escrow contract, securing them
  until the agreed conditions are met.
icon: sack-dollar
---

# useFundEscrow

## Usage

This custom hook exposes a function to fund and escrow.

{% code overflow="wrap" %}
```typescript
import { useFundEscrow } from "@trustless-work/escrow/hooks";
import { FundEscrowPayload } from "@trustless-work/escrow/types";

/*
 *  useFundEscrow
*/
const { fundEscrow } = useFundEscrow();

/* 
 * It returns an unsigned transaction
 * payload should be of type `fundEscrow`
*/
const { unsignedTransaction } = await fundEscrow(payload);

```
{% endcode %}

### Mutation Function

**`fundEscrow`**

Returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**FundEscrowPayload:** An object with fields necessary to fund an escrow. It is applicable for both single-release and multi-release escrow types.

**Parameters**:

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: Contains the data required for fund escrow.

{% content-ref url="../developer-resources/types/payloads/release-funds.md" %}
[release-funds.md](../developer-resources/types/payloads/release-funds.md)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useFundEscrowForm.ts" overflow="wrap" %}
```typescript
import {
  useFundEscrow,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  FundEscrowPayload
} from "@trustless-work/escrow/types";

export const useFundEscrowForm = () => {

 /*
  *  useFundEscrow
 */
 const { fundEscrow } = useFundEscrow();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: FundEscrowPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the fundEscrow function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await fundEscrow(
        payload,
        "multi-release"
        // or ...
        // "single-release"
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from fundEscrow response."
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
       * - Escrow funded successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        toast.success("Escrow Funded");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

