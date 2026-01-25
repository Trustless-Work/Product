---
description: >-
  Returns the escrows that you're looking for. It comes from our indexer
  (database) synchronizer with the blockchain.
icon: rectangle-list
---

# useGetEscrowsFromIndexerBySigner

## Usage

This custom hook exposes a function to get the escrows that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetEscrowsFromIndexerBySigner } from "@trustless-work/escrow/hooks";
import { GetEscrowsFromIndexerBySignerParams} from "@trustless-work/escrow/types";

/*
 *  useGetEscrowsFromIndexerBySigner
*/
const { getEscrowsBySigner } = useGetEscrowsFromIndexerBySigner();

/* 
 * It returns the escrows that you are looking for
 * payload should be of type `GetEscrowsFromIndexerBySignerParams`
*/
await getEscrowsBySigner(payload);
```
{% endcode %}

### Function

* `getEscrowsBySigner`\
  Responsible for building and returning data based on the provided payload.

_Argument:_

`GetEscrowsFromIndexerBySignerParams`: An object containing the required fields to get the escrows by signer.

{% content-ref url="../../introduction/developer-resources/types/payloads/get-escrows-by-signer.md" %}
[get-escrows-by-signer.md](../../introduction/developer-resources/types/payloads/get-escrows-by-signer.md)
{% endcontent-ref %}

_Return Value:_

`escrows`: The escrows that you are looking for.

***

## Usage ExampleForm

{% code title="src/hooks/useGetEscrowsFromIndexerBySigner.ts" overflow="wrap" %}
```typescript
import {
  useGetEscrowsFromIndexerBySigner,
} from "@trustless-work/escrow/hooks";
import {
  GetEscrowsFromIndexerBySignerParams, 
} from "@trustless-work/escrow/types";

export const useGetEscrowsFromIndexerBySignerForm = () => {

 /*
  *  useGetEscrowsFromIndexerBySigner
 */
 const { getEscrowsBySigner } = useGetEscrowsFromIndexerBySigner();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetEscrowsFromIndexerBySignerParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrowsBySigner function
       * - The result will be an escrow
      */
      const escrows = await getEscrowsBySigner(payload);
      
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

