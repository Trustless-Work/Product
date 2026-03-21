---
icon: robot
---

# Skill

## @trustless-work/skill

> Install AI skills and verify Trustless Work integrations directly from your terminal.

[![npm version](https://img.shields.io/npm/v/@trustless-work/skill)](https://www.npmjs.com/package/@trustless-work/skill) [![npm downloads](https://img.shields.io/npm/dm/@trustless-work/skill)](https://www.npmjs.com/package/@trustless-work/skill)

***

### What are AI Skills?

Modern AI coding assistants like **Claude Code** or **Gemini CLI** are general-purpose tools — they know a lot about programming, but they don't inherently understand your specific product, your API conventions, or the nuances of your integration patterns.

**Skills** solve this problem. A skill is a curated set of markdown files injected into the AI agent's context directory, so the assistant can read them as reference material when helping you write, debug, or review code. Think of it as giving the AI a focused manual for a specific integration — without any fine-tuning or model changes.

A skill typically contains:

* Core concepts and mental models for the product
* API and SDK reference documentation
* Lifecycle guides and role definitions
* Working code examples and common patterns
* Pre-production checklists

When the AI agent starts a session, it can access these files and apply their knowledge to every suggestion it makes. The result is an assistant that understands your stack deeply — and that you don't have to re-explain every time.

***

### Why are Skills Useful?

#### Without a skill

You spend time explaining the same context on every conversation:

> "Trustless Work is an escrow protocol on Stellar... the deploy endpoint returns an unsigned XDR transaction... you need to sign it with the funder's wallet... the trustline is set with the issuer address, not the contract address..."

#### With a skill

The AI already knows all of that. You can go straight to:

> "Generate the escrow deployment flow for my freelance marketplace."

And it will produce correct, idiomatic code on the first try.

Skills are especially valuable for:

* **Onboarding new developers** — the AI can guide them with accurate context
* **Reducing integration errors** — the AI flags wrong patterns before they ship
* **Staying up to date** — run `update` when the skill releases a new version and your AI is immediately current

***

### The Trustless Work Skill

The `@trustless-work/skill` package installs a curated knowledge base about **Trustless Work Escrow-as-a-Service** into your preferred AI coding assistant. It covers everything your AI needs to help you build correct, production-ready escrow integrations on Stellar.

#### What the skill teaches the AI

| Topic             | Content                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Core concepts** | What Trustless Work is, escrow types, the XDR signing pattern                                                                |
| **Roles**         | All 9 roles (Service Provider, Approver, Release Signer, Receiver, Platform Address, Dispute Resolver) and their permissions |
| **Lifecycle**     | The 6 phases from Initiation to Release and Dispute Resolution                                                               |
| **REST API**      | Endpoints, authentication, base URLs, deployment payloads, rate limits                                                       |
| **SDK**           | React/Next.js hooks, `TrustlessWorkConfig` provider setup, TypeScript types                                                  |
| **Blocks**        | Pre-built UI components, provider nesting order, peer dependencies                                                           |
| **Examples**      | Full working integration scenarios for API and SDK                                                                           |
| **Checklist**     | Pre-production verification items before going live                                                                          |

#### Critical details the skill encodes

These are the most common integration mistakes — the skill teaches the AI to catch them:

* Every write operation returns an **unsigned XDR transaction** that must be signed by the correct role before submission
* The `trustline` field in the deploy payload requires the Stellar **issuer address** (`G…`) — not the contract address (`C…`)
* Trustlines must be added from the **user's own wallet** — there is no API call for this
* Provider nesting order matters: `QueryClientProvider → TrustlessWorkConfig → WalletProvider`
* Milestone approvals are **irreversible on-chain**
* API rate limit is **50 requests per 60 seconds**

***

### Supported AI Agents

| Agent           | Status         | Skill path                       |
| --------------- | -------------- | -------------------------------- |
| **Claude Code** | ✅ Supported    | `.claude/skills/trustless-work/` |
| **Gemini CLI**  | ✅ Supported    | `.gemini/skills/trustless-work/` |
| **OpenCode**    | 🔜 Coming soon | —                                |

***

### Installation

No global install required. Run directly with `npx`:

```bash
npx @trustless-work/skill
```

An interactive prompt will guide you through three steps:

**Step 1 — Select your AI agent**

```
? Which AI agent are you using?
  ❯ Claude Code
    Gemini CLI
```

**Step 2 — Select an action**

```
? What would you like to do?
  ❯ Install skill
    Verify integration
```

**Step 3 — Choose a product preset** _(install only)_

```
? Which Trustless Work products are you using?
  ❯ REST API only
    SDK only
    Blocks only
    REST API + SDK
    Full stack (API + SDK + Blocks)
```

The selected skill files are copied to your agent's context directory. From that moment, your AI assistant has full knowledge of the Trustless Work integration surface.

***

### Keeping the Skill Updated

As the Trustless Work API and SDK evolve, so does the skill. To update all installed skills to the latest version:

```bash
npx @trustless-work/skill update
```

This automatically detects which agents have the skill installed and refreshes all template files.

***

### Verifying Your Integration

Beyond installing context for the AI, the CLI includes an **integration verifier** that statically analyzes your codebase and reports issues before you deploy to production.

```bash
npx @trustless-work/skill
# Select: Verify integration
```

The verifier detects your project type (Next.js, React SPA, Node.js backend) and runs targeted checks based on which Trustless Work products you're using.

#### What gets verified

**REST API usage**

* API key is loaded from an environment variable (not hardcoded)
* Requests include the `x-api-key` header
* Base URLs are correct for testnet and mainnet
* XDR signing pattern is implemented correctly
* Rate limit handling is present

**SDK usage (`@trustless-work/escrow`)**

* Package is installed
* `TrustlessWorkConfig` provider wraps the application
* `"use client"` directive is present where required
* `QueryClientProvider` is placed before `TrustlessWorkConfig`
* `engagementId` is passed when creating escrows
* Stellar Wallets Kit is integrated for XDR signing

**Blocks usage (`@trustless-work/blocks`)**

* Package and all peer dependencies are installed
* Provider nesting order is correct
* `"use client"` is set on layout files
* `WalletNetwork` is configured
* `setSelectedEscrow` pattern is used correctly
* Approval confirmation dialogs are implemented
* Trustline guidance is present in the UI

#### Verification report

Each check returns one of three statuses:

| Status  | Meaning                           |
| ------- | --------------------------------- |
| ✅ OK    | Correctly implemented             |
| ⚠️ WARN | Works but not production-ready    |
| ❌ FAIL  | Critical issue that must be fixed |

Every finding includes a description, what was detected, and a "how to fix" guide with a link to the relevant documentation.

The report is printed to the console and also saved as a markdown file at:

* `.claude/skills/trustless-work/report.md` _(Claude Code)_
* `.gemini/skills/trustless-work/report.md` _(Gemini CLI)_

This file can be committed to your repository or shared with reviewers.

***

### Skill File Structure

After installation, the following files are available in your agent's skill directory:

```
.claude/skills/trustless-work/        (or .gemini/...)
├── SKILL.md                          # Core concepts, roles, lifecycle, XDR pattern
├── references/
│   ├── api.md                        # REST API reference
│   ├── sdk.md                        # React/Next.js SDK reference
│   ├── blocks.md                     # Pre-built UI components
│   ├── examples.md                   # Full integration examples
│   └── checklist.md                  # Pre-production checklist
└── meta.json                         # Install metadata (agent, preset, version, date)
```

You can read any of these files directly in your editor. They are plain markdown — no special tooling required.

***

### Requirements

* **Node.js** >= 18.0.0
* One of the supported AI agents installed on your machine

***

### Quick Reference

| Command                            | Description                   |
| ---------------------------------- | ----------------------------- |
| `npx @trustless-work/skill`        | Interactive install or verify |
| `npx @trustless-work/skill update` | Update all installed skills   |

**npm:** [npmjs.com/package/@trustless-work/skill](https://www.npmjs.com/package/@trustless-work/skill)
