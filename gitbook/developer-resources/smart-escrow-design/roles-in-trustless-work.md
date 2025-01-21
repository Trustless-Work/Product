---
description: Before we begin designing, let's understand what each role represents!
---

# Roles in Trustless Work

Now that you know how an escrow looks like, lets understand roles and their significance within the escrow lifecycle.&#x20;

Roles are assigned to specific addresses, however, anyone can deposit funds into an escrow, and reading the escrow's configuration, status, and transaction history doesn't require an assigned role.

***

### Roles, Parties, and Their Functions

* **Roles:** Each role has a distinct function within the escrow process, such as approving milestones or releasing payments.
* **Parties:** These are the entities or individuals assigned to one or more roles, such as buyers, sellers, or platforms. They interact through a Stellar wallet for signing any interactions with the escrow. Only addresses with assigned roles can interact with the escrow.

***

## Roles:

**1. Milestone Approver**

* **Function:** Approves or disputes milestones marked as completed.
* **Examples:**
  * Buyer in a freelance marketplace **approves** the deliverable **marked as done** by the freelancer.
  * Host in a security deposit scenario **approves** the checkout **marked as done** by the turist.
  * Platform in a crowdfunding campaign **approves** milestone **marked as done** by the company.

***

**2. Milestone Marker**

* **Function:** Delivers the product, service, or objective set on milestine. Marks milestones as completed and ready for approval.
* **Examples:**
  * Freelancer delivering a service and marking it as complete.
  * Company updating crowdfunding milestones and marking as complete.
  * Compliance department marking a withdraw complaince check as complete.
  * Real Estate inspector marks the house inispections as complete.&#x20;

***

**3. Release Signer**

* **Function:** Approves the release of funds for the amount set.

{% hint style="info" %}
Release currently works as following: \
-All milestones need to be approved for payment to be released, since we are setting 1 amount for the whole contract. \
\
This will be changed to: \
Each individual  milestone will have an amount, each amount can be individually released when approved.&#x20;
{% endhint %}



* **Examples:**
  * Airbnb (platform) releasing a deposit.
  * eBay (platform) releasing payment to a seller.
  * DAO releasing a payment to a contributor

***

**4. Dispute Resolver**

* **Function:** Resolves disputes by adjusting milestone amounts, updating status, or canceling the contract.
* **Examples:**
  * Platform (eBay, Airbnb) acting as arbiter for a deposit because turist broke something redirecting deposit to host.
  * Independent third-party arbitrator setting a new milestone price for an project milestone.
  * Cenceling an escrow amount and redirecting funds back to Client.

***

**5. Receiver - Final Recipient**

* **Function:** The final recipient of funds after conditions are met or disputes are resolved.
* **Examples:**
  * Freelancer receiving payment.
  * Turist receiving a security deposit.
  * Company receiving funds

***

**6. Platform Address**

* **Function:** An address designated to receive the **platform fee**, a percentage or fixed amount of the total funds processed through escrow.
* **Examples:**
  * Airbnb collecting platform fees.
  * Crowdfunding platform taking a fee from funds raised.

