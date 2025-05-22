---
description: Returns all the information of an escrow requested through the contractId.
icon: dollar-sign
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

# useGetMultipleEscrowBalances

## Usage

This custom hook exposes a mutation function to get the balances that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetMultipleEscrowBalances } from "@trustless-work/escrow/hooks";
import { GetBalanceParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrow
*/
const { getMultipleBalances, balances, isPending, isError, isSuccess } = useGetMultipleEscrowBalances();

/* 
 * It returns the balances of the escrows
 * payload should be of type `GetBalanceParams`
*/
await getMultipleBalances(payload);
```
{% endcode %}

### Description of Return Values

* **`balances`**\
  The balances you are looking to obtain.
* **`isPending`**\
  A boolean status flag indicating whether the mutation is currently in progress. Useful for showing loaders or disabling UI elements during the process.
* **`isError`**\
  A boolean status flag that becomes `true` if the mutation fails.
* **`isSuccess`**\
  A boolean status flag that becomes `true` once the mutation completes successfully.

### Mutation Function

* `getMultipleBalances`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning data based on the provided payload.

_Argument:_

`GetBalanceParams` : An object containing the required fields to send a transaction to the network.

{% content-ref url="../quickstart/integration-demo-project/entities.md" %}
[entities.md](../quickstart/integration-demo-project/entities.md)
{% endcontent-ref %}

_Return Value:_

`balances`: The balances that you are looking for.

***

## Usage ExampleForm

{% code title="src/hooks/useGetMultipleEscrowBalances.ts" overflow="wrap" %}
```typescript
import {
  useGetMultipleEscrowBalances,
} from "@trustless-work/escrow/hooks";
import {
  GetBalanceParams, 
} from "@trustless-work/escrow/types";

export const useGetMultipleEscrowBalancesForm = () => {

 /*
  *  useGetMultipleEscrowBalances
 */
 const { getMultipleBalances, balances, isPending, isError, isSuccess } = useGetMultipleEscrowBalances();
 
 /*
  *  useSendTransaction
 */
 const { sendTransaction, isPending, isError, isSuccess } = useSendTransaction();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetBalanceParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getMultipleBalances function
       * - The result will be balances
      */
      await getMultipleBalances(payload);
      
      if (!balances) {
        throw new Error("Balances not found");
      }

      /**
       * @Responses:
       * balances !== null
       * - Balances received successfully
       * - Show a success toast
       *
       * balances === null
       * - Show an error toast
       */
      if (balances) {
        toast.success("Balances Received");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

