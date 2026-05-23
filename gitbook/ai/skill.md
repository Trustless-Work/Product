---
description: >-
  AI coding assistants full context about Trustless Work, including escrow
  flows, XDR signing, SDK patterns, and integration best practices.
icon: robot
---

# Skill

## @trustless-work/skill

[![skills.sh](https://skills.sh/b/trustless-work/trustless-work-dev-skill)](https://skills.sh/trustless-work/trustless-work-dev-skill)

Install AI skills and verify Trustless Work integrations directly from your terminal using Skills.sh.

***

## Installation

No global installation required.

Install the skill directly using:

```
npx skills add trustless-work/trustless-work-dev-skill
```

This automatically installs the Trustless Work skill into your supported AI agent.

***

## Skills.sh

The Trustless Work skill is distributed through Skills.sh:

* Skills Registry: [https://www.skills.sh/trustless-work](https://www.skills.sh/trustless-work)

Skills.sh provides a standardized ecosystem for installing reusable AI agent skills across different coding assistants.

***

## Why are Skills Useful?

### Without a skill

You repeatedly explain the same integration details in every conversation:

> "Trustless Work is an escrow protocol on Stellar..."

> "The deploy endpoint returns an unsigned XDR transaction..."

> "The user must sign it with their wallet..."

> "The trustline uses the issuer address, not the contract address..."

This wastes time and often leads to integration mistakes.

***

### With a skill

The AI already understands all of this context.

You can immediately ask things like:

> "Generate the escrow deployment flow for my freelance marketplace."

And the assistant can produce accurate, idiomatic, production-ready code from the start.

Skills are especially useful for:

* Faster onboarding for new developers
* Reducing integration mistakes
* Maintaining consistency across projects
* Keeping AI assistants updated with the latest SDK/API changes

***

## The Trustless Work Skill

The Trustless Work Skill installs a curated knowledge base for building escrow integrations on Stellar using Trustless Work.

It teaches your AI assistant how to correctly integrate:

* Trustless Work REST API
* `@trustless-work/escrow`
* `@trustless-work/blocks`

The skill includes architecture guidance, API references, integration patterns, lifecycle flows, and production best practices.

***

## What the Skill Teaches the AI

The skill helps the AI understand critical implementation details such as:

* Every write operation returns an unsigned XDR transaction that must be signed by the correct wallet
* Trustline fields require the Stellar issuer address (`G...`) — not the contract address (`C...`)
* Trustlines must be added directly from the user's wallet
* Correct provider nesting order: \<QueryClientProvider> \<TrustlessWorkConfig> \<WalletProvider>
* Milestone approvals are irreversible on-chain
* API rate limits and retry patterns
* Correct XDR signing workflows
* Recommended frontend architecture patterns
* Production integration checklists

***

## Supported AI Agents

Currently supported:

* Claude Code
* Gemini CLI

***

## Keeping the Skill Updated

To update installed skills to the latest version:

```
npx skills update
```

This refreshes all installed skill files and ensures your AI assistant stays aligned with the latest Trustless Work APIs and SDKs.

***

## Verifying Your Integration

The Trustless Work skill also includes integration verification capabilities.

The verifier statically analyzes your codebase and detects common integration mistakes before deployment.

It can validate:

### REST API integrations

* API key usage
* Environment variable configuration
* Correct XDR signing flows
* Proper base URLs
* Rate limit handling

### SDK integrations (`@trustless-work/escrow`)

* Provider setup
* Wallet integration
* QueryClient configuration
* Engagement handling
* Client component requirements

### Blocks integrations (`@trustless-work/blocks`)

* Dependency installation
* Provider nesting order
* Wallet configuration
* Approval UX patterns
* Trustline guidance flows
