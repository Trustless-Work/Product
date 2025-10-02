---
description: Get the balance of multiple escrows.
icon: dollar-sign
---

# Get Multiple Escrow Balance

### **Headers**

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>x-api-key</td><td><code>&#x3C;token></code></td></tr></tbody></table>

### **Open API**

{% openapi-operation spec="trustless-work-api-dev" path="/escrow/multi-release/get-multiple-escrow-balance" method="get" %}
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

export const useExample = async (signer: string, addresses: string[]) => {
  const response = await http.get("/escrow/multi-release/get-multiple-escrow-balance", {
    params: { addresses, signer },
  });

  return response;
};

```
