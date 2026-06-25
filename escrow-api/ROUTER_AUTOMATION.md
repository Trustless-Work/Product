# Payment Router Automation Service (Spike v2)

A NestJS backend that triggers `distribute()` on a Soroban Payment Router contract whenever funds arrive. The automation signer pattern: the backend holds a keypair registered as a small-bps recipient on the router, giving it the authority to call `distribute()` without admin privileges.

---

## Architecture

```
Trustless Work escrow releases funds
        ↓
Funds arrive in Payment Router contract
        ↓
POST /api/router/distribute  ←  internal trigger / webhook
        ↓
Validate x-automation-secret header
        ↓
Validate routerContractId against ROUTER_CONTRACT_ID allowlist
  └── (if ROUTER_CONTRACT_ID is unset, allowlist check is skipped)
        ↓
Check router token balance via simulateTransaction (no gas cost)
  └── balance = 0  →  return { status: "skipped", reason: "zero_balance" }
        ↓
Build distribute() Soroban transaction
        ↓
Sign with AUTOMATION_SECRET_KEY
        ↓
Submit to Stellar testnet
        ↓
Poll for confirmation
        ↓
Return { status: "success", txHash: "..." }
```

---

## Example Router Configuration

The automation signer holds 1 bps so it can trigger `distribute()`:

| Recipient           | bps        | %       |
|---------------------|------------|---------|
| Seller              | 8 500      | 85.00%  |
| Platform            | 1 499      | 14.99%  |
| Automation signer   | 1          | 0.01%   |
| **Total**           | **10 000** | **100%**|

The automation account has no admin powers — it only earns 0.01% in exchange for being authorised to trigger distributions.

---

## End-to-End Setup Guide

Follow these steps in order to go from zero to a confirmed `{"status":"success"}` response.

### Step 1 — Generate and fund the automation signer keypair

```bash
# Name comes before flags
stellar keys generate automation-signer --network testnet
stellar keys address automation-signer     # → public key (G...)
stellar keys show automation-signer        # → secret key (S...)

# Fund on testnet via Friendbot
curl "https://friendbot.stellar.org?addr=<PUBLIC_KEY>"
```

### Step 2 — Deploy the Payment Router contract

Build and deploy the Soroban Payment Router from source (see Issue #244). The deploy command outputs the contract ID you'll use throughout.

```bash
# From the contract workspace directory
stellar contract deploy \
  --wasm target/wasm32v1-none/release/contract.wasm \
  --source automation-signer \
  --network testnet
# → outputs: C...  (your ROUTER_ID)
```

### Step 3 — Initialize the router

Register the automation signer as a recipient so it is authorised to call `distribute()`. All bps values must sum to exactly 10 000.

```bash
stellar contract invoke \
  --id <ROUTER_ID> \
  --source automation-signer \
  --network testnet \
  -- initialize \
  --token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --recipients "[{\"address\":\"<AUTOMATION_PUBLIC_KEY>\",\"bps\":10000}]"
```

> `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` is the native XLM Stellar Asset Contract (SAC) on testnet. Substitute your own token contract if the router distributes a different asset — it must match `USDC_CONTRACT_ID` in `.env`.

### Step 4 — Fund the router with tokens

The service returns `skipped` when the balance is zero. The router must hold funds before you call `distribute()`.

```bash
stellar contract invoke \
  --id CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --source automation-signer \
  --network testnet \
  -- transfer \
  --from <AUTOMATION_PUBLIC_KEY> \
  --to <ROUTER_ID> \
  --amount 100000000
# 100 000 000 stroops = 10 XLM
```

> After a successful `distribute()` the router balance returns to zero — all funds are paid out to recipients. Repeat this step to test another distribution.

### Step 5 — Configure the service

```bash
cd escrow-api
npm install
cp .env.example .env
```

Edit `.env` with your values:

```env
AUTOMATION_SECRET_KEY=<S... secret key from step 1>
AUTOMATION_PUBLIC_KEY=<G... public key from step 1>
ROUTER_CONTRACT_ID=<ROUTER_ID from step 2>
USDC_CONTRACT_ID=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
AUTOMATION_WEBHOOK_SECRET=<strong random secret — openssl rand -hex 32>
STELLAR_NETWORK=testnet
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

### Step 6 — Start the service

Node.js 20 or higher is required (compiled NestJS output uses syntax unsupported by older runtimes).

```bash
node --version  # must print v20.x or higher

npm run build
node dist/main.js
# → EscrowApi is running on http://localhost:3000
```

Or in development watch mode:

```bash
npm run start:dev
```

### Step 7 — Trigger distribution

```bash
curl -X POST http://localhost:3000/api/router/distribute \
  -H "Content-Type: application/json" \
  -H "x-automation-secret: <AUTOMATION_WEBHOOK_SECRET>" \
  -d '{
    "routerContractId": "<ROUTER_ID>",
    "reason": "escrow_released",
    "sourceEscrowId": "<ROUTER_ID>",
    "idempotencyKey": "escrow-release-001"
  }'
