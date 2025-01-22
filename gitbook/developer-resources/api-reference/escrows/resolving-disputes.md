---
description: Handles the resolution of disputes within an escrow by transferring the amounts entered so far in the escrow to the client and service provider according to what the dispute resolver deems appropriate.
---

# Resolving disputes

<mark style="color:green;">**`POST`**</mark> `escrow/resolving-disputes`

**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |
| Authorization  | `Bearer <token>` |

**Body**

| Name                 | Type   | Description                                                  |
| -------------------- | ------ | ------------------------------------------------------------ |
| <pre><code>contractId</code></pre>           | string | ID (address) that identifies the escrow contract             |
| <pre><code>disputeResolver</code></pre>      | string | Address of the user defined to resolve disputes in an escrow |
| <pre><code>clientFunds</code></pre>          | string | Amount to transfer to the client for dispute resolution      |
| <pre><code> serviceProviderFunds </code></pre> | string | Amount to transfer to the service provider for dispute resolution |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"disputeResolver": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
	"clientFunds": "100",
	"serviceProviderFunds": "50"
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    ???
}
```
{% endtab %}

{% tab title="500 Server Error " %}
<mark style="color:red;">**Not Found VERIFICAR**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Escrow not found"
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


