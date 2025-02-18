---
description: Get the balance of multiple escrows.
icon: dollar-sign
---

# Get Multiple Escrow Balance

<mark style="color:orange;">**`GET`**</mark> `helper/get-multiple-escrow-balance`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Params**

| Name      | Type      | Description                                                               |
| --------- | --------- | ------------------------------------------------------------------------- |
| signer    | string    | Entity that signs the transaction that deploys and initializes the escrow |
| addresses | string\[] | List of addresses requesting escrow balance retrieval                     |

**Example of Request Params:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
    "signer": "GAD4T6Z63N5NJLQYY3J5MVYFHH5I5UB7NDUUYZD7HHB3RMS6X3H4YK7P",
    "addresses": ["GAHJZHVKFLATA7RVGXSFKXAKT5H4RXJ4LU2UR2W2IDFXOJQ2BR7RHW62",            "GAHJZHVKFLATA7RVGXSFKXAKT5H4RXJ4LU2UR2W2IDFXOJQ2BR7RHW62"]
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
