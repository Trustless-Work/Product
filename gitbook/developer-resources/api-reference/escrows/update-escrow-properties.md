---
description: >-
  This endpoint allows you to change the properties of an escrow as long as a
  series of requirements are met, which will be mentioned in this section.
icon: pencil
---

# Update escrow properties

<mark style="color:green;">**`Put`**</mark> `escrow/update-escrow-by-contract-id`

#### Requirements to use:

1. Only the entity with the platform role has permissions to execute this endpoint
2. You cannot change the properties of an escrow which already has an approved milestone
3. You cannot change the properties of an escrow which already has funds
4. You cannot change the properties of an escrow which is in dispute.

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

### Body

| Name       | Type        | Description                                                               |
| ---------- | ----------- | ------------------------------------------------------------------------- |
| signer     | string      | Entity that signs the transaction that deploys and initializes the escrow |
| contractId | string      | ID (address) that identifies the escrow contract                          |
| escrow     | Escrow Body | Object containing all the properties contained in the body of an escrow.  |

### Escrow Body

| Name                    | Type               | Description                                                                                                                                                                                                                               |
| ----------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| engagementId            | string             | ID that the user who created the escrow wants to define to it                                                                                                                                                                             |
| title                   | string             | Name of the escrow                                                                                                                                                                                                                        |
| description             | string             | Text describing the function of the escrow                                                                                                                                                                                                |
| approver                | string             | Address of the entity requiring the service                                                                                                                                                                                               |
| serviceProvider         | string             | Address of the entity providing the service                                                                                                                                                                                               |
| platformAddress         | string             | Address of the platform that owns the escrow                                                                                                                                                                                              |
| amount                  | string             | Amount to be transferred upon completion of escrow milestones                                                                                                                                                                             |
| plataformFee            | string             | Commission that the platform will receive when the escrow is completed                                                                                                                                                                    |
| milestones              | Milestones\<Array> | Objectives to be completed to define the escrow as completed releaseSigner: Address of the entity in charge of releasing escrow funds                                                                                                     |
| releaseSigner           | string             | Address of the user in charge of releasing the escrow funds to the service provider.                                                                                                                                                      |
| disputeResolver         | string             | Address in charge of resolving disputes within the escrow                                                                                                                                                                                 |
| trustline               | string             | Address of the token that will manage USDC movements                                                                                                                                                                                      |
| trustlineDecimals       | number             | Number of decimal places determining the divisibility of the token base unit (trustline)                                                                                                                                                  |
| receiver                | string             | Address of the user to whom the escrow funds will be destined to                                                                                                                                                                          |
| receiverMemo (Optional) | number             | Field used to identify the recipient's address in transactions through an intermediary account. This value is included as a memo in the transaction and allows the funds to be correctly routed to the wallet of the specified recipient. |

#### Example of request body:

```javascript
{
    "signer": "GBPA2LO4XHBZD54ZEGGK4GG3OYHAYBPK6FNDAHCJWNJTLTKYUL52QCQR",
    "contractId": "CBYAESXO6OOPWQMP6BEL5MQK6CYO5GYN4YUB4PCZ7WO2SKELUFYGDXNI",
    "escrow": {
        "engagementId": "ABC123",
        "title": "title",
        "description": "This is a description",
        "approver": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "serviceProvider": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "platformAddress": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "amount": "1",
        "platformFee": "1",
        "milestones": [{"description": "Milestone1", "flag": true, "status": "pending"}],
        "releaseSigner": "GBPUACN7QETR4TCYTKINBDHTYTFXD3BQQV7VSMZC5CX74E4MTUL2AMUB",
        "disputeResolver": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "trustline": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "trustlineDecimals": 10000000,
        "receiver": "GA2RRI2CB4ISIARVJEVQOMZX4PLQK4X6BDC3EWXJBRTNB4GCEIQWIQ7V",
        "receiverMemo": 12321
    }
}
```



{% tabs %}
{% tab title="200 Success" %}
<pre class="language-javascript"><code class="lang-javascript"><strong>{
</strong>    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
<strong>}
</strong></code></pre>
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Not found**</mark>

```javascript
{
    status: "FAILED"
    message: "Escrow not found"
}
```

<mark style="color:red;">**Only the plataform address can change the escrow properties**</mark>

```javascript
{
    status: "FAILED"
    message: "Only the platform address should be able to execute this function"
}
```

<mark style="color:red;">**There are approved milestones in escrow**</mark>

```javascript
{
    status: "FAILED"
    message: "You can't change the escrow properties after the milestone is approved"
}
```

<mark style="color:red;">**Escrow has funds**</mark>

```javascript
{
    status: "FAILED"
    message: "Escrow has funds"
}
```

<mark style="color:red;">**Escrow in dispute**</mark>

```javascript
{
    status: "FAILED"
    message: "Escrow has been opened for dispute resolution"
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

**What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.

#### Use example (Using axios):

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: "https://dev.api.trustlesswork.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer your_api_key`,
  },
});

export const useExample = async () => {
    // Get the signer address
    const { address } = await kit.getAddress();

    const response = await http.put(
      "/escrow/update-escrow-by-contract-id",
      {
        // body requested for the endpoint
      },
    ); 
    
    // Get the unsigned transaction hash
    const { unsignedTransaction } = response.data;

    // Sign the transaction by wallet
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    // Send the transaction to Stellar Network
    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;

    return data;
}
```
