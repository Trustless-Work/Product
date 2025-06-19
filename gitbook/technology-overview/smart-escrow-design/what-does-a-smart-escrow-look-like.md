# What does a Smart Escrow "look like"?

<figure><img src="../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

**Escrow ID:** This is the same as the contract address, users will send funds to this Address. (Trustline should be set).

**Balance:** The amount of funds currently in the escrow (deposited to escrow id).

**Escrow properties:**&#x20;

* **Trustline:** Trustline of the token to be deposited
* **Amount:** The expected amount expected to be held in escrow (this is a numerical value configured on deployment, not the current balance on escrow).
* **Platform Fee:** Extra fee that is sent to platform Address.&#x20;
* **Engagement ID:** Used to assign an extra identifier to escrows (invoice, project ID, order id, etc).

**Flags:**&#x20;

* **Disputed:** Set to true when a party raises a dispute
* **Released:** Set to true when the release transaction has been signed and funds have been released.
* **Resolved:** Set to true when the dispute resovler has had to interfere.

**Roles:** roles are assigned to parties, represented by Stellar public addresses. Depending on each party's role, they will be allowed to sign and update the escrow status and flags. Learn more about roles [here](../roles-in-trustless-work.md)

**Milestones:** &#x20;

* **Title:** Name of the milestone. Ex: Delivery of code
* **Description:** A description of the milestone, can also include acceptance criteria.&#x20;
* **Status:** Pending (default) - Completed (when marked as complete)

***

We are also working on this type of escrow contract: multi-release\


<figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

Main difference being that the amount and flags are moved to the milestone, therefore you can have independent fund releases per milestone. I will reference this type of contract in our docs too as it is currently being built.

