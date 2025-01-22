---
description: Request an api key to interact with other endpoints.
---

# Request Api Key 

<mark style="color:green;">**`POST`**</mark> `auth/request-api-key`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |


| Name   | Type   | Description                         |
| ------ | ------ | ----------------------------------- |
| wallet | string | Your wallet alredy sign on the dApp |





**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "wallet": "GA2RRI2...",
}
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "address":"GA2RRI2...",
    "profileImage":"",
    "createdAt":{"_seconds":1737533439,"_nanoseconds":209000000},
    "saveEscrow":true,
    "country":"",
    "firstName":"Bob",
    "lastName":"",
    "useCase":"",
    "identification":"123...",
    "phone":"61316145","id":"GA2RRI2...",
    "email":"bob@mail.com",
    "updatedAt":{"_seconds":1737533520,"_nanoseconds":434000000},
    "token":"eyJhbGciOi..."
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Engagement Id**</mark>

```json
{
  "error": "Wallet cannot be empty"
}
```

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
