---
description: >-
  This guide is your all-in-one resource to integrate, deploy, and extend
  Trustless Work. Whether you’re a developer, a product team, or seeding an AI
  agent — this page gives you everything.
cover: ../.gitbook/assets/TW Blog Images (Twitch Banner).png
coverY: 0
---

# 🚀 Developer Quickstart

### Quick links

<table data-view="cards"><thead><tr><th>Title</th><th data-card-target data-type="content-ref">Link</th></tr></thead><tbody><tr><td>Try the Demo (no code)</td><td><a href="https://demo.trustlesswork.com/">https://demo.trustlesswork.com/</a></td></tr><tr><td>API basics (base URLs, Swagger, limits)</td><td><a href="introduction.md">introduction.md</a></td></tr><tr><td>Request an API key</td><td><a href="../developer-resources/request-api-key.md">request-api-key.md</a></td></tr><tr><td>Escrow roles</td><td><a href="../technology-overview/roles-in-trustless-work.md">roles-in-trustless-work.md</a></td></tr><tr><td>GitHub</td><td><a href="https://github.com/Trustless-Work">https://github.com/Trustless-Work</a></td></tr></tbody></table>

### What is Trustless Work?

Trustless Work is an Escrow-as-a-Service (EaaS) platform designed for the stablecoin economy. It lets you securely hold funds in non-custodial smart contracts until milestones are completed and approved.

Use it to:

* Lock funds with programmable milestone logic
* Enable transparent fund releases for services, grants, rentals, etc.
* Automate fund flows using signer-based roles

{% hint style="info" %}
Most write calls return an **unsigned XDR**. Your client signs it with the wallet for the role.
{% endhint %}

### Quickstart (demo): deploy your first escrow

Use this if you want to see the full lifecycle end-to-end.

#### Prerequisites

