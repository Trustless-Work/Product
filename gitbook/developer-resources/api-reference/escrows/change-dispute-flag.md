---
icon: face-pouting
description: >-
  Responsible for setting the escrow in dispute state. Changes the value of the
  escrow's "dispute_flag" property to true.
---

# Change Dispute Flag

<mark style="color:green;">**`POST`**</mark> `escrow/change-dispute-flag`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name       | Type   | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| contractId | string | ID (address) that identifies the escrow contract  |
| signer     | string | Address of the user who will sign the transaction |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"signer": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
}
```
{% endtab %}

{% tab title="500 Server Error " %}
<mark style="color:red;">**Not found**</mark>

```json
{
  "status": "FAILED"
  "message": "Escrow not found"
}
```

<mark style="color:red;">**Escrow already in dispute**</mark>

```javascript
{
  "status": "FAILED"
  "message": "Escrow already in dispute"
}
```
{% endtab %}

{% tab title="400 Bad Request" %}
```json
{
    "message": "Message",
    "error": "Bad Request",
    "statusCode": 400
}
```
{% endtab %}

{% tab title="401 Unauthorized" %}
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```
{% endtab %}

{% tab title="429 Rate Limit" %}
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
{% endtab %}
{% endtabs %}

**What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.

#### Use example (Using axios):

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer your_api_key`,
  },
});

export const useExample = async () => {
    const response = await http.post(
      "/escrow/change-dispute-flag",
      {
        // body requested for the endpoint
      },
    ); 
}
```
