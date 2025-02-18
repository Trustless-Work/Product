---
icon: get-pocket
description: Get an escrow through the engagement id.
---

# Get Escrow by Engagement ID

<mark style="color:orange;">**`GET`**</mark> `escrow/get-escrow-by-engagement-id`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Params**

| Name                                  | Type   | Description                                                                     |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre> | string | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>contractId
</code></pre>   | string | The unique identifier of the contract.                                          |



**Example of Request Params:**

```javascript
engagementId = 10xs
contractId = GD2SVFOJ...
```



**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "engagementId": "test",
    "description": "test description",
    "issuer": "GD2SVFOJ...",
    "signer": "GD2SVFOJ...",
    "serviceProvider": "GD2SVFOJ...",
    "amount": 1,
    "balance": 0.5,
    "cancelled": true,
    "completed": false
}
```
{% endtab %}

{% tab title="500 Server Error " %}
<mark style="color:red;">**Not Found**</mark>

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

{% tab title="429 Rate Limit" %}
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
{% endtab %}
{% endtabs %}
