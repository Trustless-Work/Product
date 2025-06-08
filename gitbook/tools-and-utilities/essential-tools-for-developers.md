# 🧰 Essential Tools for Developers

This guide walks you through the key tools you’ll need to experiment with and integrate Trustless Work into your platform or product.

Whether you're testing on testnet or preparing for a production launch, these tools will streamline your experience.

***

#### 🔐 Stellar Wallets

To interact with Trustless Work escrows, you’ll need a Stellar wallet that supports:

* Signing transactions
* Viewing balances
* Creating trustlines for USDC

Recommended wallets:

| Wallet        | Type              | Features                               | Link                                        |
| ------------- | ----------------- | -------------------------------------- | ------------------------------------------- |
| **Freighter** | Browser Extension | Ideal for developers; supports testnet | [freighter.app](https://www.freighter.app/) |
| **xBull**     | Browser Extension | USDC support; mobile app available     | [xbull.app](https://xbull.app/)             |
| **Rabet**     | Browser Extension | Easy to use; supports multisig         | [rabet.io](https://rabet.io/)               |
| **Albedo**    | Web-based         | Lightweight signing + auth             | [albedo.link](https://albedo.link/)         |
| **Lobstr**    | Mobile & Web      | User-friendly, great for real usage    | [lobstr.co](https://lobstr.co/)             |

🔗 Learn more in the[ Wallets & Testnet ](../developer-resources/stellar-wallets/)Guide

***

#### 💧 Testnet Setup

Trustless Work is live on Stellar testnet. You can use testnet USDC and XLM to fund and experiment with escrows.

**You’ll need:**

* A wallet with testnet support
* XLM for gas
* USDC for payments
* Trustline to USDC

**📥 Get Testnet Assets**

* 🔗 [Stellar Laboratory: Friendbot (for XLM)](https://laboratory.stellar.org/#account-creator?network=test)
* 🔗 USDC Faucet (for USDC)

💡 Remember: You must establish a trustline before receiving USDC. Most wallets offer this in their UI.

[Learn more.](../developer-resources/testnet-tokens.md)

***

***

#### 🧪 Testnet dApp

Try deploying and interacting with an escrow through the browser:

* Deploy escrows with configurable roles
* Mark milestones
* Approve & release funds
* Test edge cases and permission scenarios

➡️ [Launch dApp](http://dapp.trustlesswork.com/)

***

#### 🧱 Open Source Templates

We provide open-source starter kits and reference implementations:

* React UI template for escrow control
* Soroban contract examples
* Next.js dApp integrations

Browse all on GitHub: 🔗 [github.com/Trustless-Work](https://github.com/Trustless-Work)

#### 🧠 Dev Tools Recap

| Category         | Tool / Resource                     |
| ---------------- | ----------------------------------- |
| Wallets          | Freighter, xBull, Rabet, Albedo     |
| Testnet Assets   | Stellar Friendbot, Trustless Faucet |
| UI for Testing   | Trustless Work dApp                 |
| Templates & SDKs | Trustless Work GitHub               |

***

#### ⬇️ Next Steps

* Start Building
* [Explore Roles](https://dots.trustlesswork.com/roles)
* [Use Our API](https://github.com/Trustless-Work/docs)
* [View Example Escrows](http://dapp.trustlesswork.com/)
