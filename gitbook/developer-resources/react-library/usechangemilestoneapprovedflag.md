---
description: >-
  Responsible for modifying the "flag" property of a specific milestone in the
  escrow to approve that milestone.
icon: thumbs-up
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

# useChangeMilestoneApprovedFlag

## Usage

This custom hook exposes a mutation function along with status flags to manage the approval of a milestone.

{% code overflow="wrap" %}
```typescript
import { useChangeMilestoneApprovedFlag } from "@trustless-work/escrow/hooks";
import { ChangeMilestoneApprovedFlagPayload } from "@trustless-work/escrow/types";

/*
 *  useChangeMilestoneApprovedFlag
*/
const { changeMilestoneApprovedFlag, isPending, isError, isSuccess } = useChangeMilestoneApprovedFlag();

/* 
 * It returns an unsigned transaction
 * payload should be of type `ChangeMilestoneApprovedFlagPayload`
*/
const { unsignedTransaction } = await changeMilestoneApprovedFlag(payload);

```
{% endcode %}

### Hook Return Values

```typescript
const {
  changeMilestoneApprovedFlag,
  isPending,
  isError,
  isSuccess
} = useChangeMilestoneApprovedFlag();

```

### changeMilestoneApprovedFlag Structure

```typescript
(payload: ChangeMilestoneApprovedFlagPayload) => UnsignedTransaction
```

### Description of Return Values

* **`isPending`**\
  A boolean status flag indicating whether the mutation is currently in progress. Useful for showing loaders or disabling UI elements during the process.
* **`isError`**\
  A boolean status flag that becomes `true` if the mutation fails.
* **`isSuccess`**\
  A boolean status flag that becomes `true` once the mutation completes successfully.
* **`changeMilestoneApprovedFlag`**\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning an unsigned transaction based on the provided payload.

_Argument:_

`ChangeMilestoneApprovedFlagPayload`: An object containing the required fields to approve a milestone.

_Return Value:_

`unsignedTransaction`: An object representing the constructed transaction, ready to be signed and broadcast.

***

## Usage Example

{% code title="src/hooks/useChangeMilestoneApprovedFlagForm.ts" overflow="wrap" %}
```typescript
import {
  useChangeMilestoneApprovedFlag,
  useSendTransaction,
} from "@trustless-work/escrow/hooks";
import {
  ChangeMilestoneApprovedFlagPayload
} from "@trustless-work/escrow/types";

export const useChangeMilestoneApprovedFlagForm = () => {

 /*
  *  useChangeMilestoneApprovedFlag
 */
 const { changeMilestoneApprovedFlag, isPending, isError, isSuccess } = useChangeMilestoneApprovedFlag();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: ChangeMilestoneApprovedFlagPayload) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the changeMilestoneApprovedFlag function
       * - The result will be an unsigned transaction
       */
      const { unsignedTransaction } = await changeMilestoneApprovedFlag(
        payload
      );

      if (!unsignedTransaction) {
        throw new Error(
          "Unsigned transaction is missing from changeMilestoneApprovedFlag response."
        );
      }

      /**
       * @Note:
       * - We need to sign the transaction using your [private key] such as wallet
       * - The result will be a signed transaction
       */
      const signedXdr = await signTransaction({
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
       * - Escrow updated successfully
       * - Show a success toast
       *
       * data.status == "ERROR"
       * - Show an error toast
       */
      if (data.status === "SUCCESS" && escrow) {
        toast.success(
          `Milestone index - ${payload.milestoneIndex} has been approved`
        );
      }
    } catch (error: unknown) {
      const mappedError = handleError(error as AxiosError | WalletError);
      console.error("Error:", mappedError.message);

      toast.error(
        mappedError ? mappedError.message : "An unknown error occurred"
      );
    }
  };
}

```
{% endcode %}

