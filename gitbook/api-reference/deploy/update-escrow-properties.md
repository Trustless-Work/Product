---
description: >-
  This endpoint allows you to change the properties of an escrow as long as a
  series of requirements are met, which will be mentioned in this section.
icon: pencil
---

# Update Escrow

### Requirements to use:

1. Only the entity with the platform role has permissions to execute this endpoint
2. If an escrow has funds, the only thing the platform can do is add more milestones. The other properties cannot be modified under any circumstances.

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>x-api-key</td><td><code>&#x3C;token></code></td></tr></tbody></table>

### Roles:

| Name            | Type   | Description                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------ |
| approver        | string | Address of the entity requiring the service.                                         |
| serviceProvider | string | Address of the entity providing the service.                                         |
| platformAddress | string | Address of the entity that owns the escrow                                           |
| releaseSigner   | string | Address of the user in charge of releasing the escrow funds to the service provider. |
| disputeResolver | string | Address in charge of resolving disputes within the escrow.                           |
| receiver        | string | Address where escrow proceeds will be sent to                                        |

### Milestone:

| Name        | Type    | Description                                                            |
| ----------- | ------- | ---------------------------------------------------------------------- |
| description | string  | Text describing the function of the milestone.                         |
| status      | string  | Milestone status. Ex: Approved, In dispute, etc...                     |
| approved    | boolean | Flag indicating whether a milestone has been approved by the approver. |

### Flags

| Name     | Type    | Description                                                       |
| -------- | ------- | ----------------------------------------------------------------- |
| disputed | boolean | Flag indicating that an escrow is in dispute.                     |
| released | boolean | Flag indicating that escrow funds have already been released.     |
| resolved | boolean | Flag indicating that a disputed escrow has already been resolved. |

### Trustline

| Name    | Type   | Description                                                                |
| ------- | ------ | -------------------------------------------------------------------------- |
| address | string | Public address establishing permission to accept and use a specific token. |

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/escrow/single-release/update-escrow" method="put" %}
[OpenAPI trustless-work-api-dev](https://dev.api.trustlesswork.com/api-yaml)
{% endopenapi-operation %}

### **What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.

### Use Example:

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: "https://dev.api.trustlesswork.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": your_api_key,
  },
});

export const useExample = async () => {
    // Get the signer address
    const { address } = await kit.getAddress();

    const response = await http.put(
      "/escrow/single-release/update-escrow",
      {
        // body requested for the endpoint
      },
    ); 
    
    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;

    return data;
}
```
