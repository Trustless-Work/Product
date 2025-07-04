---
description: >-
  This endpoint allows you to change the properties of an escrow as long as a
  series of requirements are met, which will be mentioned in this section.
icon: floppy-disk-pen
---

# Update From Tx Hash

### Requirements for Use:

* You must have the valid `txHash` generated from a transaction sent directly to the Stellar network.
* The escrow data associated with this `txHash` must already exist in the internal queue.

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

### Workflow:

1. The XDR is obtained from any transaction (not signed) generated with any of the endpoints of our REST API.
2. An unsigned XDR is generated and returned.
3. The XDR is signed externally and sent directly to Stellar.
4. The resulting `txHash` is retrieved.
5. The `txHash` is sent to `/indexer/update-from-txHash`.
6. The escrow information is retrieved from the internal queue and stored in Firebase.

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/indexer/update-from-txhash" method="put" %}
[OpenAPI trustless-work-api-dev](https://dev.api.trustlesswork.com/api-yaml)
{% endopenapi-operation %}

### Use Example:

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: "https://dev.api.trustlesswork.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer your_api_key`,
  },
});

export const updateEscrowFromTxHash = async (txHash) => {
  const response = await http.post("/indexer/update-from-txHash", { txHash });
  return response.data;
};
```
