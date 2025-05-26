---
description: >-
  Responsible for modifying the "status" property of a specific milestone in the
  escrow.
icon: octagon-check
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

# useChangeMilestoneStatus

## Usage

This custom hook exposes a mutation function to change a custom status the milestone.

{% code overflow="wrap" %}
```typescript
import { useChangeMilestoneStatus } from "@trustless-work/escrow/hooks";
import { ChangeMilestoneStatusPayload } from "@trustless-work/escrow/types";

/*
 *  useChangeMilestoneStatus 
*/
const { changeMilestoneStatus, isPending, isError, isSuccess } = useChangeMilestoneStatus();

/* 
 * It returns an unsigned transaction
 * payload should be of type `ChangeMilestoneStatusPayload`
*/
const { unsignedTransaction } = await changeMilestoneStatus(payload);

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

* `changeMilestoneStatus`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

_Argument:_

`ChangeMilestoneStatusPayload`: An object containing the required fields to change the status a milestone.

{% content-ref url="../types/" %}
[types](../types/)
{% endcontent-ref %}

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed by your wallet and broadcast.

***

## Usage Example

{% code title="src/hooks/useChangeMilestoneApprovedFlagForm.ts" overflow="wrap" %}
```typescript
import {
  useChangeMilestoneStatus,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  ChangeMilestoneStatusPayload
} from "@trustless-work/escrow/types";

export const useChangeMilestoneStatusForm = () => {

 /*
  *  useChangeMilestoneApprovedFlag
 */
 const { changeMilestoneApprovedFlag, isPending, isError, isSuccess } = useChangeMilestoneStatus();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: ChangeMilestoneStatusPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the useChangeMilestoneStatus function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await useChangeMilestoneStatus(
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from useChangeMilestoneStatusresponse."
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
       * - Milestone updated successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS") {
         toast.success(
          `Milestone index - ${payload.milestoneIndex} updated to ${payload.newStatus}`
        );
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

