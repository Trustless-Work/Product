---
description: >-
  Returns all the information of a security deposit requested through one or
  more requested contract ids.
icon: memo-circle-check
---

# Get Escrows By Contract Ids

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

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
    Authorization: `Bearer your_api_key`,
  },
});

export const useExample = async () => {
  const contractIds = [
    "CCR6HLU3LQMXOESNA6TOS2RZKGEBWQG3EN5FMZNC43RVXZWTTDCZ...",
    "CCA7WTCVCQ5JPKNIFSHPSJLJ3FJ3GKPNEVAIHP6T..."
  ];
  const signer = "GBPUACN7QETR4TCYTKINBDHTYTFXD3BQQV7VSM...";
  const validateOnChain = true;

  const params = new URLSearchParams();
  contractIds.forEach(id => params.append("contractIds[]", id));
  params.append("signer", signer);
  params.append("validateOnChain", validateOnChain.toString());

  const response = await http.get(`/helper/get-escrow-by-contract-ids?${params.toString()}`);
  return response;
}
```
