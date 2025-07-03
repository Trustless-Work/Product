---
description: Returns all
icon: dollar-sign
---

# useGetEscrowsFromIndexerByContractId

## Usage

This custom hook exposes a function to get the balances that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetMultipleEscrowBalances } from "@trustless-work/escrow/hooks";
import { GetBalanceParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrow
*/
const { getMultipleBalances } = useGetMultipleEscrowBalances();

/* 
 * It returns the balances of the escrows
 * payload should be of type `GetBalanceParams`
*/
await getMultipleBalances(payload);
```
{% endcode %}

### Function

* `getMultipleBalances`\
  Responsible for building and returning data based on the provided payload.

_Argument:_

`GetBalanceParams` : An object containing the required fields to get the balances.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
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
 const { getMultipleBalances } = useGetMultipleEscrowBalances();

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
      const { balances } = await getMultipleBalances(payload);
      
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

