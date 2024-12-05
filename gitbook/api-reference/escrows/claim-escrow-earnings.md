---
description: Allows a user to withdraw their locked earnings from an escrow contract.
---

# Claim Escrow Earnings

<mark style="color:green;">**`POST`**</mark> `escrow/claim-escrow-earnings`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                                     | Type              | Description                                                                     |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre>    | string            | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>serviceProvider
</code></pre> | string \| Address | The address of the entity receiving the payment.                                |
| <pre><code>contractId
</code></pre>      | string            | The unique identifier of the contract.                                          |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "engamentId": "test", 
  "serviceProvider": "GD2SVFOJ...",
  "contractId": "SCMXDC..."
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

{% tab title="500 Server Error" %}
<mark style="color:red;">**Complete Claim Earnings**</mark>

```json
{
  "error": "The escrow must be completed to claim earnings"
}
```

<mark style="color:red;">**Only Service Provider**</mark>

```json
{
  "error": "Only the service provider can claim escrow earnings"
}
```

<mark style="color:red;">**Not Found**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Escrow not found"
}
</code></pre>

<mark style="color:red;">**Amount**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "The escrow balance must be equal to the amount of earnings defined for the escrow"
}
</code></pre>

<mark style="color:red;">**Cancelled**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "The escrow has already been cancelled"
}
</code></pre>

<mark style="color:red;">**Funds**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "The contract does not have sufficient funds"
}
</code></pre>
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



**What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.
