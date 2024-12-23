---
description: In this section, you'll see all the attributes of the Escrow Entity.
---

# Schema

| Key             | Type                     | Description                                                                     |
| --------------- | ------------------------ | ------------------------------------------------------------------------------- |
| engagementId    | string                   | The unique identifier linking this escrow to a specific project or transaction. |
| contractId      | string                   | The unique identifier of the contract.                                          |
| issuer          | string \| Address Wallet | The address of the party that created the escrow contract.                      |
| signer          | string \| Address Wallet | The address authorized to approve the release of funds.                         |
| serviceProvider | string \| Address Wallet | The address of the entity receiving the payment.                                |
| amount          | number \| u128           | The amount pacted (price of product/service).                                   |
| balance         | number \| u128           | The amount currently in the contract.                                           |
| cancelled       | boolean                  | If the escrow is already cancelled                                              |
| completed       | boolean                  | If the escrow is already completed                                              |
| description     | string                   | A brief summary or metadata describing the scope of the service/product.        |

