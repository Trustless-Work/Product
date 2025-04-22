---
description: Returns all the information of an escrow requested through the contractId.
icon: get-pocket
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Get Escrow by Contract ID

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/escrow/get-escrow-by-contract-id" method="get" %}
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

export const useExample = async () => {

    const data = await http.get(
      "/escrow/get-escrow-by-contract-id",
      {
        // body requested for the endpoint
      },
    ); 
  
    return data;
}
```
