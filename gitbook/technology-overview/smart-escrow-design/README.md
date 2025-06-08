# Smart Escrow Design

<figure><img src="../../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

A **Smart Escrow** is a programmable contract that defines:

* Who can take action
* When funds can move
* Under what conditions milestones are met

Trustless Work escrows are built to be flexible — you define the **roles**, **milestones**, and **release logic**, and we handle the rest.

***

### 🔧 What You Define in Each Escrow

Every escrow requires a few key pieces of data:

| Field             | Description                                     |
| ----------------- | ----------------------------------------------- |
| `receiver`        | Final recipient of funds                        |
| `amount`          | Total value locked in the escrow                |
| `releaseSigner`   | Who signs off on fund release                   |
| `milestoneMarker` | Who marks work as done                          |
| `approver`        | Who approves work                               |
| `disputeResolver` | Who can resolve disputes                        |
| `platform`        | address for commission fee                      |
| `milestones`      | Description, status, amounts per milestone      |
| `status`          | Current status (draft, funded, in review, etc.) |

→ See the [full schema](../../developer-resources/api-reference/escrows/schema.md)



***

### 🔐 Role-Driven Logic

Your escrow flow is powered by who has permission to take each action:

| Action                | Role                         |
| --------------------- | ---------------------------- |
| Initialize escrow     | Any user or platform         |
| Fund escrow           | Client or third-party        |
| Mark milestone        | `milestoneMarker`            |
| Approve milestone     | `approver` (optional)        |
| Release funds         | `releaseSigner`              |
| Raise/resolve dispute | `disputeResolver` (optional) |

→ Learn More About [Roles](../roles-in-trustless-work.md)

***

### ⚙️ Flexible By Design

This model supports:

* 💼 Platform-controlled flows
* 🤝 Peer-to-peer agreements
* 🤖 Agent-based automation

Escrows can be single or multi-release. Each can have as many milestones as needed.

***
