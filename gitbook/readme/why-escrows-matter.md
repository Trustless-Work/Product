# Why Escrows Matter

Escrow is a neutral way to hold funds until conditions are met. It’s the simplest primitive for “trust, but verify”.

### Escrow is the trust layer

Most people first think of real estate. That’s correct. Escrow is common in high-value transactions.

<figure><img src="../.gitbook/assets/image (2) (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>Simple representation of a Real Estate Escrow.</p></figcaption></figure>

Escrow also shows up in marketplaces (Upwork, eBay, etc.).

<figure><img src="../.gitbook/assets/image (3) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>Escrows on digital marketplaces.</p></figcaption></figure>

Big platforms can afford escrow infrastructure. Many others can’t.

eBay leans on legacy providers (often 3%–8% fees). Upwork invested heavily in escrow operations.

Platforms that could greatly benefit from the use of escrows don't use them because of the technical complexity and cost of building an escrow infrastructure.

<figure><img src="../.gitbook/assets/image (4) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

### Why legacy escrow is hard

* **Fiat escrow is expensive and slow.** It typically requires bank rails and settlement workflows.
* **It’s operationally heavy.** Real estate, M\&A, and cross-border trade use escrow because they can justify the overhead.

{% hint style="warning" %}
Some teams spend months to a year building escrow infrastructure.
{% endhint %}

### Why smart-contract escrow wins (but still hurts to build)

Blockchain makes escrow programmable and auditable. But building production-grade contracts and flows still takes specialized time. Most teams don’t want to hire a full smart contract team for v1.

### What escrow solves

* **Chargebacks** and fraud in marketplaces
* **Late or withheld payments** for freelancers
* **Unclear fund control** in grants, bounties, or pre-orders
* **No dispute path** in P2P or milestone deals

### What Trustless Escrow enables

* Payments release only when work is approved.
* Funds sit in secure, neutral smart contracts.
* Approval flows can be signed by users, platforms, or agents.
* Works globally with USDC and Stellar settlement.

### Next steps

* Get started: [Developer Quickstart](../api-reference/getting-started.md)
