---
description: In this section, you'll see all the attributes of the Escrow Entity.
icon: books
---

# Schema

#### Escrow:

| Key          | Type                     | Description                                                                                                                                                                                                                              |
| ------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| engagementId | string                   | Unique identifier for the escrow                                                                                                                                                                                                         |
| signer       | string \| Address Wallet | Address of the user signing the contract transaction                                                                                                                                                                                     |
| contractId   | string                   | ID (address) that identifies the escrow contract                                                                                                                                                                                         |
| title        | string                   | Name of the escrow                                                                                                                                                                                                                       |
| description  | string                   | Text describing the function of the escrow                                                                                                                                                                                               |
| roles        | Roles Object             | Roles that make up the escrow structure                                                                                                                                                                                                  |
| amount       | string                   | Amount to be transferred upon completion of escrow milestones                                                                                                                                                                            |
| plataformFee | string                   | Commission that the platform will receive when the escrow is completed                                                                                                                                                                   |
| milestones   | Milestone\<Array>        | Objectives to be completed to define the escrow as completed                                                                                                                                                                             |
| flags        | Flags Object             | Flags validating certain escrow life states                                                                                                                                                                                              |
| trustline    | Trustline Object         | Information on the trustline that will manage the movement of funds in escrow                                                                                                                                                            |
| receiverMemo | number (optional)        | Field used to identify the recipient's address in transactions through an intermediary account. This value is included as a memo in the transaction and allows the funds to be correctly routed to the wallet of the specified recipient |
| balance      | number                   | Amount of the token (XLM, USDC, EURC, etc) in the smart contract.                                                                                                                                                                        |

#### Roles:

| Name             | Type   | Description                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------ |
| approver         | string | Address of the entity requiring the service.                                         |
| serviceProvider  | string | Address of the entity providing the service.                                         |
| plataformAddress | string | Address of the entity that owns the escrow                                           |
| releaseSigner    | string | Address of the user in charge of releasing the escrow funds to the service provider. |
| disputeResolver  | string | Address in charge of resolving disputes within the escrow.                           |
| receiver         | string | Address where escrow proceeds will be sent to                                        |

#### Milestone:

| Name         | Type              | Description                                                            |
| ------------ | ----------------- | ---------------------------------------------------------------------- |
| description  | string            | Text describing the function of the milestone.                         |
| status       | string            | Milestone status. Ex: Approved, In dispute, etc...                     |
| approvedFlag | boolean           | Flag indicating whether a milestone has been approved by the approver. |
| evidence     | string (optional) | Evidence of work performed by the service provider.                    |

#### Flags:

| Name         | Type    | Description                                                       |
| ------------ | ------- | ----------------------------------------------------------------- |
| disputeFlag  | boolean | Flag indicating that an escrow is in dispute.                     |
| releaseFlag  | boolean | Flag indicating that escrow funds have already been released.     |
| resolvedFlag | boolean | Flag indicating that a disputed escrow has already been resolved. |

#### Trustline:

| Name     | Type   | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| address  | string | Public address establishing permission to accept and use a specific token. |
| decimals | number | Number of decimals into which the token is divided.                        |

### Escrow flow:

<figure><img src="../.gitbook/assets/Escrow_Schema.png" alt=""><figcaption></figcaption></figure>
