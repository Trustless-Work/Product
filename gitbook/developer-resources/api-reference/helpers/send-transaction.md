---
icon: comment-arrow-up-right
description: >-
  Most Trustless Work endpoints return an unsigned transaction in XDR format.
  This endpoint is used to sign such unsigned transactions and send them to the
  Stellar network.
---

# Send Transaction

<mark style="color:green;">**`POST`**</mark> `helper/send-transaction`

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name                             | Type    | Description                                                                                           |
| -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| signedXdr                        | string  | The sign's hash. This come from the wallet.                                                           |
| returnValueIsRequired (Optional) | boolean | If a return escrow data is needed (Note that not all contract functions return data from an escrow.). |

**Example of Request Body:**

{% code overflow="wrap" fullWidth="false" %}
```json
{
  "signedXdr": "AAAAAgAAAAB...",
  "returnValueIsRequired": true,
}
```
{% endcode %}

**Possible Responses**

{% tabs %}
{% tab title="200 OK" %}
```json
{
    "status": "SUCCESS",
    "message": "The transaction has been successfully sent to the Stellar network"
}
```
{% endtab %}

{% tab title="500 Server Error" %}
```json
{
    "status": "FAILED",
    "message": "The transaction could not be sent to the Stellar network for some unknown reason. Please try again."
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

#### Example of how to use this endpoint:

```typescript
import { FundEscrowPayload } from "@/@types/escrow.entity";
import http from "@/core/config/axios/http";
import { kit } from "@/components/modules/auth/wallet/constants/wallet-kit.constant";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { signTransaction } from "@stellar/freighter-api";
import axios from "axios";

export const fundEscrow = async (payload: FundEscrowPayload) => {
  try {
    const response = await http.post("/escrow/fund-escrow", payload);

    const { unsignedTransaction } = response.data;
    const { address } = await kit.getAddress();
    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error in Axios request",
      );
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
```
