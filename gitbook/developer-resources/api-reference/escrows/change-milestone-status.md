---
description: >-
  Responsible for modifying the "status" property of a specific milestone in the
  escrow.
icon: hexagon-check
---

# Change Milestone Status (Complete)

<mark style="color:green;">**`POST`**</mark> `escrow/change-milestone-status`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name            | Type    | Description                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------- |
| contractId      | string  | ID (address) that identifies the escrow contract                                    |
| milestoneIndex  | string  | Position that identifies the milestone within the group of milestones in the escrow |
| newFlag         | boolean | New value for the "flag" property within the escrow milestone                       |
| serviceProvider | string  | Address of the service provider who will modify the contract's "status" property    |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"milestoneIndex": "0", 
	"newStatus": "Approved",
	"serviceProvider": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP"
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
