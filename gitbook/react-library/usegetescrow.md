---
description: Returns all the information of an escrow requested through the contractId.
icon: square-list
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

# useGetEscrow

## Usage

This custom hook exposes a mutation function to get the escrow that you are looking obtain.&#x20;

{% code overflow="wrap" %}
```typescript
import { useGetEscrow } from "@trustless-work/escrow/hooks";
import { GetEscrowParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrow
*/
const { getEscrow, escrow, isPending, isError, isSuccess } = useGetEscrow();

/* 
 * It returns an Escrow
 * payload should be of type `GetEscrowParams`
*/
await getEscrow(payload);
```
{% endcode %}

### Description of Return Values

* **`escrow`**\
  The escrow you are looking to obtain.
* **`isPending`**\
  A boolean status flag indicating whether the mutation is currently in progress. Useful for showing loaders or disabling UI elements during the process.
* **`isError`**\
  A boolean status flag that becomes `true` if the mutation fails.
* **`isSuccess`**\
  A boolean status flag that becomes `true` once the mutation completes successfully.

### Mutation Function

* `getEscrow`\
  This is the main mutation function. Internally, it wraps `mutate` or `mutateAsync` and is responsible for building and returning data based on the provided payload.

_Argument:_

`GetEscrowParams`: An object containing the required fields to get the escrow.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`escrow`: The escrow that you are looking for.

***

## Usage Example

{% code title="src/hooks/useGetEscrowForm.ts" overflow="wrap" %}
```typescript
import {
  useGetEscrow,
} from "@trustless-work/escrow/hooks";
import {
  GetEscrowParams, 
  Escrow
} from "@trustless-work/escrow/types";

export const useGetEscrowForm = () => {

 /*
  *  useGetEscrow
 */
 const { getEscrow, escrow, isPending, isError, isSuccess } = useGetEscrow();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetEscrowParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrow function
       * - The result will be an Escrow
      */
      await getEscrow(payload);
      
      if (!escrow) {
        throw new Error("Escrow not found");
      }

      /**
       * @Responses:
       * escrow !== null
       * - Escrow received successfully
       * - Save the escrow
       * - Show a success toast
       *
       * escrow === null
       * - Show an error toast
       */
      if (escrow: Escrow) {
        toast.success("Escrow Received");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

