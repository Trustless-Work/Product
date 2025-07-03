---
description: >-
  Responsible for modifying the "flag" property of a specific milestone in the
  escrow to approve that milestone.
icon: thumbs-up
---

# useApproveMilestone

## Usage

This custom hook exposes a function along with status flags to manage the approval of a milestone.

{% code overflow="wrap" %}
```typescript
import { useApproveMilestone } from "@trustless-work/escrow/hooks";
import { ApproveMilestonePayload } from "@trustless-work/escrow/types";

/*
 *  useApproveMilestone
*/
const { approveMilestone, isPending, isError, isSuccess } = useApproveMilestone();

/* 
 * It returns an unsigned transaction
 * payload should be of type `ApproveMilestonePayload`
*/
const { unsignedTransaction } = await approveMilestone(payload);

```
{% endcode %}

### Mutation Function

`approveMilestone`

Returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**ApproveMilestonePayload**: An object with fields necessary to approve a milestone. It is applicable for both single-release and multi-release escrow types.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: Contains the data required for milestone approval.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useApproveMilestoneForm.ts" overflow="wrap" %}
```typescript
import {
  useApproveMilestone,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  ApproveMilestonePayload
} from "@trustless-work/escrow/types";

export const useApproveMilestoneForm = () => {

 /*
  *  useApproveMilestone
 */
 const { approveMilestone } = useApproveMilestone();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: ApproveMilestonePayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the approveMilestone function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await approveMilestone({
        payload,
        type: "multi-release"
        // or ...
        type: "single-release"
      });

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from approveMilestone response."
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
       * - Milestones approved successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
        toast.success(
          `Milestone index - ${payload.milestoneIndex} has been approved`
        );
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

