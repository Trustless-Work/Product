---
description: >-
  Allows users to deposit funds into an existing escrow contract, securing them
  until the agreed conditions are met.
---

# Fund Escrow

<mark style="color:green;">**`POST`**</mark> `escrow/fund-escrow`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                                  | Type              | Description                                                                     |
| ------------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre> | string            | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>contractId
</code></pre>   | string            | The unique identifier of the contract.                                          |
| <pre><code>signer
</code></pre>       | string \| Address | The address authorized to approve the release of funds.                         |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "engagementId": "test",
  "contractId": "GD2SVFOJ...",
  "signer": "SCMXDC..."
}
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Only Signer**</mark>

```json
{
  "error": "Only the signer can fund the escrow"
}
```

<mark style="color:red;">**Already Funded**</mark>

```json
{
  "error": "Escrow already funded"
}
```

<mark style="color:red;">**Fully Funded**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "This escrow is already fully funded"
}
</code></pre>

<mark style="color:red;">**Insufficient Founds**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "The signer does not have sufficient funds"
}
</code></pre>

<mark style="color:red;">**Not Found**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Escrow not found"
}
</code></pre>

<mark style="color:red;">**Not Enough Allowance**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Not enough allowance to fund this escrow"
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



