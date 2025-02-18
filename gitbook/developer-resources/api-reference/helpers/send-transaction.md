---
description: Confirm the transaction.
icon: comment-arrow-up-right
---

# Send Transaction

<mark style="color:green;">**`POST`**</mark> `helper/send-transaction`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name                  | Type    | Description                                 |
| --------------------- | ------- | ------------------------------------------- |
| signedXdr             | string  | The sign's hash. This come from the wallet. |
| returnValueIsRequired | boolean | If a return value is needed.                |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "signedXdr": "AAAAAgAAAAB...",
  "returnValueIsRequired": true,
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "status": "SUCCESS",
    "message": "The transaction has been successfully sent to the Stellar network"
}
```
{% endtab %}

{% tab title="500 Server Error" %}
```json
{
  "error": "Internal server error"
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
