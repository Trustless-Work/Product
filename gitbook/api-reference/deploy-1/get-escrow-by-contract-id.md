---
description: Returns all the information of an escrow requested through the contractId.
icon: square-list
---

# Get Escrow

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/escrow/single-release/get-escrow" method="get" %}
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

    const data = await http.get(
      "/escrow/single-release/get-escrow",
      {
        // body requested for the endpoint
      },
    ); 
  
    return data;
}
```
