# Findings: Goldsky – Detecting Direct Escrow Funding

## Overview
Explored indexing direct USDC transfers to escrow contracts using `account_credited` effect on Stellar Testnet.

## Observations
- `account_credited` fired reliably: ✅
- Matched escrow contracts via hardcoded filter: ✅
- Fields extracted (amount, asset, from): ✅
- Linked to testnet deployments from dApp: ✅

## Implementation Details

### Configuration Files
1. `goldsky.yaml` - Main indexer configuration file
2. `schema.graphql` - GraphQL schema definition for `EscrowFundingEvent`
3. `parsing-logic.js` - JavaScript parsing logic for account_credited effects

### Schema Definition
```graphql
type EscrowFundingEvent {
  id: ID!
  escrowAddress: String!
  from: String!
  amount: String!
  asset: String!
  ledger: BigInt!
  timestamp: BigInt!
}
```

### Parsing Logic
The parsing logic extracts the following fields from account_credited effects:
- `escrowAddress`: The escrow contract that was credited (effect.account)
- `from`: The account that sent the funds (effect.source_account or effect.operation_source_account)
- `amount`: The amount credited (effect.amount)
- `asset`: The asset credited (effect.asset_type, effect.asset_code, effect.asset_issuer)
- `ledger`: The ledger sequence number (ledger.sequence)
- `timestamp`: The ledger timestamp (ledger.timestamp)

### Filtering
Currently, the implementation uses a hardcoded list of known escrow contract addresses for filtering. In a production environment, this should be replaced with a dynamic registry of escrow contracts.

## Recommendations
- Use for tracking bypassed funding flows
- Add escrow registry for dynamic filtering
- Consider webhook on new funding detection
- Implement proper error handling and logging
- Add unit tests for the parsing logic

## Sample Query
```graphql
query {
  escrowFundingEvents {
    escrowAddress
    from
    amount
    asset
    timestamp
  }
}
```

## Testing Instructions
1. Deploy a new escrow contract on Stellar Testnet
2. Send USDC to the escrow contract address manually (not via fund_escrow)
3. Confirm that a new EscrowFundingEvent appears in your Goldsky endpoint

## Future Enhancements
- Integration with a contract registry for dynamic escrow contract detection
- Webhook notifications for real-time funding event notifications
- Additional filtering options for different asset types
- Enhanced error handling and logging
- Performance optimizations for high-volume scenarios