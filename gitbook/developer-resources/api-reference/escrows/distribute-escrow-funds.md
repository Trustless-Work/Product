---
description: The escrow has been successful completed.
icon: '4'
---

# Distribute escrow funds

Distributes escrow earnings after the escrow is marked as complete.

**URL:** `/escrow/distribute-escrow-earnings`

### Body params:

contractId: ID (address) that identifies the escrow contract

releaseSigner: Address of the user defined to release the funds

#### Example:

```jsx
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	releaseSigner: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
};
```



***

<mark style="color:green;">**`This was previously called complete escrow:`**</mark>

<mark style="color:green;">**`POST`**</mark> `escrow/complete-escrow`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                                  | Type              | Description                                                                     |
| ------------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre> | string            | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>signer
</code></pre>       | string \| Address | The address authorized to approve the release of funds.                         |
| <pre><code>contractId
</code></pre>   | string            | The unique identifier of the contract.                                          |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "engamentId": "test", 
  "signer": "GD2SVFOJ...",
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
<mark style="color:red;">**Only Signer**</mark>

```json
{
  "error": "Only the signer can complete the escrow"
}
```

<mark style="color:red;">**Not Funded**</mark>

```json
{
  "error": "Escrow not funded"
}
```

<mark style="color:red;">**Already Completed**</mark>

```json
{
    "error": "Escrow already completed"
}
```

<mark style="color:red;">**Not Found**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Escrow not found"
}
</code></pre>

<mark style="color:red;">**Insufficient Founds**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "The signer does not have sufficient funds"
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
