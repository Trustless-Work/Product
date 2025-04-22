---
description: Get the balance of multiple escrows.
icon: dollar-sign
---

# Get Multiple Escrow Balance

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

### **Open API**

{% openapi-operation spec="trustless-work-api-dev" path="/helper/get-multiple-escrow-balance" method="get" %}
[Broken link](broken-reference)
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

export const useExample = async (signer: string, addresses: string[]) => {
  const response = await http.get("/helper/get-multiple-escrow-balance", {
    params: { addresses, signer },
  });

  return response;
};

```
