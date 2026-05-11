---
description: We don’t hold your money—we hold the logic.
icon: layer-group
---

# Escrow Design

Trustless Work escrows are programmable trust primitives. They allow platforms, marketplaces, applications, and organizations to define how funds should be held, updated, approved, and released between different parties.\
\
An escrow is not only a place where funds sit.

It is a coordination layer between:

* parties
* funds
* roles
* milestones
* status updates
* approvals
* release conditions
* platform fees
* dispute or exception flows

Before creating an escrow, the most important question is:

> Who must do what before money can move?

If you can answer that clearly, you can design a good escrow.

***

### The Escrow Design Mental Model

Before choosing an escrow type or calling the API, map the transaction.

Start with four questions:

1. **Who are the parties involved?**
2. **Where are the funds moving?**
3. **Who has permission to update, approve, and release?**
4. **What conditions must be met before funds are released?**

This is the foundation of escrow design.

Trustless Work gives you the infrastructure to turn that logic into a smart escrow.

***

### Step 1: Map the Parties

Every escrow involves parties.

Some parties fund the escrow.\
Some perform work.\
Some update status.\
Some approve completion.\
Some resolve disputes.\
Some release funds.\
Some receive funds.\
Some receive platform fees.

Common roles include:

| Party                               | What they represent                                                    |
| ----------------------------------- | ---------------------------------------------------------------------- |
| Receiver                            | The party that receives funds after release                            |
| Service Provider / Milestone Marker | The party that updates progress or marks work as completed             |
| Approver                            | The party that validates whether a milestone or condition has been met |
| Release Signer                      | The party that signs or triggers the release of funds                  |
| Platform Address                    | Can make changes before escrow is funded and receives the platform fee |
| Dispute Resolver                    | Arbitrates disputes and can re-route funds when a dispute is raised    |

Roles are assigned to addresses.

Only the address assigned to a role can perform the actions allowed for that role.

The same real-world person, organization, or wallet can sometimes hold multiple roles, but role combinations should be intentional.

For example, a freelancer may be both the **Receiver** and the **Service Provider**, but they usually should not also be the **Approver** of their own work.

***

### Step 2: Map Fund Direction

Next, map how funds should move.

The fund direction should answer:

> Who funds the escrow, and who should receive funds after the right conditions are met?

### Pattern 1: Marketplace Payment

Use case: **Single-release escrow**

A buyer hires or purchases from a seller, freelancer, or service provider. The buyer funds the escrow. The service provider delivers the work or product. The approver validates completion. Then funds are released once.

```txt
Buyer / Client
    → funds escrow
        → Seller / Service Provider receives one final payout
```

### Pattern 2: Project Milestones

Use case: **Multi-release escrow, same receiver**

A client funds a project that has multiple milestones. The same service provider receives payments progressively as each milestone is completed and approved.

```
Client
    → funds escrow
        → Milestone 1 payout to same receiver
        → Milestone 2 payout to same receiver
        → Milestone 3 payout to same receiver
```

### Pattern 3: Payouts

Use case: **Multi-release escrow, multiple receivers**

A sponsor, platform, or organization funds one escrow that needs to pay different people or entities across different milestones.

```
Sponsor / Platform
    → funds escrow
        → Milestone 1 payout to Receiver A
        → Milestone 2 payout to Receiver B
        → Milestone 3 payout to Receiver C
```

***

### Step 3: Separate Status, Approval, and Release

A common mistake is treating status updates, approvals, and fund releases as the same thing.

In Trustless Work, these should be understood separately:

| Concept  | Meaning                                  |
| -------- | ---------------------------------------- |
| Status   | Communication about progress             |
| Approval | Validation that a condition has been met |
| Release  | Execution of the payment                 |

#### Status = Communication

A status update tells the other parties what is happening.

Examples:

* work started
* paperwork submitted
* shipment in transit
* delivery completed
* milestone ready for review
* evidence uploaded

