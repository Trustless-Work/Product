---
icon: square-dollar
description: You release the escrow funds to the service provider through the approver.
---

# Distribute Escrow Earnings

<mark style="color:green;">**`POST`**</mark> `escrow/distribute-escrow-earnings`

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

### Body

| Name          | Type   | Description                                                       |
| ------------- | ------ | ----------------------------------------------------------------- |
| contractId    | string | ID (address) that identifies the escrow contract                  |
| releaseSigner | string | Address of the signatory in charge of releasing the escrow funds. |

#### Example of request body:

```javascript
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"signer": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
	"amount": "500.00"
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

<mark style="color:red;">**Only release signer can distribute the escrow earnings**</mark>

```javascript
{
    status: "FAILED"
    message: "Only the release signer can claim escrow earnings"
}
```

<mark style="color:red;">**No milestone defined**</mark>

```javascript
{
    status: "FAILED"
    message: "Escrow initialized without milestone"
}
```

<mark style="color:red;">**Escrow not completed**</mark>

```javascript
{
    status: "FAILED"
    message: "The escrow must be completed to distribute earnings"
}
```

<mark style="color:red;">**Escrow in dispute**</mark>

```javascript
{
    status: "FAILED"
    message: "Escrow has been opened for dispute resolution"
}
```

<mark style="color:red;">**Escrow balance not enough**</mark>

```javascript
{
    status: "FAILED"
    message: "The escrow balance must be equal to the amount of earnings defined for the escrow"
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

    const response = await http.post(
      "/escrow/distribute-escrow-earnings",
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
      returnValueIsRequired: true,
    });

    const { data } = tx;

    return data;
}
```
