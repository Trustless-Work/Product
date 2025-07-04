---
description: >-
  Returns the escrow that you're looking for. It comes from our indexer
  (database) synchronizer with the blockchain.
icon: table
---

# useGetEscrowFromIndexerByContractId

## Usage

This custom hook exposes a function to get the escrow that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetEscrowFromIndexerByContractId } from "@trustless-work/escrow/hooks";
import { GetEscrowFromIndexerByContractIdParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrowFromIndexerByContractId
*/
const { getEscrowByContractId } = useGetEscrowFromIndexerByContractId();

/* 
 * It returns the escrow that you are looking for
 * payload should be of type `GetEscrowFromIndexerByContractIdParams`
*/
await getEscrowByContractId(payload);
```
{% endcode %}

### Function

* `getEscrowByContractId` \
  Responsible for building and returning data based on the provided payload.

_Argument:_

`GetEscrowFromIndexerByContractIdParams`: An object containing the required fields to get the escrow.

{% content-ref url="../developer-resources/types/" %}
[types](../developer-resources/types/)
{% endcontent-ref %}

_Return Value:_

`escrow`: The escrow that you are looking for.

***

## Usage ExampleForm

{% code title="src/hooks/useGetEscrowFromIndexerByContractId.ts" overflow="wrap" %}
```typescript
import {
  useGetEscrowFromIndexerByContractId,
} from "@trustless-work/escrow/hooks";
import {
  GetEscrowFromIndexerByContractIdParams, 
} from "@trustless-work/escrow/types";

export const useGetEscrowFromIndexerByContractIdForm = () => {

 /*
  *  useGetEscrowFromIndexerByContractId
 */
 const { getEscrowByContractId } = useGetEscrowFromIndexerByContractId();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetEscrowFromIndexerByContractIdParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrowByContractId function
       * - The result will be an escrow
      */
      const escrow = await getEscrowByContractId(payload);
      
      if (!escrow) {
        throw new Error("Escrow not found");
      }

      /**
       * @Responses:
       * escrow !== null
       * - Escrow received successfully
       * - Show a success toast
       *
       * escrow === null
       * - Show an error toast
       */
      if (escrow) {
        toast.success("Escrow Received");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