The Service Provider or Milestone Marker usually updates the milestone status.

Status updates can happen many times before a milestone reaches its final expected state.

#### Approval = Validation

Approval means an authorized party has validated that the agreed condition was met.

For example:

* the client approves the work
* the grant reviewer approves the deliverable
* the buyer confirms the shipment arrived
* the platform approves submitted evidence

The Approver does not simply report progress. The Approver validates completion.

#### Release = Execution

Release is when funds actually move out of the escrow.

The Release Signer can only release funds after the required approval conditions have been satisfied.

This creates a clear logic chain:

```
Status update / evidence    → Approval        → Release
```

***

### Important Edge Case: Approval Can Happen Before Status Update

In some flows, an Approver may approve a milestone before the Service Provider updates the milestone status.

This means your escrow design should not assume that status always comes before approval.

Instead, treat status and approval as related but separate pieces of state.

The release condition should depend on the required approval logic, not only on a text status.

***

### Step 4: Assign Roles

Every Trustless Work escrow includes a role configuration. Roles determine which address can perform which action.

Current core roles include:

| Role             | Main responsibility                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Service Provider | Updates milestone status and progress                                                             |
| Approver         | Validates milestone completion                                                                    |
| Platform Address | Can receive platform fees and may manage configuration before funding depending on implementation |
| Release Signer   | Executes fund release after approval conditions are met                                           |
| Dispute Resolver | Handles disputes or exception flows when flagged                                                  |
| Receiver         | Receives released funds                                                                           |
| Issuer           | He who deploys the contract. Has no powers over the contract                                      |
| Depositor        | Funds the escrow but does not automatically receive contract permissions                          |
| Observer         | Coming in a future version; tracks escrows without acting on them                                 |

Roles are assigned to addresses.

Only the address assigned to a role can perform the actions allowed for that role.

***

### Role Capability Overview



| Role             | Can update status? |  Can approve? | Can raise dispute? | Can resolve dispute? | Can release funds? | Receives funds? | Notes                                    |
| ---------------- | -----------------: | ------------: | -----------------: | -------------------: | -----------------: | --------------: | ---------------------------------------- |
| Service Provider |                Yes |            No |                Yes |                   No |                 No |              no | Updates milestone progress               |
| Approver         |        No required |           Yes |                Yes |                   No |                 No |              no | Validates milestone completion           |
| Platform Address |     Before funding | No by default |      No by default |        No by default |      No by default |   Fee recipient | Can make changes before escrow is funded |
| Release Signer   |        No required |   No required |                 No |                   No |                Yes |              no | Releases only when conditions allow      |
| Dispute Resolver |        No required | Case-specific |        No required |                  Yes |      Case-specific |              No | Arbitrates and can re-route funds        |
| Receiver         |      No by default |    Usually no |      No by default |                   No |                 No |             Yes | Final destination of released funds      |
| Issuer           |                 No |            No |                 No |                   No |                 No |              No | Has no powers over the contract          |
| Depositor        |                 No |            No |                 No |                   No |                 No |              No | Incoming transactions are indexed        |
| Observer         |                 No |            No |                 No |                   No |                 No |              No | Future tracking role                     |

***

### Step 5: Define Escrow Properties

Roles are only part of the escrow design.

An escrow also includes properties that describe what the escrow is, how it should be indexed, what asset is used, and what state it is in.

Common escrow properties include:

| Property                     | Description                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Escrow ID / Contract Address | On-chain identifier of the escrow contract. Also used as the deposit address                                         |
| Engagement ID                | Configurable external identifier used to connect the escrow with an invoice, order, project, or external system      |
| Title                        | Human-readable title of the escrow                                                                                   |
| Description                  | Explanation of why the escrow exists                                                                                 |
| Roles                        | Addresses assigned to permissions such as status updates, approvals, releases, dispute resolution, and fee reception |
| Milestones                   | Actions, deliverables, or conditions that must be completed                                                          |
| Amount                       | Total amount locked or expected in the escrow                                                                        |
| Platform Fee                 | Optional configurable fee for the platform or application                                                            |
| Trustline / Asset            | The asset used in the escrow, such as USDC or another Stellar-issued token                                           |
| Flags                        | State indicators such as disputed, released, or resolved                                                             |

