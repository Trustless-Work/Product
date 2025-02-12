---
description: The escrow has been successful completed.
icon: '4'
---

# Distribute escrow earnings

Distributes escrow earnings after the escrow is marked as complete.

<mark style="color:green;">**`POST`**</mark> `escrow/distribute-escrow-earnings`

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |
| Authorization  | `Bearer <token>` |

**Body**

| Name          | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| contractId    | string | ID (address) that identifies the escrow contract |
| releaseSigner | string | Address of the user defined to release the funds |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	contractId: "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	releaseSigner: "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
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
