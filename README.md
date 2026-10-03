# AI Agent Signer — Trustless Work MCP Prototype

> **First prototype toward a Trustless Work Multi-Client Protocol (MCP)**
> A minimal autonomous agent that can sign and submit Stellar transactions for escrow actions.

---

## 🎯 Objective

Build a lightweight agent that:

1. Controls its own **Stellar Testnet** address (non-custodial keypair)
2. Interacts with the **Trustless Work API** to fetch unsigned XDRs
3. **Signs** the XDR locally
4. **Submits** the signed transaction
5. Logs all activity for auditability

This is the foundation for future agent-based compliance and automation layers in escrow workflows.

---

## 📦 Setup

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**

### Installation

```bash
git clone <repo-url>
cd trustlesswork-agent-signer
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|---|---|
| `STELLAR_PRIVATE_KEY` | Agent's Stellar secret key (or leave empty to auto-generate) |
| `STELLAR_NETWORK_PASSPHRASE` | `"Test SDF Network ; September 2015"` for Testnet |
| `TW_API_BASE_URL` | Trustless Work API base URL |
| `TW_API_KEY` | API key for Trustless Work (if required) |
| `SCOPED_ESCROW_ID` | Optional: specific escrow ID to process |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

### Rules Configuration

Edit `rules.json` to define auto-approval conditions:

```json
{
  "defaultThreshold": 1000,
  "rules": [
    { "condition": "description_contains", "value": "accepted", "action": "approve" },
    { "condition": "amount_below", "threshold": 1000, "action": "approve" }
  ]
}
```

---

## 🔄 Flow Diagram

```
┌──────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│   Agent      │────▶│  Trustless Work API │────▶│  Stellar Testnet│
│  (Stellar    │◀────│  (GET escrow, POST  │◀────│  (Horizon)      │
│   keypair)   │     │   XDR request)      │     │                 │
└──────────────┘     └─────────────────────┘     └─────────────────┘
       │                      │                          │
       ▼                      ▼                          ▼
  Sign XDR              Return unsigned             Verify +
  locally               XDR envelope                store result
```

---

## 🚀 Usage

### Run the agent

```bash
npm start
```

### Run tests

```bash
npm test
```

### Example output

```
=== Trustless Work Agent Signer v0.1 ===

[AGENT] Public key: GABC...XYZ
[AGENT] API base: https://api.staging.trustlesswork.com

--- Processing escrow: escrow_abc123 ---
[ESCROW] Status: pending_approval
[ESCROW] Amount: 500 XLM
[ESCROW] Description: Milestone accepted by marker

[RULE] Rule matched → action: approve
[ACTION] Requesting unsigned XDR for: approve
[XDR] Unsigned envelope: AAAA...
[SIGNED] Signed by GABC...XYZ
[SIGNED] XDR: AAAA...
[SUBMIT] Submitting signed transaction...
[SUBMIT] Submitted successfully!
[LOG] 2025-01-15T10:30:00Z approve escrow=escrow_abc123 tx=abc123...
```

---

## 📁 Log Files

All agent activity is logged to `logs/agent-log.jsonl`:

```jsonl
{"action":"approve","publicKey":"GABC...","escrowId":"escrow_abc123","txHash":"abc123...","status":"submitted","timestamp":"2025-01-15T10:30:00Z"}
```

---

## 🔒 Security & Limitations

- **Testnet only** — this prototype operates exclusively on Stellar Testnet.
- **No key sharing** — private keys stay local; never commit `.env` or keys.
- **Auto-generated keys** — if `STELLAR_PRIVATE_KEY` is not set, a random keypair is generated per run.
- **Simple rules** — the rule engine is hardcoded and not suitable for production without hardening.
- **Rotate secrets** — regenerate keys and rotate API keys regularly.

---

## ✅ Acceptance Criteria Checklist

- [x] Agent performs at least one escrow action on Stellar Testnet
- [x] Action is verifiable on the Trustless Work API
- [x] Reproducible README with setup steps
- [x] No private keys committed to code
- [x] Rule layer with simple auto-approval logic

---

## 🧠 What Worked / What Didn't

### What worked
- Generating Stellar keypairs and signing XDRs locally
- Submitting transactions to the Stellar Testnet network
- Logging all activity in structured JSONL format

### What didn't / known gaps
- The exact Trustless Work API endpoints for requesting unsigned XDRs may vary from the staging docs
- `SCOPED_ESCROW_ID` must be manually set for now (no automated discovery)
- The Horizon `TransactionApi` may need adjustment for the latest SDK version

---

## 📝 References

- [Trustless Work Docs](https://docs.trustlesswork.com)
- [Escrow Lifecycle](https://docs.trustlesswork.com/trustless-work/core-concepts/escrow-lifecycle)
- [Escrow API Reference](https://docs.trustlesswork.com/trustless-work/api-reference)
- [Stellar JavaScript SDK](https://stellar.github.io/js-stellar-sdk/)
