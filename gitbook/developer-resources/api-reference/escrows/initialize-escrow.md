---
description: >-
  Funds are deposited into the escrow contract, either manually by a party or
  automatically via an API call.
hidden: true
---

# Initialize Escrow

<mark style="color:green;">**`POST`**</mark> `escrow/initialize-escrow`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                                     | Type              | Description                                                                     |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre>    | string            | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>description
</code></pre>     | string            | A brief summary or metadata describing the scope of the service/product.        |
| <pre><code>issuer
</code></pre>          | string \| Address | The address of the party that created the escrow contract.                      |
| <pre><code>serviceProvider
</code></pre> | string \| Address | The address of the entity receiving the payment.                                |
| <pre><code>amount
</code></pre>          | string            | The amount pacted (price of product/service).                                   |
| <pre><code>signer
</code></pre>          | string \| Address | The address authorized to approve the release of funds.                         |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "engagementId": "test",
  "description": "description test",
  "issuer": "GD2SVFOJ...",
  "serviceProvider": "GD2SVFOJ...",
  "amount": "100",
  "signer": "GD2SVFOJ..."
}
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "message": "The escrow has been successfully initialized"
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Prices**</mark>

```json
{
  "error": "Amount cannot be zero"
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
