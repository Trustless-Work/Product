---
description: Deploy the contract and initialize the escrow entity.
---

# Invoke Deployer Contract

<mark style="color:green;">**`POST`**</mark> `deployer/invoke-deployer-contract`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |
| Authorization  | `Bearer <token>` |

**Body**

| Name            | Type         | Description                                                  |
| --------------- | ------------ | ------------------------------------------------------------ |
| signer          | string       | Entity that signs the transaction that deploys and initializes the escrow |
| engagementId    | string       | engagementId: Unique identifier for the escrow               |
| title           | string       | Name of the escrow                                           |
| description     | string       | Text describing the function of the escrow                   |
| client          | string       | Address of the entity requiring the service                  |
| serviceProvider | string       | Address of the entity providing the service                  |
| platformAddress | string       | Address of the platform that owns the escrow                 |
| amount          | string       | Amount to be transferred upon completion of escrow milestones |
| platformFee     | string       | Commission that the platform will receive when the escrow is completed |
| milestones      | Milestones[] | Objectives to be completed to define the escrow as completed |
| releaseSigner   | string       | Address of the entity in charge of releasing escrow funds    |
| disputeResolver | string       | Address in charge of resolving disputes within the escrow    |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"signer": "GAD4T6Z63N5NJLQYY3J5MVYFHH5I5UB7NDUUYZD7HHB3RMS6X3H4YK7P", 
	"engagementId": "ENG12345",
	"title": "Project Title",
	"description": "This is a detailed description of the project.",
	"client": "GAHJZHVKFLATA7RVGXSFKXAKT5H4RXJ4LU2UR2W2IDFXOJQ2BR7RHW62",
	"serviceProvider": "GDWPCWWH7IXQJHDF7FJUI7VOGD5IT72T7YX55F4BR2H4WXFRBVMBK6A3", 
	"platformAddress": "GBC5DVYUBTBSXJ3ZMRPGXDDDLKTALIFGRW73B33AF5EFSZBUECKSFO4R",
	"amount": "1000.00",
	"platformFee": "50.00", 
	"milestones": [
		{ "description": "Initial phase of the project", status: "Pending" },
		{ "description": "Completion of design work", status: "Pending" }
	],
	"releaseSigner": "GBDKXCG6FHJMTUBWGAVVOD5PB5QXLYTRJGCH4NR4IMJVPXHHTBBXPY3V",
	"disputeResolver": "GDJVCNR5GPOJH7XMOVMHBKZV7V7WQ3B7QK75C76HLOBD4AKHFG5OCARJ"
};
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAAA1GKN..."
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Engagement Id**</mark>

```json
{
  "error": "Engagement ID cannot be empty"
}
```



<mark style="color:red;">**Prices**</mark>

```json
{
  "error": "Amount cannot be zero"
}
```
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
