---
icon: scribble
description: >-
  This endpoint allows a trustline to be established on the Stellar blockchain
  specifically for the USDC token issued by Circle on the user's account.
---

# Set Trustline

### What is it for?

In Stellar, before a token such as Circle's USDC can be received and stored, an account must establish a trustline with the issuer of the asset. This endpoint facilitates that process in an automated fashion.

**Note:** This endpoint should not necessarily work in main.

<mark style="color:green;">**`POST`**</mark> helper/set-trustline

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Params**

| Name                                     | Type   | Description                   |
| ---------------------------------------- | ------ | ----------------------------- |
| <pre><code>sourceSecretKey
</code></pre> | string | The key of the secret source. |
|                                          |        |                               |

**Example of Request Body:**

```javascript
{
  "sourceSecretKey": "GDN6I...", 
}
```

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "status": "SUCCESS",
    "message": "The trust line has been correctly defined in the USDC token"
}
```
{% endtab %}

{% tab title="500 Server Error " %}
<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "error": "Internal server error"
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
