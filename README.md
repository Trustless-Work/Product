<p align="center"> <img src="https://github.com/user-attachments/assets/5b182044-dceb-41f5-acf0-da22dea7c98a" alt="CLR-S (2)"> </p>

# Trustless Work | [API Documentation](https://docs.trustlesswork.com/trustless-work)

Trustless Work is the Escrow Ecosystem for Stellar. We're building tools to integrate escrows into any payment flow using Soroban smart contracts and stablecoins like USDC.

# Maintainers | 

- Tech Rebel | Product Manager [techrebelgit](https://github.com/techrebelgit) 
- Joel Vargas | Frontend Developer [JoelVR17](https://github.com/JoelVR17)
- Armando Murillo | Full Stack Developer [armandocodecr](https://github.com/armandocodecr)
- Caleb Loría | Smart Contract Developer [zkCaleb-dev](https://github.com/zkCaleb-dev) 

# Welcome to the Trustless Work Product Repository 🚀

This repo is the hub for spikes, POCs, docs, and research advancing our EaaS platform on Stellar/Soroban. Explore integrations for our suite: Next.js dApps (backoffice, demoLad, Escrow Viewer, Pacto p2p) and the website.

## 📂 Folder Structure

Each folder focuses on a research/POC area. Add/update via PRs. Table below (sorted alphabetically):

| Folder | Description | Key Tech/Notes | Last Activity |
|--------|-------------|---------------|---------------|
| allbridge-poc | POC for Allbridge cross-chain bridges to fund escrows. | Stellar SDK, dependabot security. | Last week |
| dashboard-tw-wallet | Wallet dashboard with safe transaction calculations. | Number.isFinite, Next.js. | 5 months ago |
| eliza-plugin-stellar | Eliza plugin for handling Stellar transactions. | Stellar tx processing. | 6 months ago |
| escrow-api | API for escrow operations and management. | Backend updates, integrates with Soroban. | 5 months ago |
| escrow-viewer | Tool to view escrows via Stellar RPC. | Next.js (v15.2.4), like a custom explorer. | 4 months ago |
| EventResearch | Research on Soroban events for funding/status changes. | Event emissions in contracts. | 6 months ago |
| faucet | Testnet faucet for tokens like $TRUST/USDC. | Next.js (v15.2.4), for demo testing. | 2 months ago |
| gitbook | Gitbook integrations for docs syncing. | GITBOOK-375 changes. | 2 days ago |
| Indexer-Spikes | Spikes integrating Soroban events with subquery indexers. | Subquery for efficient queries (#114). | 20 minutes ago |
| MoonPay | POC integrating MoonPay for fiat-to-escrow funding. | form-data deps, Next.js UI. | 18 minutes ago |
| NestJs Stress Test | Stress tests for Nest.js backends in escrow flows. | Dependabot merges, scalability focus. | Last week |
| Price-Oracle-Contract | Soroban contract for price oracles in asset pricing. | Dynamic pricing for multi-asset escrows. | 5 months ago |
| RAG AI Gitbook Knowledge | RAG AI trained on Gitbooks for knowledge transfer. | @supabase deps, AI for ecosystem growth. | 2 weeks ago |
| reclaim-protocol-integration | Integration with Reclaim for ZK proofs in escrows. | on-headers/compression deps, privacy enhancements. | 2 weeks ago |
| Research | General research on org, features, and updates. | Foundational spikes. | 7 months ago |
| Timebased Escrows | Integrations/docs for time-locked escrows on Soroban. | Release mechanisms explained. | 5 months ago |
| XDR Transaction Signer | Tool for signing XDR transactions on Stellar. | multer/@nestjs deps, secure signing. | 3 months ago |

## 🛠️ Product Suite Overview

| Product | Description | Tech Stack | Repo Link |
|---------|-------------|------------|-----------|
| Backoffice dApp | Admin dashboard for escrow management. | Next.js, Soroban Client, Freighter. | [dApp-Trustless-Work](https://github.com/Trustless-Work/dApp-Trustless-Work) |
| demoLad dApp | Demo for escrow testing/signing. | Next.js, @stellar/stellar-sdk v12+. | [demo-Trustless-Work](https://github.com/Trustless-Work/demo-Trustless-Work) |
| Escrow Viewer | Viewer for live escrows. | TypeScript, Stellar RPC. | [escrow-viewer](https://github.com/Trustless-Work/escrow-viewer) |
| Pacto p2p | P2P escrow platform. | Next.js, Soroban contracts. | In dev—track issues |
| Trustless Work Website | Onboarding/docs site. | Next.js, Firebase. | [Website](https://github.com/Trustless-Work/Trustless-Work-Website) |

## 🚀 Getting Started

1. Clone: `git clone https://github.com/Trustless-Work/Product.git`
2. Prerequisites: Node v20+, Rust/Soroban SDK v20+, Freighter wallet, Stellar Testnet setup.
3. Build/Run: For Soroban folders, `cargo build --target wasm32-unknown-unknown`; for Next.js, `npm i && npm run dev`.

## 🙌 How to Contribute

- **Issues/PRs**: Use templates; branch as `spike/your-folder-update`; test on Testnet.
- **Style**: Prettier/ESLint for Next.js; rustfmt for Soroban.
- **Bounties**: [OnlyDust](https://app.onlydust.com/p/trustless-work-).
- Join [Discussions](https://github.com/Trustless-Work/Product/discussions) or Telegram.

## 💡 About Trustless Work

EaaS on Stellar: Secure, programmable escrows eliminating intermediaries. Aligned with Stellar Core v21+ (2025).

Thanks to contributors—let's scale the escrow ecosystem! 🌟




## **Thanks to all the contributors who have made this project possible!**

[![Contributors](https://contrib.rocks/image?repo=Trustless-Work/Product)](https://github.com/Trustless-Work/Product/graphs/contributors)
