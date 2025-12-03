---
description: >-
  Returns the escrows that you're looking for. It comes from our indexer
  (database) synchronizer with the blockchain.
icon: head-side-gear
---

# useGetEscrowsFromIndexerByRole

## Usage

This custom hook exposes a function to get the escrows that you are looking obtain.

{% code overflow="wrap" %}
```typescript
import { useGetEscrowsFromIndexerByRole } from "@trustless-work/escrow/hooks";
import { GetEscrowsFromIndexerByRoleParams } from "@trustless-work/escrow/types";

/*
 *  useGetEscrowsFromIndexerByRole 
*/
const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

/* 
 * It returns the escrows that you are looking for
 * payload should be of type `GetEscrowsFromIndexerByRoleParams`
*/
await getEscrowsByRole(payload);
```
{% endcode %}

### Function

* `getEscrowsByRole`\
  Responsible for building and returning data based on the provided payload.

_Argument:_

`GetEscrowsFromIndexerByRoleParams`: An object containing the required fields to get the escrows by role.

{% content-ref url="../developer-resources/types/payloads/get-escrows-by-role.md" %}
[get-escrows-by-role.md](../developer-resources/types/payloads/get-escrows-by-role.md)
{% endcontent-ref %}

_Return Value:_

`escrows`: The escrows that you are looking for.

***

## Usage ExampleForm

{% code title="src/hooks/useGetEscrowsFromIndexerByRole.ts" overflow="wrap" %}
```typescript
import {
  useGetEscrowsFromIndexerByRole,
} from "@trustless-work/escrow/hooks";
import {
  GetEscrowsFromIndexerByRoleParams, 
} from "@trustless-work/escrow/types";

export const useGetEscrowsFromIndexerByRoleForm = () => {

 /*
  *  useGetEscrowsFromIndexerByRole
 */
 const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

/*
 * onSubmit function, this could be called by form button
*/
 const onSubmit = async (payload: GetEscrowsFromIndexerByRoleParams) => {

    try {
      /**
       * API call by using the trustless work hooks
       * @Note:
       * - We need to pass the payload to the getEscrowsByRole function
       * - The result will be an escrow
      */
      const escrows = await getEscrowsByRole(payload);
      
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

