---
description: >-
  Returns all the information of a security deposit requested through one or
  more requested contract ids.
icon: table
---

# Get Escrows By Contract Ids

### **Headers**

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>x-api-key</td><td><code>&#x3C;token></code></td></tr></tbody></table>

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/helper/get-escrow-by-contract-ids" method="get" %}
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
    "x-api-key": your_api_key,
  },
});

export const useExample = async () => {
  const contractIds = [
    "CCR6HLU3LQMXOESNA6TOS2RZKGEBWQG3EN5FMZNC43RVXZWTTDCZ...",
    "CCA7WTCVCQ5JPKNIFSHPSJLJ3FJ3GKPNEVAIHP6T..."
  ];
  const validateOnChain = true;

  const params = new URLSearchParams();
  contractIds.forEach(id => params.append("contractIds[]", id));
  params.append("signer", signer);
  params.append("validateOnChain", validateOnChain.toString());

  const response = await http.get(`/helper/get-escrow-by-contract-ids?${params.toString()}`);
  return response;
}
```
