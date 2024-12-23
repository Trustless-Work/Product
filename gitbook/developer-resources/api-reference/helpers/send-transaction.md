---
description: Confirm the transaction.
---

# Send Transaction

<mark style="color:green;">**`POST`**</mark> `helper/send-transaction`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                               | Type   | Description                                 |
| ---------------------------------- | ------ | ------------------------------------------- |
| <pre><code>signedXdr
</code></pre> | string | The sign's hash. This come from the wallet. |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "signedXdr": "AAAAAgAAAAB...",
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

{% tab title="429 Rate Limit" %}
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
{% endtab %}
{% endtabs %}