```

Expected response when the router has balance:

```json
{"status":"success","routerContractId":"C...","txHash":"abc123..."}
```

Expected response when the router is empty:

```json
{"status":"skipped","routerContractId":"C...","reason":"zero_balance"}
```

### Step 8 — Verify on-chain (optional)

```bash
curl -s https://soroban-testnet.stellar.org \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getTransaction","params":{"hash":"<txHash>"}}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['status'])"
# → SUCCESS
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `STELLAR_NETWORK` | No | `testnet` (default) or `mainnet` |
| `SOROBAN_RPC_URL` | No | RPC endpoint (defaults to Stellar testnet) |
| `AUTOMATION_SECRET_KEY` | **Yes** | Secret key of the automation signer account |
| `AUTOMATION_PUBLIC_KEY` | **Yes** | Public key matching the secret key |
| `ROUTER_CONTRACT_ID` | No | Comma-separated allowed Payment Router contract IDs. If unset, any contract ID is accepted — always set this in production. |
| `USDC_CONTRACT_ID` | **Yes** | SEP-41 token contract the router was initialized with. On testnet with native XLM: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` |
| `AUTOMATION_WEBHOOK_SECRET` | **Yes** | Shared secret for the `x-automation-secret` header |

---

## API Reference

### `POST /api/router/distribute`

Triggers the `distribute()` function on the specified Payment Router contract.

**Headers**

| Header | Value |
|---|---|
| `x-automation-secret` | Value of `AUTOMATION_WEBHOOK_SECRET` |
| `Content-Type` | `application/json` |

**Request body**

```json
{
  "routerContractId": "C...",
  "reason": "escrow_released",
  "sourceEscrowId": "C...",
  "idempotencyKey": "optional-unique-string"
}
```

| Field | Required | Description |
|---|---|---|
| `routerContractId` | **Yes** | Soroban contract ID of the Payment Router |
| `reason` | **Yes** | Human-readable trigger reason (logged for audit) |
| `sourceEscrowId` | No | Escrow contract that released the funds |
| `idempotencyKey` | No | Prevents duplicate processing; cached for 24 hours |

**Responses**

| Status | Body |
|---|---|
| `200 OK` (distributed) | `{"status":"success","routerContractId":"C...","txHash":"abc123..."}` |
| `200 OK` (zero balance) | `{"status":"skipped","routerContractId":"C...","reason":"zero_balance"}` |
| `400 Bad Request` | `{"statusCode":400,"message":"routerContractId is required..."}` |
| `401 Unauthorized` | `{"statusCode":401,"message":"Invalid or missing x-automation-secret header."}` |
| `500 Internal Error` | `{"statusCode":500,"message":"Failed to submit transaction: ..."}` |

---

## Running Tests

```bash
# Unit tests
npm test

# With coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test coverage

| Scenario | File |
|---|---|
| Rejects unauthorized requests (no/wrong secret) | `router.controller.spec.ts` |
| Rejects missing `routerContractId` | `router.controller.spec.ts` |
| Skips when router balance is zero | `router.service.spec.ts` |
| Calls `distribute()` when balance is positive | `router.service.spec.ts` |
| Handles failed signing (bad/missing key) | `router.service.spec.ts` |
| Handles failed transaction submission | `router.service.spec.ts` |
| Returns `txHash` on success | `router.service.spec.ts` |
| Deduplicates via idempotency key | `router.service.spec.ts` |

---

## Security Notes

- The `AUTOMATION_WEBHOOK_SECRET` protects the endpoint from unauthorised triggers. Use `openssl rand -hex 32` to generate one.
- The automation signer has no admin powers — it is only a small-bps recipient.
- If `ROUTER_CONTRACT_ID` is not set, the allowlist check is skipped. Always set it in production.
- Idempotency keys are cached in-memory for 24 hours. In a production deployment, back this with Redis or a database.
- This spike targets testnet only. Production key management (HSMs, vaults) is out of scope.

---

## Future Extensions (v3 ideas)

- Event listener that auto-triggers on router funding (no webhook needed)
- Redis-backed idempotency store for multi-instance deployments
- Retry queue with exponential backoff for failed distributions
- Vault-based key management (HashiCorp Vault, AWS KMS)
- Multi-router registry (monitor many routers in one service)
- Alerting on failed automation attempts
