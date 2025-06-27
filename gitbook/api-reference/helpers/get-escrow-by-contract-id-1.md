---
description: Returns all the information of an escrow requested through the role.
icon: square-list
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

# Get Escrows By Role

### **Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/helper/get-escrows-by-role" method="get" %}
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
      "/escrow/single-release/get-escrows-by-role?role=approver?roleAddress=GPUACN...." 👈🏼 // All required parameters are passed at the query level.
    ); 
  
    return data;
}
```
