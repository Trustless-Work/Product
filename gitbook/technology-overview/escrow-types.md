# Escrow Types

Here’s a GitBook-ready draft for the **Escrow Types** page:

***

### 🧱 Escrow Types

Trustless Work supports multiple escrow types, each tailored for different workflows. Whether you're building a marketplace, a grant platform, or a gig app, choosing the right escrow logic helps you balance simplicity, flexibility, and trust.

> 🔎 Looking for schemas and technical configs?\
> [Explore the schemas directory →](https://docs.trustlesswork.com/trustless-work/developer-resources/schema)

***

#### 🟢 Single-Release Escrow

**Best for:**\
Simple transactions with a one-time approval and release. Ideal for freelance jobs, digital goods, or payouts that don’t require multiple steps.

**How it works:**

1. Funds are deposited once.
2. A single milestone is marked as completed.
3. Upon approval, the full amount is released.

**Why use it?**

* ✅ Fastest to integrate
* ✅ Minimal logic
* ✅ Works well for solo builders and MVPs

***

#### 🟠 Multi-Release Escrow

**Best for:**\
Projects with multiple milestones, stages, or partial payouts—like grant disbursements, multi-part gigs, or staged deliveries.

**How it works:**

1. Funds can be deposited upfront or in parts.
2. Multiple milestones are marked and reviewed.
3. Funds are released incrementally as each milestone is approved.

**Why use it?**

* ✅ More control and flexibility
* ✅ Supports complex workflows
* ✅ Enables trust without overcommitting funds

***

### 🧪 Quickstart Tips

* Use **Single-Release** to get started fast.
* Upgrade to **Multi-Release** when you need milestone-based control.
* All escrows are **non-custodial**, programmable, and stablecoin-native.
