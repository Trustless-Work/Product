---
description: Get the allowance.
hidden: true
---

# Get Allowance

<mark style="color:orange;">**`GET`**</mark> `helper/get-allowance`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Params**

| Name                             | Type              | Description                     |
| -------------------------------- | ----------------- | ------------------------------- |
| <pre><code>from
</code></pre>    | string \| address | The address of "from" entity    |
| <pre><code>spender
</code></pre> | string \| address | The address of "spender" entity |



**Example of Request Params:**

```javascript
from = CBFSCU...
spender = CBFSCU...
```



**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "engagement_id": "test",
    VERIFICAR
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

{% tab title="429 Rate Limit" %}
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
{% endtab %}
{% endtabs %}
