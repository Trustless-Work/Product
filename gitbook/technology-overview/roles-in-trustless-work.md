---
description: Let's understand what each role represents!
---

# Roles in Trustless Work

Anyone can deposit funds into an escrow.\
But only **addresses with assigned roles** can update milestones, approve work, release funds, or resolve disputes.

***

<figure><img src="../.gitbook/assets/image (1) (2) (1).png" alt=""><figcaption><p>Roles are marked in black</p></figcaption></figure>

***

### Escrow Roles and Their Actions

### 1. Service Provider

**Purpose:** Delivers the product, service, or outcome defined in the escrow.\
**Can perform:**

* Mark a milestone as complete
* Add evidence or proof of delivery
* Raise a dispute

**Examples:**

* Freelancer delivering work and marking it as done
* Company updating crowdfunding milestones
* Compliance team marking a “withdrawal check” milestone complete

***

### 2. Approver

**Purpose:** Validates that the milestone has indeed been completed and signs the approval.\
**Can perform:**

* Sign the approval of a milestone
* Raise a dispute if work is not satisfactory

**Examples:**

* Buyer approving a freelancer’s deliverable
* Host approving a checkout in a rental deposit
* Platform approving milestones in a crowdfunding campaign

***

### 3. Release Signer

**Purpose:** Triggers the actual release of funds once approvals are in place.\
**Can perform:**

* Release funds after all milestones are approved (Single-Release)
* Release funds for each approved milestone (Multi-Release)
* Can raise a dispute if there’s disagreement at release stage.

**Examples:**

* Airbnb releasing a deposit to the host
* DAO releasing a bounty payment to a contributor

***

#### 4. Receiver (Final Recipient)

**Purpose:** The end destination of funds.\
**Can perform:**

* Receive funds once release is triggered

**Examples:**

* Freelancer wallet receiving payment
* Company receiving milestone-based funding
* Tourist receiving their deposit back

***

#### 5. Dispute Resolver

**Purpose:** Steps in when parties disagree.\
**Can perform:**

* Resolve disputes by redirecting funds&#x20;

**Examples:**

* Platform deciding how to split a disputed deposit
* Arbitrator updating milestone pricing in a project
* Escrow canceled and funds returned to buyer

***

#### 6. Platform Address

**Purpose:** Represents the platform itself.\
**Can perform:**

* Collect platform fees automatically
* Update milestone details while escrow has not been funded

**Examples:**

* Airbnb collecting service fees
* Crowdfunding platform applying a percentage fee
* Marketplace updating a milestone description before it’s funded

***

### 🧭 How Roles Interact

1. **Service Provider** marks milestones as complete
2. **Approver** validates or disputes them
3. **Release Signer** authorizes payout
4. **Receiver** gets funds
5. **Platform Address** takes its fee
6. If there’s a conflict, the **Dispute Resolver** steps in

📎 See it in action: [Escrow Lifecycle](escrow-lifecycle/)
