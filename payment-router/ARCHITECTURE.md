# Architecture Notes — Payment Router v1

This document explains the key design decisions made during the spike, the
tradeoffs considered, and what would need to change before a production
deployment.

---

## Storage layout

All contract state uses **Persistent** storage via a typed `DataKey` enum.

```
DataKey::Initialized  →  bool
DataKey::Admin        →  Address
DataKey::Token        →  Address
DataKey::Recipients   →  Vec<Recipient>
```

### Why a single `Vec<Recipient>` instead of separate maps?

The recipient list is always read and written as a unit: during `initialize`
we validate the whole list; during `distribute` we iterate every entry. Keeping
it as a single key means **one storage read per operation** instead of N reads
for N recipients.

The tradeoff is that the entire list is re-serialised on every write, but since
`initialize` is the only write path for recipients (they are immutable after
that), this is a one-time cost.

### TTL management

Persistent entries on Soroban have a ledger-based TTL. The contract bumps all
keys to `TTL_LEDGERS` (≈ 1 year at 5 s/ledger) after every mutating call. A
dedicated `extend_ttl()` entry point lets a keeper refresh state cheaply
without triggering distribution.

Production deployments should integrate with an automation service (e.g. a
Trustless Work keeper or a simple cron job) to call `extend_ttl()` before
expiry.

---

## Access control: recipient-triggered distribution

### Decision

`distribute()` requires the caller to be one of the configured recipients. No
admin, no separate keeper address.

### Rationale

1. **No privileged signer required.** There is no backend key that must be
   kept secure and rotated.
2. **Self-incentivised.** Every recipient has an economic reason to trigger
   distribution (they receive their share).
3. **Automation as a recipient.** A small `bps` allocation (e.g. 1 bps) can be
   awarded to an automation service. It gains access to `distribute()` and
   earns a micro-fee for doing so — no separate authorisation logic needed.

### What was confusing

The Soroban `require_auth()` pattern means the **transaction-level signature
must come from the caller address**. This is different from EVM patterns where
`msg.sender` is implicit. Callers must explicitly sign the invocation, which is
the correct Soroban idiom but took time to internalise.

---

## Rounding / remainder handling

### The problem

Integer division of `balance * bps / 10_000` creates a remainder for most
real-world balances. Example:

```
balance  = 10 stroops
recipient A: bps = 3_334  →  floor(10 × 3334 / 10000) = floor(3.334) = 3
recipient B: bps = 6_666  →  floor(10 × 6666 / 10000) = floor(6.666) = 6
total distributed = 9
remainder = 1
```

### v1 decision: first recipient receives the remainder

```
A's final share = 3 + 1 = 4
B's final share = 6
```

The remainder is bounded by `recipient_count - 1` stroops (or token
micro-units). For any realistic distribution amount this is economically
negligible.

### Tradeoffs considered

| Approach | Pro | Con |
|---|---|---|
| First recipient gets remainder | Simple; predictable | Slightly favours first recipient |
| Last recipient gets remainder | Same simplicity | Slightly favours last recipient |
| Accumulate remainder in contract | No bias | Dust accumulates; needs separate sweep |
| Proportional second pass | Most accurate | Expensive; may still have residual |
| Distribute remainder to triggering caller | Incentive for distribution | Complex; changes caller share |

We chose **first recipient** because the recipient list order is
caller-controlled at initialisation time, making the behaviour explicit and
predictable. The spec recommends this approach.

### v2 improvement

If sub-stroop fairness matters, a v2 could implement the **largest-remainder
method**: compute real shares, rank recipients by fractional part, and award
remainder units starting from the largest fraction. This is mathematically
optimal but adds complexity.

---

## Duplicate detection

We use an O(n²) inner-loop scan. With a practical cap of ~20 recipients this
costs at most 190 comparisons — negligible gas. A `Map`-based O(n) check would
require an extra storage allocation.

---

## What would need to change for production

1. **Security audit.** The arithmetic and auth patterns should be reviewed by a
   Soroban-specialist auditor before mainnet deployment.

2. **Recipient updates.** v1 makes recipients immutable after initialization.
   A production system may need an admin-gated update path (with a time-lock or
   multi-sig) to handle contributor changes.

3. **Multiple token support.** The router currently holds one token. A v2 could
   hold multiple assets and distribute each independently, but the storage and
   API surface grows considerably.

4. **Minimum distribution threshold.** Allowing distribution of 1-stroop
   balances wastes gas. A configurable minimum threshold prevents nuisance
   calls.

5. **Emergency pause / admin override.** A production deployment may want an
   admin-controlled pause that prevents distribution in case of a bug or
   dispute.

6. **Formal TTL strategy.** The current TTL bump is a best-effort mechanism.
   A production system should have a monitored keeper and should document TTL
   responsibilities in the operational runbook.

---

## Trustless Work integration path

A Trustless Work escrow can be configured with the router contract as its
**release receiver**. The escrow release transaction sends the full payment
amount to `router_address`. Any configured recipient can then call
`distribute()` to split the funds.

```
Escrow release ──► transfer to router ──► recipient calls distribute() ──► funds split
```

No changes to Trustless Work escrow contracts are required. The only
requirement is that the escrow's receiver field is set to the router's contract
address at deployment time.

### Open questions for a follow-up spike

- Should the router be able to act as a receiver for multiple independent
  escrows simultaneously? (Yes, but the current v1 distributes the **total**
  balance, not per-escrow amounts.)
- Should the router emit a reference ID tying a distribution to a specific
  escrow release? (Indexer-friendly but requires the caller to supply the ID.)
- Can the router be re-used across multiple projects, or is one-router-per-
  project the right model? (One per project is simpler; re-use would require
  recipient update support.)

---

## What was straightforward

- Soroban's `contracttype` and `contracterror` macros made the data and error
  types clean to define.
- The `token::Client` interface is well-designed; `balance()` and `transfer()`
  are exactly what you'd expect.
- The test environment (`Env::default()` + `mock_all_auths()`) makes unit
  testing fast and deterministic.

## What was confusing

- **Symbol length limit.** `symbol_short!` is limited to 9 bytes; longer event
  names require `Symbol::new()` with runtime cost. This is a Soroban-specific
  constraint not obvious from the documentation headline.
- **`require_auth` placement.** Auth must be checked *before* reading state
  that reveals privileged data, but *after* you know who the caller is. The
  ordering in `distribute` (check recipient list first, then `require_auth`)
  leaks whether an address is a recipient to an unauthenticated observer — this
  is acceptable for a public recipient list but worth documenting.
- **`Vec` iteration in no_std.** Soroban's `Vec` returns items by value
  (cloning from the ledger), which is unfamiliar compared to Rust's standard
  iterator adapters.

---

## Assumptions made

1. The token address is a SEP-41-compliant Soroban token (not a classic
   Stellar asset that has not been wrapped).
2. Recipient lists are small enough (< 100) that O(n²) duplicate detection and
   full-list serialisation are acceptable.
3. All recipients are Soroban-account addresses (not contracts); if a recipient
   is itself a contract it must implement the SEP-41 receive interface.
4. The admin address is stored for reference but has no special runtime
   privileges in v1.

---

## Recommended next steps

1. Add an `extend_ttl` automation integration (Trustless Work keeper or cron).
2. Write a Trustless Work demo that deploys a router, creates an escrow with
   the router as receiver, and walks through a full release → distribute flow.
3. Consider the largest-remainder method for fairer dust distribution.
4. Explore a `receive(escrow_id)` entry point that logs which escrow release
   funded a given distribution (useful for indexers and audits).
5. Get a community review before recommending this pattern for production
   Trustless Work integrations.
