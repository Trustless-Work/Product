---
description: >-
  This guide is your all-in-one resource to integrate, deploy, and extend
  Trustless Work. Whether you’re a developer, a product team, or seeding an AI
  agent — this page gives you everything.
cover: ../.gitbook/assets/TW Blog Images (Twitch Banner).png
coverY: 0
---

# 🚀 Developer Quickstart

{% hint style="success" %}
Hello! This page is optimized to be exported and loaded to your AI Agent of choice! you can also use ours in the Search Bar!
{% endhint %}

### 🚀 What Is Trustless Work?

Trustless Work is an Escrow-as-a-Service (EaaS) platform designed for the stablecoin economy. It lets you securely hold funds in non-custodial smart contracts until milestones are completed and approved.

Use it to:

* Lock funds with programmable milestone logic
* Enable transparent fund releases for services, grants, rentals, etc.
* Automate fund flows using signer-based roles

### 🧪 Quickstart — Deploy Your First Escrow

▶ [Try the Demo](https://demo.trustlesswork.com/) — No code required

#### Pre-requisites

* [Freighter](https://www.freighter.app/) wallet
* Testnet USDC + XLM ([Get test tokens](https://docs.trustlesswork.com/tools-and-utilities/testnet-tokens))

#### Step-by-Step

1. Open the [demo app](https://demo.trustlesswork.com/)
2. Fill in escrow details (roles, milestones)
3. Click deploy → sign the transaction
4. Send testmet USDC to the escrow contract address
5. Mark, approve, and release milestones from the UI

***

### ✍️ 2. Design Your Escrow Lifecycle

Before deploying, define:

* Who can **mark milestones** as done
* Who must **approve work**
* Who can **release funds**
* Who can **resolve disputes**

→ [Escrow Roles & Permissions](../technology-overview/roles-in-trustless-work.md)

***

### 📬 API Overview

Get your API key in our dApp: \
[request-api-key.md](request-api-key.md "mention")

The Trustless Work API is your gateway to deploy and manage decentralized smart escrows on the Stellar blockchain using Soroban smart contracts. All interactions return unsigned XDRs, which must be signed client-side using the wallet associated with the correct role.

**📘 Base URL:** `https://api.trustlesswork.com`

***

#### 🔨 Deployment

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/deployer/single-release` | Deploys a single-release escrow |
| POST   | `/deployer/multi-release`  | Deploys a multi-release escrow  |

***

#### 💸 Funding

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/escrow/{type}/fund-escrow` | Returns XDR to fund an escrow |

***

#### ✅ Milestone Handling

| Method | Endpoint                                 | Description                             |
| ------ | ---------------------------------------- | --------------------------------------- |
| POST   | `/escrow/{type}/approve-milestone`       | Approve a milestone                     |
| POST   | `/escrow/{type}/change-milestone-status` | Mark a milestone as complete/incomplete |

***

#### 🏁 Finalization

| Method | Endpoint                                 | Description                   |
| ------ | ---------------------------------------- | ----------------------------- |
| POST   | `/escrow/{type}/release-funds`           | Release all funds (single)    |
| POST   | `/escrow/{type}/release-milestone-funds` | Release one milestone (multi) |

***

#### ⚠️ Disputes

| Method | Endpoint                                   | Description                             |
| ------ | ------------------------------------------ | --------------------------------------- |
| POST   | `/escrow/{type}/dispute-escrow`            | Raise a dispute on a single escrow      |
| POST   | `/escrow/{type}/resolve-dispute`           | Resolve a single-release escrow dispute |
| POST   | `/escrow/{type}/dispute-milestone`         | Raise dispute on a milestone            |
| POST   | `/escrow/{type}/resolve-milestone-dispute` | Resolve milestone dispute (multi)       |

***

#### 🔄 Escrow Updates

| Method | Endpoint                       | Description                   |
| ------ | ------------------------------ | ----------------------------- |
| POST   | `/escrow/{type}/update-escrow` | Update escrow metadata/config |

***

#### 📊 Query & Tracking

| Method | Endpoint                                     | Description                            |
| ------ | -------------------------------------------- | -------------------------------------- |
| GET    | `/escrow/{type}/get-escrow`                  | Retrieve full escrow state             |
| GET    | `/escrow/{type}/get-multiple-escrow-balance` | Batch balances for many escrows        |
| GET    | `/helper/get-escrows-by-signer`              | Query escrows associated with a signer |
| GET    | `/helper/get-escrows-by-role`                | Query escrows by role assignment       |

***

#### 🧰 Helper Utilities

| Method | Endpoint                   | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| POST   | `/helper/set-trustline`    | Enable escrow wallet to accept a token |
| POST   | `/helper/send-transaction` | Submit signed XDR to Stellar           |

***

> 📌 For full Swagger documentation, visit: [https://dev.api.trustlesswork.com/docs](https://dev.api.trustlesswork.com/docs)
>
> All write actions must be signed by the wallet that holds the corresponding escrow role (marker, approver, releaser, resolver).

### 🧠 React SDK Integration

NPM: [`@trustless-work/escrow`](https://www.npmjs.com/package/@trustless-work/escrow)

```bash
npm i @trustless-work/escrow

```

#### Provider Setup

```tsx
import {
  TrustlessWorkConfig,
  development, // or mainNet
} from "@trustless-work/escrow";

export function TrustlessWorkProvider({ children }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  return (
    <TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
      {children}
    </TrustlessWorkConfig>
  );
}

```

#### Wrap your app:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TrustlessWorkProvider>
          {children}
        </TrustlessWorkProvider>
      </body>
    </html>
  );
}

```

> Once wrapped, you can use the SDK's escrow hooks and mutation functions across your app.

***

### 🔑 Wallets & Passkeys

Every role (marker, approver, releaser, etc.) needs a Stellar-Soroban compatible wallet.

Supported wallets:

* [Freighter](https://www.freighter.app/)
* [Passkey Wallets](https://docs.trustlesswork.com/tools-and-utilities/passkey-wallets) _(biometric, contract-based)_

***

### 🔁 Escrow Lifecycle Explained

1. **Initiation** – Define roles, asset, and milestones
2. **Funding** – Deposit stablecoins (USDC) into the contract
3. **Milestone Marked** – Provider marks progress
4. **Approval** – Client or approver signs off
5. **Release** – Funds are released
6. **Dispute** – Optional: Resolver steps in

> Each action requires a signature from the assigned wallet address.

***

### 🧩 Roles & Permissions

| Role             | Description                                  |
| ---------------- | -------------------------------------------- |
| Marker           | Marks milestones as completed                |
| Approver         | Approves milestone completion                |
| Releaser         | Signs off final release of funds             |
| Resolver         | Can override flow in case of dispute         |
| Receiver         | Gets the released funds                      |
| Platform Address | Receives a fee (optional, % of each release) |

***

### 📐 Escrow Schema Reference (for agents & devs)

#### Shared Fields

| Key            | Type   | Description                                |
| -------------- | ------ | ------------------------------------------ |
| `engagementId` | string | Unique identifier for the escrow           |
| `title`        | string | Name of the escrow                         |
| `description`  | string | Description of the escrow's function       |
| `roles`        | object | Role assignments: marker, approver, etc.   |
| `platformFee`  | number | % fee for the platform                     |
| `trustline`    | object | Token type (e.g., USDC, XLM) and decimals  |
| `receiverMemo` | number | Optional memo for custodial wallet routing |

#### Milestone Object (for multi-release only)

| Field         | Type   | Description                           |
| ------------- | ------ | ------------------------------------- |
| `description` | string | What the milestone represents         |
| `status`      | string | Status: approved, in\_dispute, etc.   |
| `amount`      | number | Amount released upon approval         |
| `evidence`    | string | (Optional) Supporting proof           |
| `flags`       | object | Includes disputed, resolved, approved |

#### Trustline Object

| Field      | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| `address`  | string | Token issuer or address              |
| `decimals` | number | Number of decimals in the token unit |

***

### 🛠 Developer Tools & Links

* 🔗 [API Docs](https://api.trustlesswork.com/docs)
* 🧪 [Demo dApp](https://demo.trustlesswork.com/)
* Github [https://github.com/Trustless-Work](https://github.com/Trustless-Work)
* 📦 [React SDK (NPM)](https://www.npmjs.com/package/@trustless-work/escrow)
* 📖 [Wallet Setup Guide](https://docs.trustlesswork.com/tools-and-utilities/stellar-wallets)

***

### 🤝 Join the Ecosystem

* 🧵 Twitter/X: [@trustlesswork](https://x.com/trustlesswork)
* 🌐 Docs Hub: [docs.trustlesswork.com](https://docs.trustlesswork.com/)

***

> Built for the stablecoin economy. Open-source. Developer-first.

Let us know what you’re building!
