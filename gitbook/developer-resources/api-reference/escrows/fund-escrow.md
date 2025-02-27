---
icon: sack-dollar
description: >-
  Allows users to deposit funds into an existing escrow contract, securing them
  until the agreed conditions are met.
---

# Fund Escrow

Allows flexible USDC amounts to be transferred to the escrow contract.

<mark style="color:green;">**`POST`**</mark> `escrow/fund-escrow`

**Headers**

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

**Body**

| Name       | Type   | Description                                          |
| ---------- | ------ | ---------------------------------------------------- |
| contractId | string | ID (address) that identifies the escrow contract     |
| signer     | string | Address of the user signing the contract transaction |
| amount     | string | Amount to transfer to the escrow contract            |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"signer": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
	"amount": "500.00"
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="201 Success" %}
<pre class="language-json"><code class="lang-json"><strong>{
</strong>    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
<strong>}
</strong></code></pre>
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Escrow in dispute**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Escrow has been opened for dispute resolution"
}
```

<mark style="color:red;">**Fully Funded**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong><strong>  "status": "FAILED"
</strong>  "message": "This escrow is already fully funded"
}
</code></pre>

<mark style="color:red;">**Amount to deposit is greater than escrow amount**</mark>

```javascript
{
  "status": "FAILED"
  "message": "Amount to deposit is greater than the escrow amount"
}
```

<mark style="color:red;">**Insufficient Founds**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong>  "status": "FAILED"
  "message": "The signer does not have sufficient funds"
}
</code></pre>

<mark style="color:red;">**Not Found**</mark>

<pre class="language-json"><code class="lang-json"><strong>{
</strong><strong>  "status": "FAILED"
</strong>  "message": "Escrow not found"
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
      "/escrow/fund-escrow",
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
