---
icon: square-dollar
---

# Withdraw Remaining Funds

This function is used to withdraw funds that are stuck in escrow and cannot be withdrawn due to the way multi-release escrow works, since disputes in this case are handled at the milestone level.

In single-release escrow accounts, this endpoint is not necessary because disputes are handled at the escrow account level, so if there is any remaining balance in the contract, a dispute is opened and the remaining balance is withdrawn.

### Headers

<table><thead><tr><th width="366">Name</th><th>Value</th></tr></thead><tbody><tr><td>Content-Type</td><td><code>application/json</code></td></tr><tr><td>x-api-key</td><td><code>&#x3C;token></code></td></tr></tbody></table>

### Open API

{% openapi-operation spec="trustless-work-api-dev" path="/escrow/multi-release/withdraw-remaining-funds" method="post" %}
[OpenAPI trustless-work-api-dev](https://dev.api.trustlesswork.com/api-yaml)
{% endopenapi-operation %}

### **What this Endpoint returns?**

This endpoint returns the transaction unsigned so that the transaction can be signed by means of a customer wallet.

### Use Example:

```typescript
import axios from "axios";

const http = axios.create({
  baseURL: "https://dev.api.trustlesswork.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": your_api_key,
  },
});

export const useExample = async () => {
    // Get the signer address
    const { address } = await kit.getAddress();

    const response = await http.post(
      "/escrow/multi-release/withdraw-remaining-funds",
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
