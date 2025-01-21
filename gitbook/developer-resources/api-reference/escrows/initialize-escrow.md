---
description: >-
  Funds are deposited into the escrow contract, either manually by a party or
  automatically via an API call.
icon: '1'
---

# Initialize Escrow

## Initialize escrow

Deploys the escrow contract and defines its properties.

**URL:** `/deployer/invoke-deployer-contract`

### Body params:

signer: Entity that signs the transaction that deploys and initializes the escrow engagementId: Unique identifier for the escrow

title: Name of the escrow

description: Text describing the function of the escrow

client: Address of the entity requiring the service

serviceProvider: Address of the entity providing the service

platformAddress: Address of the platform that owns the escrow

amount: Amount to be transferred upon completion of escrow milestones

platformFee: Commission that the platform will receive when the escrow is completed

milestones: Objectives to be completed to define the escrow as completed releaseSigner: Address of the entity in charge of releasing escrow funds

disputeResolver: Address in charge of resolving disputes within the escrow

#### Example:

```jsx
{
	signer: "GAD4T6Z63N5NJLQYY3J5MVYFHH5I5UB7NDUUYZD7HHB3RMS6X3H4YK7P", 
	engagementId: "ENG12345",
	title: "Project Title",
	description: "This is a detailed description of the project.",
	client: "GAHJZHVKFLATA7RVGXSFKXAKT5H4RXJ4LU2UR2W2IDFXOJQ2BR7RHW62",
	serviceProvider: "GDWPCWWH7IXQJHDF7FJUI7VOGD5IT72T7YX55F4BR2H4WXFRBVMBK6A3", 
	platformAddress: "GBC5DVYUBTBSXJ3ZMRPGXDDDLKTALIFGRW73B33AF5EFSZBUECKSFO4R",
	amount: "1000.00",
	platformFee: "50.00", 
	milestones: [
		{ description: "Initial phase of the project", status: "Pending" },
		{ description: "Completion of design work", status: "Pending" }
	],
	releaseSigner: "GBDKXCG6FHJMTUBWGAVVOD5PB5QXLYTRJGCH4NR4IMJVPXHHTBBXPY3V",
	disputeResolver: "GDJVCNR5GPOJH7XMOVMHBKZV7V7WQ3B7QK75C76HLOBD4AKHFG5OCARJ"
};
```



***

Prievious Version:&#x20;



<mark style="color:green;">**`POST`**</mark> `escrow/initialize-escrow`



**Headers**

| Name         | Value              |
| ------------ | ------------------ |
| Content-Type | `application/json` |

**Body**

| Name                                     | Type              | Description                                                                     |
| ---------------------------------------- | ----------------- | ------------------------------------------------------------------------------- |
| <pre><code>engagementId
</code></pre>    | string            | The unique identifier linking this escrow to a specific project or transaction. |
| <pre><code>description
</code></pre>     | string            | A brief summary or metadata describing the scope of the service/product.        |
| <pre><code>issuer
</code></pre>          | string \| Address | The address of the party that created the escrow contract.                      |
| <pre><code>serviceProvider
</code></pre> | string \| Address | The address of the entity receiving the payment.                                |
| <pre><code>amount
</code></pre>          | string            | The amount pacted (price of product/service).                                   |
| <pre><code>signer
</code></pre>          | string \| Address | The address authorized to approve the release of funds.                         |



**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "engagementId": "test",
  "description": "description test",
  "issuer": "GD2SVFOJ...",
  "serviceProvider": "GD2SVFOJ...",
  "amount": "100",
  "signer": "GD2SVFOJ..."
}
```
{% endcode %}



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "message": "The escrow has been successfully initialized"
}
```
{% endtab %}

{% tab title="500 Server Error" %}
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

{% tab title="429 Rate Limit" %}
```json
{
    "statusCode": 429,
    "message": "ThrottlerException: Too Many Requests"
}
```
{% endtab %}
{% endtabs %}