These properties help platforms connect the on-chain escrow with real-world workflows.

***

### Step 6: Choose Your Escrow Type

Trustless Work currently supports two main escrow types:

1. **Single-Release Escrow**
2. **Multi-Release Escrow**

Both use the same core idea: funds are held until defined conditions are met.

The difference is how funds are released.

***

### Single-Release Escrow

A Single-Release Escrow releases funds once.

It can contain multiple milestones, but all required milestones must be approved before the final release happens.

Typical structure:

```
Payer → Escrow → Receiver
```

Typical flow:

```
Create escrow
Fund escrow
Update milestone 1
Approve milestone 1
Update milestone 2
Approve milestone 2
Release full amount
Close escrow
```

Best for:

* deposits
* one-off jobs
* simple deliveries
* full project completion
* marketplace purchases
* final delivery before payment

Key characteristics:

| Dimension       | Single-Release Escrow                                   |
| --------------- | ------------------------------------------------------- |
| Release pattern | One final payout                                        |
| Milestones      | Can have multiple milestones                            |
| Receiver        | Usually one receiver                                    |
| Approval logic  | All required milestones must be approved before release |
| Complexity      | Lower                                                   |

***

### Multi-Release Escrow

A Multi-Release Escrow releases funds progressively.

Each milestone can have its own payout, and each payout can potentially go to a different receiver.

Typical structure:

```
Payer → Escrow → Milestone 1 Receiver
              → Milestone 2 Receiver
              → Milestone 3 Receiver
```

Typical flow:

```
Create escrow
Fund escrow
Update milestone 1
Approve milestone 1
Release milestone 1 funds
Update milestone 2
Approve milestone 2
Release milestone 2 funds
Close escrow
```

Best for:

* grants
* bounties
* milestone-based funding
* phased projects
* contributor payments
* multi-vendor projects
* long-running service agreements

Key characteristics:

| Dimension       | Multi-Release Escrow                      |
| --------------- | ----------------------------------------- |
| Release pattern | Multiple payouts                          |
| Milestones      | Each milestone can have its own release   |
| Receiver        | Can support multiple receivers            |
| Approval logic  | Each milestone can be approved separately |
| Complexity      | Higher                                    |

***

### Single-Release vs Multi-Release

| Question                                            | Use Single-Release | Use Multi-Release |
| --------------------------------------------------- | ------------------ | ----------------- |
| Do funds release once or progressively?             | Once               | Progressively     |
| Are there multiple receivers?                       | Usually no         | Often yes         |
| Does each milestone need its own payout?            | No                 | Yes               |
| Should all milestones be approved before payment?   | Yes                | Not necessarily   |
| Is the workflow simple?                             | Yes                | More complex      |
| Is the workflow grant-like, bounty-like, or phased? | Sometimes          | Usually           |

***

### Step 7: Understand The Lifecycle

The escrow lifecycle describes how an escrow moves from configuration to completion.

Canonical lifecycle:

```
Design
  → Initiation
    → Funding
      → Milestone Updates
        → Approval
          → Release
            → Closure
```

#### 1. Design

Map parties, fund direction, roles, milestones, release conditions, and escrow type.

#### 2. Initiation

Create and configure the escrow.

This includes:

* roles
* milestones
* amount
* asset
* receiver
* platform fee
* engagement ID
* metadata

#### 3. Funding

The payer deposits funds into the escrow.

Possible funding states include:

* unfunded
* partially funded
* fully funded

#### 4. Milestone Updates

The Service Provider or Milestone Marker updates the milestone status.

This creates visibility into progress.

#### 5. Approval

The Approver validates whether the milestone condition was met.

Approval is the key validation step before release.

