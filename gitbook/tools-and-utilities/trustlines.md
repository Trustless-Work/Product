# Trustlines

### 🔐 What Are Trustlines in Stellar?

* A **trustline** is an explicit opt-in setup by a Stellar account that authorizes it to hold, receive, and transact with a non‑native asset (i.e. anything other than XLM), issued by a specific issuer ([messari.io](https://messari.io/copilot/share/understanding-trustlines-on-stellar-7412e8a0-ffb5-4eb8-9ad7-9441d9e471fa?utm_source=chatgpt.com)).
* Without a trustline, an account **cannot receive or keep** that asset on the Stellar network ([developers.stellar.org](https://developers.stellar.org/docs/build/guides/basics/verify-trustlines?utm_source=chatgpt.com)).
* Each trustline requires **0.5 XLM** in base reserve, increasing the minimum balance and limiting abuse or spam ([developers.stellar.org](https://developers.stellar.org/docs/build/apps/example-application-tutorial/manage-trust?utm_source=chatgpt.com)).
* Trustlines also include a **trust limit**—the maximum amount the account is willing to hold—and record the current balance and liabilities (e.g., open offers) ([stronghold.co](https://stronghold.co/learn/shx-setting-up-trustlines-for-shx-withdrawals?utm_source=chatgpt.com)).

***

### 🚀 How They Work in Stellar (Classic)

1. To hold an asset like USDC, you run a `ChangeTrust` operation specifying asset code and issuer.
2. That sets up a ledger entry tracking your account, the issuer, your limit, and balance ([developers.stellar.org](https://developers.stellar.org/docs/build/apps/example-application-tutorial/manage-trust?utm_source=chatgpt.com), [stronghold.co](https://stronghold.co/learn/shx-setting-up-trustlines-for-shx-withdrawals?utm_source=chatgpt.com)).
3. Sending your account assets without a trustline fails—even if someone attempts to send you that token ([stronghold.co](https://stronghold.co/learn/shx-setting-up-trustlines-for-shx-withdrawals?utm_source=chatgpt.com)).
4. Limiting trustlines (max \~1,000 per account) and minimum reserves keep the network safe from spam and excessive token issuance ([messari.io](https://messari.io/copilot/share/understanding-trustlines-on-stellar-7412e8a0-ffb5-4eb8-9ad7-9441d9e471fa?utm_source=chatgpt.com)).

***

### 🤖 How Soroban Uses Trustlines

Soroban smart contracts integrate tightly with Stellar assets via the **Stellar Asset Contract (SAC)**:

* Soroban allows you to **wrap classic Stellar assets** (those backed by a trustline) into a SAC, which behaves like an ERC‑20 styled token contract ([token-playground.gitbook.io](https://token-playground.gitbook.io/guide/index/2_basic_concepts?utm_source=chatgpt.com)).
* When interacting with assets through Soroban:
  * Users still **must have a trustline** set up beforehand in their Stellar account.
  * Contracts themselves **do not need trustlines**, but they rely on the user's trustline to send or receive asset transfers ([token-playground.gitbook.io](https://token-playground.gitbook.io/guide/index/2_basic_concepts?utm_source=chatgpt.com)).

#### Example Use Cases

* **Escrow Engines / DEXs / Swap Contracts**: Users fund Soroban contracts with wrapped assets. When the contract tries to distribute tokens, recipients **must possess a trustline**, or the transfer fails.
* **Asset Wrapping via SDKs**: Tools like `soroban-client` or `soroban-cli` check for trustlines and prompt users (e.g. via Freighter) if one is missing before proceeding with contracts .

***

### 📋 Comparison Table

| Feature                  | Stellar Classic                 | Soroban Smart Contracts                            |
| ------------------------ | ------------------------------- | -------------------------------------------------- |
| Trustline Requirement    | Required to hold non-XLM assets | Required for users interacting with Stellar assets |
| Base Reserve Cost per TL | \~0.5 XLM                       | Same                                               |
| Asset Wrapping           | Not applicable                  | Wrapped through SAC wrapping classic assets        |
| Contract Balance Model   | Account-based ledger entries    | Contracts can hold wrapped tokens internally       |
| User Interaction Theory  | Direct payments                 | Transfer logic leverages trustlines via SAC        |

***

### 🧠 Developer Takeaways

1. **Always check** if a user’s Stellar account has the appropriate trustline before assets flow through Soroban contracts.
2. **Prompt for setup** if missing, ideally automating via wallet integration.
3. **Remove trustlines only after clearing balances**—balances must be zero to delete a trustline safely ([scopuly.medium.com](https://scopuly.medium.com/stellar-trustlines-how-to-add-or-remove-a-trustline-on-scopuly-wallet-c394b3121590?utm_source=chatgpt.com), [token-playground.gitbook.io](https://token-playground.gitbook.io/guide/index/2_basic_concepts?utm_source=chatgpt.com), [medium.com](https://medium.com/stellar-community/a-guide-to-trustlines-on-stellar-8bc46091a86f?utm_source=chatgpt.com), [developers.stellar.org](https://developers.stellar.org/docs/build/guides/basics/verify-trustlines?utm_source=chatgpt.com)).
4. Base-reserve costs accumulate—factor in reserve XLM when onboarding users across multiple assets.

***

### 💬 Insight from the community

One Reddit comment sums it up simply:

> “Trustlines are entries that persist in the Stellar ledger. They track the limit for which your account trusts the issuing account and the amount of credit.” ([reddit.com](https://www.reddit.com/r/Stellar/comments/7u47av/can_someone_explain_what_this_means_what_exactly/?utm_source=chatgpt.com))

***

Would you like example code for verifying trustlines via Soroban RPC, or showing SDK checks in `soroban-client`? I can pull snippets into Typescript or Java as needed.
