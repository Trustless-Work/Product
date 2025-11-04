---
icon: code
---

# Trustless Work API

### What is the Trustless Work API?

The **Trustless Work REST API** is a developer interface for creating and managing **decentralized escrow contracts** on the **Stellar blockchain** using **Soroban smart contracts**. It simplifies the escrow lifecycle and integrates seamlessly into any platform that needs conditional payments or trust-minimized fund release.

***

### 🚀 Core Capabilities

* **Deploy Smart Escrows**: Initialize smart contracts with defined roles, milestones, and conditions.
* **Fund Escrows**: Lock funds into escrow accounts with Stellar-native assets (e.g., USDC).
* **Update & Approve Milestones**: Collaborate on progress tracking and delivery verification.
* **Dispute Handling**: Programmatically raise or resolve disputes.
* **Release Funds**: Release escrowed amounts only when predefined conditions are fulfilled.
* **Real-Time Status Tracking**: Query escrow status, milestones, and balances.
* **Cross-Chain Compatibility**: USDC support via Circle’s cross-chain transfer protocol.

***

### 🧩 Escrow Types

1. **Single-Release Escrow**
   * One-time fund release after milestone approval or dispute resolution.
   * Roles: Service Provider, Approver, Receiver, Dispute Resolver.
2. **Multi-Release Escrow**
   * Multiple milestone-based payouts.
   * Each milestone is independently approved and released.

***

### 📘 Key API Endpoints (Grouped)

#### 🔨 Deployment

* `/deployer/single-release`
* `/deployer/multi-release`

#### 💸 Funding

* `/escrow/{type}/fund-escrow`

#### ✅ Milestone Handling

* `/escrow/{type}/approve-milestone`
* `/escrow/{type}/change-milestone-status`

#### 🏁 Finalization

* `/escrow/{type}/release-funds` (single)
* `/escrow/{type}/release-milestone-funds` (multi)

#### ⚠️ Disputes

* `/escrow/{type}/dispute-escrow`
* `/escrow/{type}/resolve-dispute`
* `/escrow/{type}/dispute-milestone` (multi)
* `/escrow/{type}/resolve-milestone-dispute` (multi)

#### 🔄 Escrow Updates

* `/escrow/{type}/update-escrow`

#### 📊 Query / Tracking

* `/escrow/get-multiple-escrow-balance`
* `/helper/get-escrows-by-signer`
* `/helper/get-escrows-by-role`

***

### 🧰 Helper Utilities

* `/helper/set-trustline`: Set trustline to receive specific tokens like USDC.
* `/helper/send-transaction`: Submit signed XDR transactions to Stellar.
* `/helper/get-multiple-escrow-balance`: Batch query of escrow balances.

***

### 🛡️ Security & Constraints

* **Unsigned Transactions**: All operations return unsigned XDRs requiring client-side signing.
* **Role-Based Permissions**: Specific actions (e.g., approve, dispute) require the correct role.
* **Rate Limits**: 50 requests/minute per client.
* **Fee Model**: A 0.3% mainnet fee is taken by Trustless Work, with platforms able to add their own fee.

***

### 🎯 Use Cases

* Freelance platforms
* High-value e-commerce
* SaaS billing
* Cross-border real estate
* Legal & professional services
* Crowdfunding and grants
* Security deposits

***

### 📌 Dev Resources



**Dev Map:** [https://www.trustlesswork.com/developers](https://www.trustlesswork.com/developers)

* **Swagger**: [https://dev.api.trustlesswork.com/docs](https://dev.api.trustlesswork.com/docs)
* **GitHub**: [https://github.com/Trustless-Work](https://github.com/Trustless-Work)
