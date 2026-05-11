---
description: Let's understand what each role represents!
---

# Roles in Trustless Work

Roles define who can do what inside a Trustless Work escrow.

Anyone can deposit funds into an escrow. But only addresses with assigned roles can update milestones, approve work, release funds, or resolve disputes.

This is what makes Trustless Work escrows programmable.

Instead of assuming that one platform, company, or person controls everything, each escrow explicitly defines the addresses responsible for each action.

A good role configuration answers:

> Who must do what before money can move?

***

<figure><img src="../../.gitbook/assets/image (1) (2) (1).png" alt=""><figcaption><p>Roles are marked in black</p></figcaption></figure>

***

### Why Roles Matter

An escrow is a coordination system.

Different parties may need different powers:

* one party funds the escrow
* one party performs the work
* one party updates milestone status
* one party validates completion
* one party releases funds
* one party receives the funds
* one party resolves disputes
* one platform receives a fee

Trustless Work separates these responsibilities into roles.

This makes the escrow easier to reason about, safer to configure, and more flexible across use cases.

***

### Role-Based Permissions

Every escrow includes a roles object.

Each role is assigned to an address.

Only the address assigned to that role can perform the actions associated with that role.

For example:

* only the **Service Provider** can update milestone status
* only the **Approver** can approve milestones
* only the **Release Signer** can release funds
* only the **Dispute Resolver** can resolve disputes
* the **Receiver** receives funds after release
* the **Platform Address** receives platform fees and can update escrow details before funding

This role-based model allows platforms to design different trust flows without writing custom smart contracts from scratch.

***

### Core Roles

### 1. Service Provider

The Service Provider is responsible for delivering the product, service, milestone, or outcome defined in the escrow.

This role usually represents the party doing the work.

#### What the Service Provider can do

* change milestone status
* add evidence or proof of delivery
* raise a dispute

#### Examples

| Use case            | Service Provider                             |
| ------------------- | -------------------------------------------- |
| Marketplace payment | Seller, freelancer, vendor, or contractor    |
| Project milestones  | Contractor or project team                   |
| Payouts             | Contributor, vendor, or milestone owner      |
| Crowdfunding        | Company or campaign owner updating progress  |
| Compliance flow     | Compliance team marking a check as completed |

#### Design note

The Service Provider communicates progress.

They do not automatically approve their own work.

In most flows:

```txt
Service Provider updates status
Approver validates completion
Release Signer releases funds
```

***

### 2. Approver

The Approver validates that a milestone has actually been completed.

This role is responsible for signing off on completion before funds can be released.

#### What the Approver can do

* sign the approval of a milestone
* raise a dispute if work is not satisfactory

#### Examples

| Use case            | Approver                                            |
| ------------------- | --------------------------------------------------- |
| Marketplace payment | Buyer, client, or platform reviewer                 |
| Project milestones  | Client, project owner, or reviewer                  |
| Payouts             | Program reviewer, maintainer, or platform admin     |
| Security deposit    | Host, property manager, renter, or neutral reviewer |
| Crowdfunding        | Platform or campaign reviewer                       |

#### Design note

Approval is not the same as a status update.

A status update communicates progress.

Approval validates that the agreed condition has been met.

In some flows, the Approver may approve before the Service Provider updates the status. The important point is that approval should remain an explicit validation action.

***

### 3. Release Signer

The Release Signer triggers the actual release of funds once the required approvals are in place.

This role is responsible for executing payment movement.

#### What the Release Signer can do

* release funds after all milestones are approved in a Single-Release Escrow
* release funds for each approved milestone in a Multi-Release Escrow
* raise a dispute if there is disagreement at the release stage

#### Examples

| Use case            | Release Signer                                                  |
| ------------------- | --------------------------------------------------------------- |
| Marketplace payment | Buyer, platform signer, or authorized release address           |
| Project milestones  | Client, platform signer, or project owner                       |
| Payouts             | Platform signer, treasury signer, or authorized release address |
| DAO bounty          | DAO signer or authorized contributor payment signer             |
| Security deposit    | Platform-controlled signer or agreed release authority          |

#### Design note

The Release Signer executes the release.

The Release Signer should not be confused with the Approver.

In simple flows, the same address may be both Approver and Release Signer. In more sensitive flows, those roles should be separated.

Normal release flow:

```
Status update  → Approval    → Release
```

***

### 4. Receiver

The Receiver is the final destination of released funds.

This role receives funds once the escrow conditions are met and release is triggered.

#### What the Receiver can do

* receive funds once release is triggered

#### Examples

| Use case            | Receiver                                                        |
| ------------------- | --------------------------------------------------------------- |
| Marketplace payment | Seller, freelancer, vendor, or contractor                       |
| Project milestones  | Same contractor or project team across milestones               |
| Payouts             | Different contributor, vendor, or team per milestone            |
| Crowdfunding        | Company receiving milestone-based funding                       |
| Security deposit    | Renter, host, or other final recipient depending on the outcome |

