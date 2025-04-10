---
icon: lock
---

# Security Deposits

Security deposits are a common requirement in rentals—whether it's housing, co-living spaces, equipment, or other real-world use cases. Trustless Work makes them **fair, transparent, and automated** using smart escrows.

With Trustless Work, platforms can configure non-custodial smart contracts that define exactly how and when security deposits are returned or withheld.

***

### Example Scenario

**Alice** rents a unit on a co-living platform. She deposits $500 USDC as a security deposit. At the end of her stay, she wants the deposit refunded—assuming there’s no damage.

***

### Escrow Configuration

<figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

| Role                   | Address             |
| ---------------------- | ------------------- |
| **Depositor**          | Alice               |
| **Milestone Marker**   | Alice or Platform   |
| **Milestone Approver** | Bob (Landlord/Host) |
| **Release Signer**     | Platform            |
| **Receiver**           | Alice               |

***

### Escrow Lifecycle

1. **Initiation**\
   The platform configures the escrow with all required roles using Trustless Work’s API.
2. **Funding**\
   Alice deposits $500 USDC into the escrow. The funds are held in a neutral smart contract.
3. **Milestone Update**\
   After Alice’s stay ends, either Alice or the platform marks the milestone as _"Request Refund."_
4. **Approval**\
   Bob inspects the property:
   * If everything is fine: Bob **approves** the refund.
   * If there are issues: Bob can **reject** or request a partial refund.
5. **Release**\
   The platform (as **Release Signer**) finalizes the release:
   * 100% refund to Alice if approved.
   * Partial refund based on agreement.
   * Escalation possible if a dispute arises.

***

### Benefits

* **Trustless & Transparent**: Smart contracts define rules upfront; funds are never held by the platform.
* **Customizable Logic**: Platforms can set deadlines, approval rules, or automatic fallback releases.
* **Global by Default**: Uses stablecoins on Stellar for fast, low-fee cross-border payments.
* **Flexible Roles**: Easily supports different dispute flows—platform-led, DAO-governed, or peer-to-peer.

***

### Optional Enhancements

* **Dispute Resolver Role**: Add an arbiter or DAO to resolve conflicts.
* **Time-Based Auto Approval**: If Bob doesn’t respond in X days, the contract automatically refunds Alice.

***

### Live Use Case: SafeTrust

> SafeTrust is a platform for co-living spaces that uses Trustless Work to manage security deposits. By using smart escrows, SafeTrust ensures that all tenants receive fair treatment while reducing operational overhead for hosts.
