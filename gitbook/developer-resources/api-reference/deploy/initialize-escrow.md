---
icon: circle-plus
description: Deploy the escrow contract and define the escrow properties.
---

# Initialize Escrow

<mark style="color:green;">**`POST`**</mark> `deployer/invoke-deployer-contract`

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

### Body params:

| Name            | Type               | Description                                                                                                                           |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| signer          | string             | Entity that signs the transaction that deploys and initializes the escrow engagementId: Unique identifier for the escrow              |
| engagementId    | string             | ID that the user who created the escrow wants to define to it                                                                         |
| title           | string             | Name of the escrow                                                                                                                    |
| description     | string             | Text describing the function of the escrow                                                                                            |
| approver        | string             | Address of the entity requiring the service                                                                                           |
| serviceProvider | string             | Address of the entity providing the service                                                                                           |
| platformAddress | string             | Address of the platform that owns the escrow                                                                                          |
| amount          | string             | Amount to be transferred upon completion of escrow milestones                                                                         |
| plataformFee    | string             | Commission that the platform will receive when the escrow is completed                                                                |
| milestones      | Milestones\<Array> | Objectives to be completed to define the escrow as completed releaseSigner: Address of the entity in charge of releasing escrow funds |
| disputeResolver | string             | Address in charge of resolving disputes within the escrow                                                                             |
| releaseSigner   | string             | Address of the user in charge of releasing the escrow funds to the service provider.                                                  |

#### Milestone

| Name           | Type    | Description                                                           |
| -------------- | ------- | --------------------------------------------------------------------- |
| description    | string  | Text describing the function of the milestone                         |
| status         | string  | Milestone status. Ex: Approved, In dispute, etc...                    |
| approved\_flag | boolean | Flag indicating whether a milestone has been approved by the approver |

#### Example:

```jsx
{
	signer: "GAD4T6Z63N5NJLQYY3J5MVYFHH5I5UB7NDUUYZD7HHB3RMS6X3H4YK7P", 
	engagementId: "ENG12345",
	title: "Project Title",
	description: "This is a detailed description of the project.",
	approver: "GAHJZHVKFLATA7RVGXSFKXAKT5H4RXJ4LU2UR2W2IDFXOJQ2BR7RHW62",
	serviceProvider: "GDWPCWWH7IXQJHDF7FJUI7VOGD5IT72T7YX55F4BR2H4WXFRBVMBK6A3", 
	platformAddress: "GBC5DVYUBTBSXJ3ZMRPGXDDDLKTALIFGRW73B33AF5EFSZBUECKSFO4R",
	amount: "1000.00",
	platformFee: "50.00", 
	milestones: [
		{ description: "Initial phase of the project", status: "Pending", approved_flag: false },
		{ description: "Completion of design work", status: "Pending", approved_flag: false }
	],
	releaseSigner: "GBDKXCG6FHJMTUBWGAVVOD5PB5QXLYTRJGCH4NR4IMJVPXHHTBBXPY3V",
	disputeResolver: "GDJVCNR5GPOJH7XMOVMHBKZV7V7WQ3B7QK75C76HLOBD4AKHFG5OCARJ"
};
```



**Possible Responses**

{% tabs %}
{% tab title="201 Created" %}
```json
{
    "status": "SUCCESS",
    "unsignedTransaction": "AAAAAgAAAABfQAm/gS..."  // XDR Hash Transaction
}
```
{% endtab %}

{% tab title="500 Server Error" %}
<mark style="color:red;">**Prices**</mark>

```json
{
  "status": "FAILED",
  "message": "Amount cannot be zero"
}
```

<mark style="color:red;">**Escrow already initialized**</mark>

```javascript
{
  "status": "FAILED",
  "message": "Escrow already initialized"
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

#### Use example (Using axios):

<pre class="language-typescript"><code class="lang-typescript">import axios from "axios";

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

    // Execute the endpoint
<strong>    const response = await http.post(
</strong>      "/deployer/invoke-deployer-contract",
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
      returnEscrowDataIsRequired: true,
    });

    const { data } = tx;

    return data; 
}
</code></pre>
