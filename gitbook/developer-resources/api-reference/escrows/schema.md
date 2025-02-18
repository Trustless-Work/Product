---
description: In this section, you'll see all the attributes of the Escrow Entity.
---

# Schema

#### Escrow:

| Key               | Type                     | Description                                                                                                                            |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| engagementId      | string                   | The unique identifier linking this escrow to a specific project or transaction.                                                        |
| contractId        | string                   | The unique identifier of the contract.                                                                                                 |
| title             | string                   | Name of the escrow.                                                                                                                    |
| description       | string                   | Text describing the function of the escrow.                                                                                            |
| approver          | string \| Address Wallet | Address of the entity requiring the service.                                                                                           |
| service\_provider | string \| Address Wallet | Address of the entity providing the service.                                                                                           |
| amount            | number \| u128           | Amount to be transferred upon completion of escrow milestones.                                                                         |
| plataform\_fee    | number \| u128           | Commission that the platform will receive when the escrow is completed.                                                                |
| milestones        | Milestone\<Array>        | Objectives to be completed to define the escrow as completed releaseSigner: Address of the entity in charge of releasing escrow funds. |
| release\_signer   | string \| Address Wallet | Address of the entity authorized to release escrow funds.                                                                              |
| dispute\_resolver | string \| Address Wallet | Address in charge of resolving disputes within the escrow.                                                                             |
| dispute\_flag     | boolean                  | Flag indicating that an escrow is in dispute.                                                                                          |
| release\_flag     | boolean                  | Flag indicating that escrow funds have already been released.                                                                          |
| resolved\_flag    | boolean                  | Flag indicating that a disputed escrow has already been resolved.                                                                      |
| trustline         | string \| Address Wallet | Address of the token that will be used in the escrow to manage the USDC and its movements.                                             |

#### Milestone:

| Name           | Type    | Description                                                            |
| -------------- | ------- | ---------------------------------------------------------------------- |
| description    | string  | Text describing the function of the milestone.                         |
| status         | string  | Milestone status. Ex: Approved, In dispute, etc...                     |
| approved\_flag | boolean | Flag indicating whether a milestone has been approved by the approver. |

### Escrow flow:

<figure><img src="../../../.gitbook/assets/Escrow_Schema.png" alt=""><figcaption></figcaption></figure>
