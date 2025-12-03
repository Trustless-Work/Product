---
description: >-
  Responsible for modifying the "status" property of a specific milestone in the
  escrow.
icon: octagon-check
---

# useChangeMilestoneStatus

## Usage

This custom hook exposes a function to change a custom status the milestone.

{% code overflow="wrap" %}
```typescript
import { useChangeMilestoneStatus } from "@trustless-work/escrow/hooks";
import { ChangeMilestoneStatusPayload } from "@trustless-work/escrow/types";

/*
 *  useChangeMilestoneStatus 
*/
const { changeMilestoneStatus } = useChangeMilestoneStatus();

/* 
 * It returns an unsigned transaction
 * payload should be of type `ChangeMilestoneStatusPayload`
*/
const { unsignedTransaction } = await changeMilestoneStatus(payload);

```
{% endcode %}

### Mutation Function

`changeMilestoneStatus`

Returning an unsigned transaction based on the provided payload.

**EscrowType**: Specifies the type of escrow. It accepts the following values:

* **multi-release**: Allows for multiple releases of funds.
* **single-release**: Funds are released in a single transaction.

**ChangeMilestoneStatusPayload:** An object with fields necessary to change the milestone status. It is applicable for both single-release and multi-release escrow types.

**Parameters**:

Ensure they match: if you choose a "multi-release" type, you must also use a "multi-release" payload.

* **type**: Describes the escrow type to be used. Options are "multi-release" or "single-release".
* **payload**: Contains the data required for change milestone status.

{% content-ref url="../developer-resources/types/payloads/change-milestone-status.md" %}
[change-milestone-status.md](../developer-resources/types/payloads/change-milestone-status.md)
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
 const { changeMilestoneApprovedFlag } = useChangeMilestoneStatus();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction } = useSendTransaction();

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
        payload,
        "multi-release"
        // or ...
        // "single-release"
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
      const data = await sendTransaction(signedXdr);

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

