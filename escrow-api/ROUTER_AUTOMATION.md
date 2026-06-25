# Payment Router Automation Service (Spike v2)

A NestJS backend that triggers `distribute()` on a Soroban Payment Router contract whenever funds arrive. This is the automation signer pattern: the backend holds a keypair that is configured as a small-bps recipient on the router, giving it the authority to call `distribute()`.

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
Validate routerContractId is in allowed list
        ↓
Check USDC balance of router via simulation (no gas cost)
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

## Example Router Configuration (v2)

The automation signer holds 1 bps so it can trigger `distribute()`:

| Recipient           | bps   | %       |
|---------------------|-------|---------|
| Seller              | 8 500 | 85.00%  |
| Platform            | 1 499 | 14.99%  |
| Automation signer   | 1     | 0.01%   |
| **Total**           | **10 000** | **100%** |

The automation account does **not** have admin powers. It only earns 0.01% in exchange for being allowed to trigger distributions.

## Prerequisites

- Node.js 20+
- A funded Stellar testnet account for the automation signer
- A deployed Soroban Payment Router contract with the automation signer as a recipient

## Local Setup

```bash
# 1. Install dependencies
cd escrow-api
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — see "Environment Variables" section below

# 3. Start the service
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `STELLAR_NETWORK` | No | `testnet` (default) or `mainnet` |
| `SOROBAN_RPC_URL` | No | RPC endpoint (defaults to Stellar testnet) |
| `AUTOMATION_SECRET_KEY` | **Yes** | Secret key of the automation signer account |
| `AUTOMATION_PUBLIC_KEY` | **Yes** | Public key matching the secret key |
| `ROUTER_CONTRACT_ID` | **Yes** | Comma-separated allowed Payment Router contract IDs |
| `USDC_CONTRACT_ID` | **Yes** | USDC Soroban contract ID (for balance check) |
| `AUTOMATION_WEBHOOK_SECRET` | **Yes** | Shared secret for `x-automation-secret` header |

### Generating a testnet keypair

```bash
# Using the Stellar CLI
stellar keys generate --network testnet automation-signer
stellar keys address automation-signer     # → public key
stellar keys show automation-signer        # → secret key (starts with S)

# Fund it on testnet
curl "https://friendbot.stellar.org?addr=<PUBLIC_KEY>"
```

## API

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

**Success response** (`200 OK`)

```json
{
  "status": "success",
  "routerContractId": "C...",
  "txHash": "a1b2c3d4..."
}
```

**Skipped response** (balance is zero)

```json
{
  "status": "skipped",
  "routerContractId": "C...",
  "reason": "zero_balance"
}
```

**Error response** (`500`)

```json
{
  "statusCode": 500,
  "message": "Failed to submit transaction: ..."
}
```

**Auth error** (`401`)

```json
{
  "statusCode": 401,
  "message": "Invalid or missing x-automation-secret header."
}
```

### Testing the endpoint locally

```bash
# Trigger distribution
curl -X POST http://localhost:3000/api/router/distribute \
  -H "Content-Type: application/json" \
  -H "x-automation-secret: your-webhook-secret" \
  -d '{
    "routerContractId": "CYOUR_ROUTER_CONTRACT_ID",
    "reason": "escrow_released",
    "sourceEscrowId": "CYOUR_ESCROW_CONTRACT_ID",
    "idempotencyKey": "escrow-release-001"
  }'
```

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

## Security Notes

- The `AUTOMATION_WEBHOOK_SECRET` protects the endpoint from unauthorised triggers. Use `openssl rand -hex 32` to generate it.
- The automation signer has **no admin powers** on the contract it is only a 1 bps recipient.
- Idempotency keys are cached in-memory for 24 hours. In a production deployment, back this with Redis or a database.
- This spike targets testnet only. Production key management (HSMs, vaults) is out of scope.

## Future Extensions (v3 ideas)

- Event listener that auto-triggers on router funding (no webhook needed)
- Redis-backed idempotency store for multi-instance deployments
- Retry queue with exponential backoff for failed distributions
- Vault-based key management (HashiCorp Vault, AWS KMS)
- Multi-router registry (monitor many routers in one service)
- Alerting on failed automation attempts
