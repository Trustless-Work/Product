---
description: >-
  Resolves escrow disputes by distributing funds to the approver and service
  provider as determined by the dispute resolver.
icon: handshake
---

# Resolve Dispute

<mark style="color:green;">**`POST`**</mark> `escrow/resolving-disputes`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name                                     | Type   | Description                                                       |
| ---------------------------------------- | ------ | ----------------------------------------------------------------- |
| <pre><code>contractId
</code></pre>      | string | ID (address) that identifies the escrow contract                  |
| <pre><code>disputeResolver
</code></pre> | string | Address of the user defined to resolve disputes in an escrow      |
| <pre><code>approverFunds
</code></pre>   | string | Amount to transfer to the approver for dispute resolution         |
| <pre><code>receiverFunds
</code></pre>   | string | Amount to transfer to the service provider for dispute resolution |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"disputeResolver": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP", 
	"approverFunds": "100",
	"receiverFunds": "50"
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{    
    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
}
```
{% endtab %}

{% tab title="500 Server Error " %}
<mark style="color:red;">**Only the dispute resolver**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Only the dispute resolver can execute this function"
}
```

<mark style="color:red;">**Escrow not in dispute**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Escrow not in dispute"
}
```

<mark style="color:red;">**Insufficient approver funds for commissions**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Insufficient approver funds for commissions"
}
```

<mark style="color:red;">**Insufficient service provider funds for commissions**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Insufficient Service Provider funds for commissions"
}
```

<mark style="color:red;">**500**</mark>

```json
{
  "status": "500"
  "messgae": "An unexpected error occurred"
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
      "/escrow/resolving-disputes",
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
