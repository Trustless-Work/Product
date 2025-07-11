---
description: Deploy the escrow contract and define the escrow properties.
icon: circle-plus
---

# Deploy

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr></tbody></table>

### Milestone

| Name         | Type                             | Description                                                           |
| ------------ | -------------------------------- | --------------------------------------------------------------------- |
| description  | string                           | Text describing the function of the milestone                         |
| status       | string (Default value: "peding") | Milestone status. Ex: Approved, In dispute, etc...                    |
| approvedFlag | boolean (Default value: false)   | Flag indicating whether a milestone has been approved by the approver |

### Roles:

| Name             | Type   | Description                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------ |
| approver         | string | Address of the entity requiring the service.                                         |
| serviceProvider  | string | Address of the entity providing the service.                                         |
| plataformAddress | string | Address of the entity that owns the escrow                                           |
| releaseSigner    | string | Address of the user in charge of releasing the escrow funds to the service provider. |
| disputeResolver  | string | Address in charge of resolving disputes within the escrow.                           |
| receiver         | string | Address where escrow proceeds will be sent to                                        |

### Trustline:

| Name     | Type   | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| address  | string | Public address establishing permission to accept and use a specific token. |
| decimals | number | Number of decimals into which the token is divided.                        |

### Initialize Escrow

{% openapi-operation spec="trustless-work-api-dev" path="/deployer/single-release" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}

### **What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.

### Use Example:

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
</strong>      "/deployer/single-release",
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
