---
description: In this section, you'll see all the attributes of the Escrow Entity.
---

# Schema

#### Escrow:

| Key             | Type                     | Description                                                                                |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| engagementId    | string                   | Unique identifier for the escrow                                                           |
| signer          | string \| Address Wallet | Address of the user signing the contract transaction                                       |
| contractId      | string                   | ID (address) that identifies the escrow contract                                           |
| title           | string                   | Name of the escrow                                                                         |
| description     | string                   | Text describing the function of the escrow                                                 |
| approver        | string \| Address Wallet | Address of the entity requiring the service                                                |
| serviceProvider | string \| Address Wallet | Address of the entity providing the service                                                |
| amount          | string                   | Amount to be transferred upon completion of escrow milestones                              |
| plataformFee    | string                   | Commission that the platform will receive when the escrow is completed                     |
| milestones      | Milestone\<Array>        | Objectives to be completed to define the escrow as completed                               |
| releaseSigner   | string \| Address Wallet | Address of the user in charge of releasing the escrow funds to the service provider        |
| disputeResolver | string \| Address Wallet | Address in charge of resolving disputes within the escrow                                  |
| disputeFlag     | boolean                  | Flag indicating that an escrow is in dispute                                               |
| releaseFlag     | boolean                  | Flag indicating that escrow funds have already been released                               |
| resolvedFlag    | boolean                  | Flag indicating that a disputed escrow has already been resolved                           |
| trustline       | string \| Address Wallet | Address of the token that will be used in the escrow to manage the USDC and its movements. |

#### Milestone:

| Name         | Type    | Description                                                            |
| ------------ | ------- | ---------------------------------------------------------------------- |
| description  | string  | Text describing the function of the milestone.                         |
| status       | string  | Milestone status. Ex: Approved, In dispute, etc...                     |
| approvedFlag | boolean | Flag indicating whether a milestone has been approved by the approver. |

### Escrow flow:

<figure><img src="../../../.gitbook/assets/Escrow_Schema.png" alt=""><figcaption></figcaption></figure>
