---
description: >-
  Returns the escrows that you're looking for. It comes from our indexer
  (database) synchronizer with the blockchain.
icon: table
---

# useGetEscrowFromIndexerByContractIds

## Usage

This custom hook exposes a function to get the escrows that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetEscrowFromIndexerByContractIds } from "@trustless-work/escrow/hooks";
import { GetEscrowFromIndexerByContractIdsParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrowFromIndexerByContractIds
*/
const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

/* 
 * It returns the escrow that you are looking for
 * payload should be of type `GetEscrowFromIndexerByContractIdsParams`
*/
await getEscrowByContractIds(payload);
```
{% endcode %}

### Function

* `getEscrowByContractIds` \
  Responsible for building and returning data based on the provided payload.

_Argument:_

`GetEscrowFromIndexerByContractIdsParams`: An object containing the required fields to get the escrows.

{% content-ref url="../developer-resources/types/payloads/get-escrows-by-contract-id.md" %}
[get-escrows-by-contract-id.md](../developer-resources/types/payloads/get-escrows-by-contract-id.md)
{% endcontent-ref %}

_Return Value:_

`escrows`: The escrows that you are looking for.

***

## Usage ExampleForm

{% code title="src/hooks/useGetEscrowFromIndexerByContractIds.ts" overflow="wrap" %}
```typescript
import {
  useGetEscrowFromIndexerByContractIds,
} from "@trustless-work/escrow/hooks";
import {
  GetEscrowFromIndexerByContractIdsParams, 
} from "@trustless-work/escrow/types";

export const useGetEscrowFromIndexerByContractIdsForm = () => {

 /*
  *  useGetEscrowFromIndexerByContractIds
 */
 const { getEscrowByContractIds } = useGetEscrowFromIndexerByContractIds();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetEscrowFromIndexerByContractIdsParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrowByContractIds function
       * - The result will be escrows
      */
      const escrows = await getEscrowByContractIds(payload);
      
      if (!escrows) {
        throw new Error("Escrows not found");
      }

      /**
       * @Responses:
       * escrows !== null
       * - Escrows received successfully
       * - Show a success toast
       *
       * escrows === null
       * - Show an error toast
       */
      if (escrows) {
        toast.success("Escrows Received");
      }
    } catch (error: unknown) {
      // catch error logic
    }
  };
}

```
{% endcode %}

