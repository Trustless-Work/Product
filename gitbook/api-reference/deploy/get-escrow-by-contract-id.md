---
description: Returns all the information of an escrow requested through the contractId.
icon: square-list
---

# Get Escrow

### **Headers**

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>x-api-key</td><td><code>&#x3C;token></code></td></tr></tbody></table>

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
    "x-api-key": your_api_key,
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
