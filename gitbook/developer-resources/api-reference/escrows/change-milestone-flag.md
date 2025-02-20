---
icon: thumbs-up
description: >-
  Responsible for modifying the "flag" property of a specific milestone in the
  escrow to approve that milestone.
---

# Change Milestone Approved Flag

<mark style="color:green;">**`POST`**</mark> `escrow/change-milestone-approved-flag`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name           | Type    | Description                                                                         |
| -------------- | ------- | ----------------------------------------------------------------------------------- |
| contractId     | string  | ID (address) that identifies the escrow contract                                    |
| milestoneIndex | string  | Position that identifies the milestone within the group of milestones in the escrow |
| newFlag        | boolean | New value for the "flag" property within the escrow milestone                       |
| client         | string  | Address of the client who will approve the milestone                                |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
	"contractId": "GC3DJY4LLQYJHEONXFDLQVVRCFZQCPFX7VD33KP4P7QSVZY3SJHQBZGV",
	"milestoneIndex": "0", 
	"newFlag": true,
	"client": "GBY3PAJY5R3ZIXTYBGFW4URB4RINEXQBC3T4RWDDKJ5TZXQYZUN6A4TP"
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
<mark style="color:red;">**Not Found**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Escrow not found"
}
```

<mark style="color:red;">**Only the approver can change the**</mark>&#x20;

```json
{
  "status": "FAILED"
  "messgae": "Only the approver can change milestone flag"
}
```

<mark style="color:red;">**No milestones defined**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Escrow initialized without milestone"
}
```

<mark style="color:red;">**Invalid milestone index**</mark>

```json
{
  "status": "FAILED"
  "messgae": "Invalid milestone index"
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
  baseURL: "http://localhost:3000",
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
      "/escrow/change-milestone-approved-flag",
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