#### 6. Release

The Release Signer executes the release of funds after approval conditions are met.

In a Single-Release Escrow, this usually happens once.

In a Multi-Release Escrow, this can happen milestone by milestone.

#### 7. Closure

The escrow reaches a terminal state.

Possible terminal states include:

* completed
* cancelled
* refunded
* disputed
* resolved

***

### Design Checklist

Before creating an escrow, answer these questions:

* Who funds the escrow?
* Who receives funds?
* Is there one receiver or multiple receivers?
* Who updates milestone status?
* Who approves milestone completion?
* Who signs the release?
* Is payment released once or by milestone?
* What asset is used?
* What platform fee applies?
* What external system should this escrow connect to?
* What happens if a milestone is not approved?
* What happens if the wrong party is assigned a role?
* Does this use case require dispute resolution?

***

### Example: Marketplace Service Payment

A client wants to pay a freelancer after a project is completed.

Suggested design:

| Element          | Example                                                         |
| ---------------- | --------------------------------------------------------------- |
| Payer            | Client                                                          |
| Receiver         | Freelancer                                                      |
| Service Provider | Freelancer                                                      |
| Approver         | Client                                                          |
| Release Signer   | Client or platform-controlled signer                            |
| Platform Address | Marketplace fee address                                         |
| Escrow Type      | Single-Release or Multi-Release depending on project complexity |

Simple version:

```
Client funds escrow
Freelancer completes work
Freelancer marks milestone as completed
Client approves
Release signer releases funds to freelancer
Marketplace receives fee
```

***

### Example: Grant Tranche Payment

A foundation wants to release funding progressively after deliverables are completed.

Suggested design:

| Element          | Example                             |
| ---------------- | ----------------------------------- |
| Payer            | Foundation or sponsor               |
| Receiver         | Grantee                             |
| Service Provider | Grantee                             |
| Approver         | Grant reviewer or committee         |
| Release Signer   | Foundation signer or program signer |
| Platform Address | Program fee address                 |
| Escrow Type      | Multi-Release                       |

Simple version:

```
Foundation funds escrow
Grantee submits deliverable 1
Reviewer approves deliverable 1
Release signer releases tranche 1
Grantee submits deliverable 2
Reviewer approves deliverable 2
Release signer releases tranche 2
```

***

### Example: Security Deposit

A renter deposits funds that should be held until the rental condition is complete.

Suggested design:

| Element          | Example                                                 |
| ---------------- | ------------------------------------------------------- |
| Payer            | Renter                                                  |
| Receiver         | Renter, landlord, or both depending on outcome          |
| Service Provider | Property manager or platform                            |
| Approver         | Property manager, landlord, renter, or neutral reviewer |
| Release Signer   | Platform-controlled signer or agreed signer             |
| Platform Address | Deposit platform fee address                            |
| Escrow Type      | Single-Release or conditional flow                      |

Simple version:

```
Renter funds escrow
Deposit remains locked
Condition is reviewed
Approver validates outcome
Release signer releases funds according to the result
```

***

### How To Think About Trustless Work

Trustless Work is not only an escrow application.

It is infrastructure for programmable transaction coordination.

Use it when your product needs to answer:

> What must happen before funds move?

If the answer involves multiple parties, milestones, approvals, or release conditions, Trustless Work can help you encode that logic into a smart escrow.

***

### Next Steps

Now that you understand the escrow design model:

1. Define [Escrow Properties](what-does-a-smart-escrow-look-like.md)
2. Choose Your[ Escrow Type](escrow-types.md)
3. Assign [Roles](roles-in-trustless-work.md)
4. Follow the [Lifecycle](escrow-lifecycle/)
5. Integrate through the [API](/broken/pages/gUjukrFTBPL5TMsB6iGu), [SDK](/broken/pages/scGDuM8o0MSb8BP9e8vW), or [Blocks](/broken/pages/veoWn4cwcBMCfGYiiQaQ)

***

