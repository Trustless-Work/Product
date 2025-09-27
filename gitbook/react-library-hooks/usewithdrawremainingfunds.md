---
description: >-
  In a multi-release escrow, when some funds are locked, you can use this hook
  to release the remaining funds
icon: wallet
---

# useWithdrawRemainingFunds

## Usage

This custom hook exposes a function to do the withdraw remaining funds in an escrow.

<pre class="language-typescript" data-overflow="wrap"><code class="lang-typescript">import { useResolveDispute } from "@trustless-work/escrow/hooks";
import { WithdrawRemainingFundsPayload } from "@trustless-work/escrow/types";

/*
 *  useWithdrawRemainingFunds
*/
const { withdrawRemainingFunds} = useWithdrawRemainingFunds();

/* 
 * It returns an unsigned transaction
<strong> * payload should be of type `WithdrawRemainingFundsPayload`
</strong>*/
const { unsignedTransaction } = await withdrawRemainingFunds(payload);

</code></pre>

### Mutation Function

`withdrawRemainingFunds`

Responsible for building and returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.

**WithdrawRemainingFundsPayload:** An object with fields necessary to release the locked funds

**Parameters**:

Only allows multi-release escrows..

* **payload**: An object containing the required fields to resolve a dispute.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useWithdrawRemainingFundsForm.ts" overflow="wrap" %}
```typescript
import {
  useWithdrawRemainingFunds,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  WithdrawRemainingFundsPayload
} from "@trustless-work/escrow/types";

export const useStartDisputeForm = () => {

 /*
  *  useWithdrawRemainingFunds
 */
 const { withdrawRemainingFunds } = useWithdrawRemainingFunds();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: WithdrawRemainingFundsPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the withdrawRemainingFunds function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await withdrawRemainingFunds (
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from withdrawRemainingFunds."
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
         toast.success("Withdrawal successful");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

