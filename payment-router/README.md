# Soroban Payment Router v1

A Soroban smart contract that receives funds and distributes them to configured recipients using basis points.

## Features

- **Configurable recipients** with basis point allocations (10,000 bps = 100%)
- **Recipient-triggered distribution** – any configured recipient can initiate payout
- **Transparent events** for all operations
- **Input validation** – prevents misconfiguration at initialization
- **Rounding handling** – first recipient receives remainder to ensure 100% distribution

## Quick Start

### Build

```bash
cargo build --release
```

### Test

```bash
cargo test --lib
```

## Contract API

### `initialize(admin: Address, token: Address, recipients: Vec<Recipient>) -> Result<(), Error>`

Initializes the router with a fixed set of recipients and allocations.

**Requirements:**
- Total basis points must equal exactly 10,000
- No recipient can have 0 bps
- Recipient list cannot be empty
- No duplicate recipients
- Can only be called once

**Example:**
```
recipients = [
  { address: seller, bps: 8500 },
  { address: platform, bps: 1499 },
  { address: automation, bps: 1 }
]
// Total: 10,000 bps
```

### `distribute() -> Result<(), Error>`

Distributes the contract's token balance to all recipients according to configured basis points.

**Requirements:**
- Caller must be one of the configured recipients
- Contract balance must be > 0

**Behavior:**
- Calculates each recipient's share: `balance * bps / 10,000`
- First recipient receives the remainder (if any)
- Emits event for each transfer
- Returns error if caller is not a recipient

### `get_config() -> Result<(Address, Address, Vec<Recipient>), Error>`

Returns the stored configuration: (admin, token, recipients).

## Examples

### Example 1: Grant Payout (3 recipients)

```
Seller:     8,500 bps (85%)
Platform:   1,499 bps (14.99%)
Automation:     1 bps (0.01%)
Total:     10,000 bps
```

If balance = 1,000,000 stroops:
- Seller gets:     850,000 + 1 (remainder) = 850,001
- Platform gets:   149,900
- Automation gets: 99

### Example 2: Revenue Split (2 recipients)

```
Partner A:  6,000 bps (60%)
Partner B:  4,000 bps (40%)
Total:     10,000 bps
```

## Rounding / Remainder

The contract uses integer division. When `balance * bps / 10,000` creates a remainder, it goes to the first recipient in the list.

**Why first recipient?** The recipient list order is caller-controlled at initialization, making the behavior explicit and predictable.

**Example:**
```
balance = 10 stroops
recipient A: 3,334 bps → 3 stroops
recipient B: 6,666 bps → 6 stroops
remainder: 1 stroop

Final:
recipient A: 3 + 1 = 4 stroops
recipient B: 6 stroops
Total: 10 stroops ✓
```

## Storage

All state is stored in **Persistent** storage using typed `DataKey`:

- `DataKey::Initialized` – bool (contract initialized?)
- `DataKey::Admin` – Address (admin, for reference)
- `DataKey::Token` – Address (SEP-41 token contract)
- `DataKey::Recipients` – Vec<Recipient> (all recipients + allocations)

The entire recipient list is serialized as one key for efficiency (single read/write per operation).

## Authorization

`distribute()` requires the caller to be one of the configured recipients. This is verified via address comparison before state is read, so the recipient list itself is public but `require_auth()` is called to ensure the transaction is signed.

## Events

The contract emits events for transparency:

- `("router", "init")` – router initialized (admin, token, recipient_count)
- `("router", "distrib")` – distribution executed (caller, total_amount)
- `("router", "paid")` – recipient paid (recipient, amount, bps)

## Error Codes

- `AlreadyInitialized = 1` – `initialize()` called twice
- `NotInitialized = 2` – Operation on uninitialized contract
- `InvalidBpsTotal = 3` – Total bps ≠ 10,000
- `EmptyRecipientList = 4` – No recipients provided
- `ZeroBps = 5` – Recipient with 0 bps
- `DuplicateRecipient = 6` – Recipient appears twice
- `Unauthorized = 7` – Caller not a configured recipient
- `ZeroBalance = 8` – Attempted distribution with 0 balance

## Design Notes

### Why Recipient-Triggered Distribution?

1. **No privileged signer.** No backend key that needs rotation.
2. **Self-incentivized.** Recipients have economic reason to trigger distribution.
3. **Automation as a recipient.** Automation service can receive a small bps allocation (e.g., 1 bps) and gain access to `distribute()` without separate permissions.

### Why Immutable Recipients?

v1 makes recipients immutable after initialization. This:
- Simplifies the contract (no admin-gated update logic)
- Makes the allocation structure explicit and auditable
- Prevents fund flow surprises mid-distribution

v2 could add recipient updates with time-locks or multi-sig governance.

### Production Readiness

**Before mainnet:**
- Audit security of authorization patterns and arithmetic
- Add TTL management strategy (bump persistence keys)
- Consider minimum distribution threshold (prevent dust-grain calls)
- Integrate with Trustless Work keeper for operational monitoring

## Integration with Trustless Work

A Trustless Work escrow can be configured to release funds to this router contract. The flow:

```
1. Escrow release triggers transfer to router address
2. Any configured recipient calls distribute()
3. Router splits funds according to allocations
4. Each recipient receives their share
```

No changes to Trustless Work escrow contracts are required.

## Future Extensions

Potential v2 improvements:
- Admin-gated recipient updates (with time-lock)
- Multiple token support
- Minimum distribution threshold
- Emergency pause
- TTL extension automation
- Proportional remainder distribution (largest-remainder method)
