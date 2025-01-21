---
description: Deploy the contract and initialize the escrow entity.
---

# Invoke Deployer Contract

<mark style="color:green;">**`POST`**</mark> `deployer/invoke-deployer-contract`



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
  "engagementId": "1",
  "description": "any",
  "serviceProvider": "GA2RRI2...",
  "amount": "1",
  "signer": "GBPUACN..."
}
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "message": "The escrow has been successfully initialized",
    "contractId": "CCR3IWUP...",
    "engagementId": "1"
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Engagement Id**</mark>

```json
{
  "error": "Engagement ID cannot be empty"
}
```



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