#### Design note

The Receiver is not automatically the Service Provider.

In many cases, they are the same party.

For example, a freelancer can be both:

```
Service Provider = freelancerReceiver = freelancer wallet
```

But in other cases, they may be different.

Example:

```
Service Provider = project managerReceiver = company treasury
```

***

### 5. Dispute Resolver

The Dispute Resolver steps in when parties disagree or when something goes wrong.

This is a core role in the Trustless Work role model.

#### What the Dispute Resolver can do

* resolve disputes by redirecting funds

#### Examples

| Use case            | Dispute Resolver                                        |
| ------------------- | ------------------------------------------------------- |
| Marketplace payment | Marketplace, platform, or neutral resolver              |
| Project milestones  | Arbitrator, project admin, or platform reviewer         |
| Payouts             | Program admin, maintainer, or governance process        |
| Security deposit    | Platform, property manager, or neutral dispute resolver |
| Crowdfunding        | Campaign platform or independent reviewer               |

#### Design note

The Dispute Resolver should be configured intentionally.

This role has important authority because it can affect where funds go when a dispute is raised.

A dispute is not part of every normal escrow path, but the Dispute Resolver role exists so the escrow has a defined resolution authority if conflict happens.

Disputed flow:

```
Dispute raised  → Dispute Resolver reviews    → Funds are redirected or resolved
```

***

### 6. Platform Address

The Platform Address represents the platform or application integrating Trustless Work.

This role is usually used for platform fees and pre-funding configuration changes.

#### What the Platform Address can do

* collect platform fees automatically
* update escrow details while the escrow has not been funded

#### Examples

| Use case            | Platform Address                                  |
| ------------------- | ------------------------------------------------- |
| Marketplace payment | Marketplace fee address                           |
| Project milestones  | SaaS platform or infrastructure fee address       |
| Payouts             | Program, bounty, or treasury platform fee address |
| Crowdfunding        | Crowdfunding platform fee address                 |
| Security deposit    | Rental platform fee address                       |

#### Design note

The Platform Address is not the same thing as the Receiver.

The Platform Address receives the platform fee.

The Receiver receives the escrow payout.

Example:

```
Receiver = freelancerPlatform Address = marketplace fee wallet
```

Also, fee collection should not be confused with full control over funds. The Platform Address can update escrow details before funding, but once funds are locked, the escrow flow should follow the role and lifecycle rules.

***

### Other Addresses You May See

Some addresses may interact with the escrow or appear in indexed data, but they do not have the same action permissions as the core roles above.

***

### Issuer

The Issuer has no powers over the contract.

This address may be present because of how assets, contracts, or metadata are represented, but it does not control escrow actions.

#### Can perform

* no escrow actions

***

### Depositor

The Depositor is any address that sends funds into the escrow.

Every incoming transaction to the escrow is indexed.

However, depositing funds does not automatically give that address permissions inside the escrow.

#### Can perform

* deposit funds

#### Cannot automatically perform

* update milestones
* approve milestones
* release funds
* resolve disputes

#### Design note

This distinction matters.

A wallet can fund an escrow without becoming the Approver, Release Signer, or Receiver.

***

### Observer

Observer is planned for a future version.

An Observer is an address that wants to track an escrow without acting on it.

#### Intended purpose

* observe escrow activity
* make tracking easier by role
* support dashboards, notifications, and transparency use cases

#### Can perform

* no escrow actions

***

### Status, Approval, Dispute, and Release Are Different

Do not collapse these actions into one concept.

| Concept        | Role usually responsible                      | Meaning                  |
| -------------- | --------------------------------------------- | ------------------------ |
| Status update  | Service Provider                              | Communicates progress    |
| Approval       | Approver                                      | Validates completion     |
| Dispute        | Service Provider, Approver, or Release Signer | Signals disagreement     |
| Resolution     | Dispute Resolver                              | Resolves dispute outcome |
| Release        | Release Signer                                | Moves funds              |
| Payout         | Receiver                                      | Receives funds           |
| Fee collection | Platform Address                              | Receives platform fee    |

This distinction is central to escrow design.

***

### Role Capability Matrix

| Role             | Update milestone status | Add evidence  | Approve milestone | Raise dispute | Resolve dispute | Release funds | Receive payout | Receive platform fee | Update before funding |
| ---------------- | ----------------------- | ------------- | ----------------- | ------------- | --------------- | ------------- | -------------- | -------------------- | --------------------- |
| Service Provider | Yes                     | Yes           | No                | Yes           | No              | No            | Sometimes      | No                   | No                    |
| Approver         | No                      | No            | Yes               | Yes           | No              | No            | Usually no     | No                   | No                    |
| Release Signer   | No                      | No            | No                | Yes           | No              | Yes           | Usually no     | No                   | No                    |
| Receiver         | No                      | No            | No                | No            | No              | No            | Yes            | No                   | No                    |
| Dispute Resolver | No                      | No            | Case-specific     | No            | Yes             | Case-specific | No             | No                   | No                    |
| Platform Address | No by default           | No by default | No by default     | No by default | No by default   | No by default | No             | Yes                  | Yes                   |
| Issuer           | No                      | No            | No                | No            | No              | No            | No             | No                   | No                    |
| Depositor        | No                      | No            | No                | No            | No              | No            | No             | No                   | No                    |
| Observer         | No                      | No            | No                | No            | No              | No            | No             | No                   | No                    |

