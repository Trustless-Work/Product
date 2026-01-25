# Funding Phase

<figure><img src="../../../.gitbook/assets/image (3) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

## Phase 2 — Funding (When Logic Meets Capital)

Once an escrow is deployed, it becomes **fundable** — meaning any authorized wallet can deposit assets into it.\
This is where trust becomes tangible: the logic you set in the Initiation Phase now holds real value.

The **Funding Phase** signals the start of the agreement in motion.\
It turns the escrow from an empty container of logic into a live, capital-backed contract.

***

### 💸 Two Ways to Fund

Every escrow has an **Escrow ID** (also called **Contract ID**).\
Both terms refer to the same on-chain address — where funds are actually held.

You can fund an escrow in **two main ways**:

1. **Direct Deposit** — Send funds manually to the escrow’s ID using any Stellar wallet.
   * This method is simple and works universally.
   * However, deposits made this way may not automatically trigger indexation events, so if you’re building analytics or dashboards, you’ll need to handle those deposits separately.
2. **Using the “Fund Escrow” Endpoint** — via the Trustless Work API or dApp.
   * This option generates and signs the transaction from your connected wallet (e.g., Freighter).
   * It also emits a **Deposit Event** on-chain, making it easier for our indexer (and your platform) to track and verify deposits automatically.
   * This is the method we recommend — it’s what powers the “Fund” buttons in our Backoffice and Demo dApps.

> ⚡ In short:
>
> * Direct deposits **work** for any wallet or integration.
> * The API endpoint **tracks** them better for dashboards, automation, and future reconciliations.

***

### 🎯 The Amount and the Balance

When you deployed your escrow, you defined a **target amount** — that’s your goal.\
It’s used to calculate whether the escrow is:

* **Fully Funded** – the on-chain balance matches the target amount
* **Partially Funded** – the balance is lower than expected
* **Overfunded** – extra deposits were made

What you see on-chain is the **balance**, which is dynamic:

* It increases when deposits are made.
* It decreases when funds are released.
* It always reflects the escrow’s current real-time state.

> 💡 The target `amount` is static — it represents intent.\
> The `balance` is live — it represents reality.

***

### 🪙 Compatible Wallets and Assets

Funds can come from any wallet that supports the **trustline** you defined during initiation.\
The most common setup is **USDC on Stellar**, but any asset with a valid trustline works.

We recommend using **non-custodial wallets** for deposits — especially **Freighter**, our default integration.

> ⚠️ **Important note:**\
> Some custodial exchanges (like Binance) don’t yet support sending directly to contract addresses.\
> Withdrawals may fail or get flagged as invalid.\
> Always test deposits from a non-custodial wallet first.

***

### 🔄 Advanced Integrations (Optional)

If you’re building a product where funds flow in from external users or payment processors — like a marketplace or investment pool — you can integrate **on-ramp services** directly with the escrow.

We’ve tested integrations where on-ramps send USDC straight to an escrow contract, creating a seamless deposit experience.\
Each successful deposit triggers an event that platforms can listen to for **real-time funding status** updates.

> 💬 Builders who want to explore advanced integrations can check out our open-source examples and dApp code on GitHub.\
> We’re continuously experimenting with new funding patterns and wallets to improve this experience.

***

### 📦 Outcome of the Funding Phase

By the end of this phase:

* Your escrow now holds real assets.
* Its balance reflects the amount deposited.
* Events are recorded on-chain for transparency.
* All participants can independently verify the deposit.

You can confirm the escrow’s funded state on:

* 🌐 [**Escrow Viewer**](https://viewer.trustlesswork.com) — for a clear visual of deposits and status
* 🔍 [**Stellar Expert**](https://stellar.expert) — for blockchain-level transaction details

> 💡 Use the Viewer for clarity, Expert for raw transparency.