* [Freighter](https://www.freighter.app/) wallet
* Testnet USDC + XLM ([Testnet tokens](../stellar-and-soroban-the-backbone-of-trustless-work/testnet-tokens.md))

{% stepper %}
{% step %}
### Open the demo

Go to [demo.trustlesswork.com](https://demo.trustlesswork.com/) and connect your wallet.
{% endstep %}

{% step %}
### Configure the escrow

Set roles and milestones.
{% endstep %}

{% step %}
### Deploy and sign

Click **Deploy** and sign the transaction in your wallet.
{% endstep %}

{% step %}
### Fund with testnet USDC

Send testnet USDC to the escrow contract address shown in the UI.
{% endstep %}

{% step %}
### Run the flow

Mark milestones, approve, then release funds from the UI.
{% endstep %}
{% endstepper %}

### Design your escrow lifecycle

Define roles first. Everything else becomes simpler.

* Who marks milestones as done
* Who approves work
* Who releases funds
* Who resolves disputes

Read: [Roles in Trustless Work](../technology-overview/roles-in-trustless-work.md)

### API overview

Get the basics here: [Introduction](introduction.md).

Get a key here: [Request API Key](../developer-resources/request-api-key.md).

{% hint style="warning" %}
Every write action must be signed by the wallet that holds the corresponding escrow role.
{% endhint %}

<details>

<summary>Endpoints (grouped)</summary>

#### Deployment

* `POST /deployer/single-release` — Deploy a single-release escrow
* `POST /deployer/multi-release` — Deploy a multi-release escrow

#### Funding

* `POST /escrow/{type}/fund-escrow` — Returns XDR to fund an escrow

#### Milestones

* `POST /escrow/{type}/approve-milestone` — Approve a milestone
* `POST /escrow/{type}/change-milestone-status` — Mark milestone complete/incomplete

#### Finalization

* `POST /escrow/{type}/release-funds` — Release all funds (single-release)
* `POST /escrow/{type}/release-milestone-funds` — Release one milestone (multi-release)

#### Disputes

* `POST /escrow/{type}/dispute-escrow` — Raise a dispute on a single escrow
* `POST /escrow/{type}/resolve-dispute` — Resolve a single-release escrow dispute
* `POST /escrow/{type}/dispute-milestone` — Raise a dispute on a milestone
* `POST /escrow/{type}/resolve-milestone-dispute` — Resolve milestone dispute (multi-release)

#### Escrow updates

* `POST /escrow/{type}/update-escrow` — Update escrow metadata/config

#### Query & tracking

* `GET /escrow/get-multiple-escrow-balance` — Batch balances for many escrows
* `GET /helper/get-escrows-by-signer` — Query escrows associated with a signer
* `GET /helper/get-escrows-by-role` — Query escrows by role assignment

#### Helpers

* `POST /helper/set-trustline` — Enable escrow wallet to accept a token
* `POST /helper/send-transaction` — Submit signed XDR to Stellar

</details>

### SDK (React / TypeScript)

Package: [`@trustless-work/escrow`](https://www.npmjs.com/package/@trustless-work/escrow)

{% code title="Install" %}
```bash
npm install "@trustless-work/escrow"
```
{% endcode %}

{% hint style="info" %}
Use `development` for testnet and `mainNet` for mainnet.
{% endhint %}

{% code title="TrustlessWorkProvider.tsx" %}
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
{% endcode %}

{% code title="app/layout.tsx" %}
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TrustlessWorkProvider>{children}</TrustlessWorkProvider>
      </body>
    </html>
  );
}
```
{% endcode %}

### Wallets (roles)

Every role (marker, approver, releaser, etc.) needs a Stellar-Soroban compatible wallet.

Supported wallets:

* [Freighter](https://www.freighter.app/)
* [Passkey Wallets](https://docs.trustlesswork.com/tools-and-utilities/passkey-wallets) _(biometric, contract-based)_

### Escrow lifecycle (mental model)

1. **Initiation** – Define roles, asset, and milestones
2. **Funding** – Deposit stablecoins (USDC) into the contract
3. **Milestone Marked** – Provider marks progress
4. **Approval** – Client or approver signs off
5. **Release** – Funds are released
6. **Dispute** – Optional: Resolver steps in

{% hint style="info" %}
Each action requires a signature from the assigned wallet address.
{% endhint %}

### Roles & permissions

| Role             | Description                                  |
| ---------------- | -------------------------------------------- |
| Marker           | Marks milestones as completed                |
| Approver         | Approves milestone completion                |
| Releaser         | Signs off final release of funds             |
| Resolver         | Can override flow in case of dispute         |
| Receiver         | Gets the released funds                      |
| Platform Address | Receives a fee (optional, % of each release) |

### Escrow schema reference (compact)

<details>

<summary>Shared fields</summary>

| Key            | Type   | Description                                                      |
| -------------- | ------ | ---------------------------------------------------------------- |
| `engagementId` | string | Unique identifier for the escrow                                 |
| `title`        | string | Escrow name                                                      |
| `description`  | string | Escrow purpose                                                   |
| `roles`        | object | Role assignments: marker, approver, releaser, resolver, receiver |
| `platformFee`  | number | Platform fee percentage                                          |
| `trustline`    | object | Asset metadata (e.g., USDC) and decimals                         |

</details>

<details>

<summary>Milestone object (multi-release only)</summary>

| Field         | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `description` | string | What the milestone represents        |
| `status`      | string | Status (e.g., approved, in\_dispute) |
| `amount`      | number | Amount released upon approval        |
| `evidence`    | string | Optional supporting proof            |
| `flags`       | object | Includes disputed/resolved/approved  |

</details>

<details>

<summary>Trustline object</summary>

| Field     | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| `address` | string | Token issuer or contract address |

</details>

### More resources

* [API docs (Swagger)](https://api.trustlesswork.com/docs)
* [Demo dApp](https://demo.trustlesswork.com/)
* [React SDK (NPM)](https://www.npmjs.com/package/@trustless-work/escrow)
* [Stellar wallets](../stellar-and-soroban-the-backbone-of-trustless-work/stellar-wallets/)

### Join the ecosystem

* 🧵 Twitter/X: [@trustlesswork](https://x.com/trustlesswork)
* 🌐 Docs Hub: [docs.trustlesswork.com](https://docs.trustlesswork.com/)

> Built for the stablecoin economy. Open-source. Developer-first.

Let us know what you’re building!