***

### How Roles Interact

In a normal escrow flow:

```
1. Depositor funds the escrow2. Service Provider updates milestone status3. Approver validates the milestone4. Release Signer releases the funds5. Receiver receives the payout6. Platform Address receives the platform fee
```

If something goes wrong:

```
1. Service Provider, Approver, or Release Signer raises a dispute2. Dispute Resolver reviews the situation3. Dispute Resolver resolves the dispute4. Funds are released, redirected, or resolved according to the escrow logic
```

***

### Role Mapping By Use Case

### Marketplace Payment

Use case: **Single-release escrow**

| Role             | Example                                               |
| ---------------- | ----------------------------------------------------- |
| Depositor        | Buyer or client                                       |
| Service Provider | Seller, freelancer, or vendor                         |
| Approver         | Buyer, client, or platform reviewer                   |
| Release Signer   | Buyer, platform signer, or authorized release address |
| Receiver         | Seller, freelancer, or vendor                         |
| Dispute Resolver | Marketplace, platform, or neutral resolver            |
| Platform Address | Marketplace fee address                               |

Best for:

* one buyer
* one provider
* one final payout
* simple delivery confirmation

***

### Project Milestones

Use case: **Multi-release escrow, same receiver**

| Role             | Example                                            |
| ---------------- | -------------------------------------------------- |
| Depositor        | Client, sponsor, or project owner                  |
| Service Provider | Contractor, project team, or vendor                |
| Approver         | Client, reviewer, or project owner                 |
| Release Signer   | Client, platform signer, or authorized signer      |
| Receiver         | Same contractor, team, or vendor across milestones |
| Dispute Resolver | Platform, neutral resolver, or assigned resolver   |
| Platform Address | Platform or infrastructure fee address             |

Best for:

* phased projects
* milestone-based contracts
* grants to one team
* implementation work
* service agreements paid over time

***

### Payouts

Use case: **Multi-release escrow, multiple receivers**

| Role             | Example                                                          |
| ---------------- | ---------------------------------------------------------------- |
| Depositor        | Sponsor, platform, organization, or treasury                     |
| Service Provider | Contributor, vendor, team, or milestone owner                    |
| Approver         | Program reviewer, maintainer, client, or platform admin          |
| Release Signer   | Platform signer, treasury signer, or authorized release address  |
| Receiver         | Different receiver per milestone                                 |
| Dispute Resolver | Platform, neutral resolver, program admin, or governance process |
| Platform Address | Program, bounty, or platform fee address                         |

Best for:

* bounties
* contributor payouts
* multi-vendor projects
* hackathon rewards
* ecosystem incentive programs
* grants with multiple teams

***

### Common Role Combination Patterns

The same address can sometimes hold multiple roles.

This should be done intentionally.

#### Common combinations

| Combination                         | When it makes sense                                     | Risk                                               |
| ----------------------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| Service Provider + Receiver         | A freelancer performs work and receives payment         | Low, common pattern                                |
| Depositor + Approver                | A client funds and approves the work                    | Common, but client can delay approval              |
| Approver + Release Signer           | Simple workflows where the approver also releases funds | Concentrates validation and execution authority    |
| Platform Address + Dispute Resolver | Platform handles fees and dispute resolution            | Platform gains significant influence over outcomes |

#### Risky combinations

| Combination                    | Why it is risky                                                          |
| ------------------------------ | ------------------------------------------------------------------------ |
| Service Provider + Approver    | Party can approve its own work                                           |
| Receiver + Release Signer      | Receiver may be able to trigger payment to itself if safeguards are weak |
| Platform Address + Receiver    | Confuses fee recipient with payout recipient                             |
| One address holding every role | Recreates centralized custody-like control                               |

***

### Role Design Checklist

Before deploying an escrow, confirm:

* Who funds the escrow?
* Who updates milestone status?
* Who approves completion?
* Who can raise a dispute?
* Who resolves disputes?
* Who releases funds?
* Who receives payout?
* Who receives platform fees?
* Is the Receiver different from the Platform Address?
* Is the Service Provider also the Receiver?
* Is the Approver also the Release Signer?
* Should any role be separated for safety?
* Does the use case require a neutral Dispute Resolver?
* Are you using Single-Release or Multi-Release?
* Are there multiple receivers?
