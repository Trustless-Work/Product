---
icon: get-pocket
description: Get an escrow through the engagement id.
---

# Get Escrow by Contract ID

<mark style="color:orange;">**`GET`**</mark> `escrow/get-escrow-by-contract-id`



**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Params**

| Name                                | Type   | Description                                          |
| ----------------------------------- | ------ | ---------------------------------------------------- |
| <pre><code>signer
</code></pre>     | string | Address of the user signing the contract transaction |
| <pre><code>contractId
</code></pre> | string | The unique identifier of the contract.               |



**Example of Request Params:**

```javascript
signer = GBPUACN...
contractId = GD2SVFOJ...
```

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "amount":7,
    "approver":"GBPUACN...",
    "description":"description",
    "dispute_flag":true,
    "dispute_resolver":"GDBMRVZ....",
    "engagement_id":"12321",
    "milestones":[
        {
            "approved_flag":false,
            "description":"milestone 1",
            "status":"pending"
        }
    ],
    "platform_address":"GBPA2L...",
    "platform_fee":1000,
    "release_flag":false,
    "release_signer":"GCPZUO...",
    "resolved_flag":true,
    "service_provider":"GA2RRI...",
    "title":"Ebay",
    "trustline":"CBIEL..."}
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
