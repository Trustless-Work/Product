---
icon: books
---

# Schema

In this section you will be able to see the outline of the types of escrow's that Trustless Work offers. With these diagrams you will be able to know the structure and properties of an escrow both in its Single-Release and Multi-Release versions.

## Single Release Escrow Schema

#### Escrow body:

| Key          | Type              | Description                                                                   |
| ------------ | ----------------- | ----------------------------------------------------------------------------- |
| engagementId | string            | Unique identifier for the escrow                                              |
| title        | string            | Name of the escrow                                                            |
| roles        | Roles Object      | Roles that make up the escrow structure                                       |
| description  | string            | Text describing the function of the escrow                                    |
| amount       | number            | Amount to be transferred upon completion of escrow milestones                 |
| plataformFee | number            | Commission that the platform will receive when the escrow is completed        |
| milestones   | Milestone\<Array> | Objectives to be completed to define the escrow as completed                  |
| flags        | Flags Object      | Flags validating certain escrow life states                                   |
| trustline    | Trustline Object  | Information on the trustline that will manage the movement of funds in escrow |

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

| Name        | Type              | Description                                                            |
| ----------- | ----------------- | ---------------------------------------------------------------------- |
| description | string            | Text describing the function of the milestone.                         |
| status      | string            | Milestone status. Ex: Approved, In dispute, etc...                     |
| evidence    | string (optional) | Evidence of work performed by the service provider.                    |
| approved    | boolean           | Flag indicating whether a milestone has been approved by the approver. |

#### Flags:

| Name     | Type    | Description                                                       |
| -------- | ------- | ----------------------------------------------------------------- |
| disputed | boolean | Flag indicating that an escrow is in dispute.                     |
| released | boolean | Flag indicating that escrow funds have already been released.     |
| resolved | boolean | Flag indicating that a disputed escrow has already been resolved. |

#### Trustline:

| Name    | Type   | Description                                                                |
| ------- | ------ | -------------------------------------------------------------------------- |
| address | string | Public address establishing permission to accept and use a specific token. |

### Single Release Escrow Flow:

<figure><img src="../../../.gitbook/assets/Single Release Flow.png" alt=""><figcaption></figcaption></figure>

## Multi Release Escrow Schema

| Key          | Type              | Description                                                                   |
| ------------ | ----------------- | ----------------------------------------------------------------------------- |
| engagementId | string            | Unique identifier for the escrow                                              |
| title        | string            | Name of the escrow                                                            |
| description  | string            | Text describing the function of the escrow                                    |
| roles        | Roles Object      | Roles that make up the escrow structure                                       |
| plataformFee | number            | Commission that the platform will receive when the escrow is completed        |
| milestones   | Milestone\<Array> | Objectives to be completed to define the escrow as completed                  |
| trustline    | Trustline Object  | Information on the trustline that will manage the movement of funds in escrow |

#### Roles:

| Name             | Type   | Description                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------ |
| approver         | string | Address of the entity requiring the service.                                         |
| serviceProvider  | string | Address of the entity providing the service.                                         |
| plataformAddress | string | Address of the entity that owns the escrow                                           |
| releaseSigner    | string | Address of the user in charge of releasing the escrow funds to the service provider. |
| disputeResolver  | string | Address in charge of resolving disputes within the escrow.                           |

#### Milestone:

| Name        | Type              | Description                                                    |
| ----------- | ----------------- | -------------------------------------------------------------- |
| description | string            | Text describing the function of the milestone.                 |
| status      | string            | Milestone status. Ex: Approved, In dispute, etc...             |
| flags       | Flags Object      | Flags validating certain escrow life states.                   |
| evidence    | string (optional) | Evidence of work performed by the service provider.            |
| amount      | number            | Amount to be transferred upon completion of escrow milestones. |
| receiver    | string            | Address where escrow proceeds will be sent to                  |

#### Flags:

| Name     | Type    | Description                                                            |
| -------- | ------- | ---------------------------------------------------------------------- |
| disputed | boolean | Flag indicating that an escrow is in dispute.                          |
| released | boolean | Flag indicating that escrow funds have already been released.          |
| resolved | boolean | Flag indicating that a disputed escrow has already been resolved.      |
| approved | boolean | Flag indicating whether a milestone has been approved by the approver. |

#### Trustline:

| Name     | Type   | Description                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------- |
| address  | string | Public address establishing permission to accept and use a specific token.             |
| decimals | number | Number of decimals into which the token is divided.                                    |
| symbol   | string | Official abbreviation representing the token in wallets, exchanges, and documentation. |

### Multi Release Escrow Flow:

<figure><img src="../../../.gitbook/assets/Multi Release Flow.png" alt=""><figcaption></figcaption></figure>
