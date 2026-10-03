# Trustless Work - Escrow Viewer with SorobanHooks Integration

This is the Escrow Viewer component integrated with SorobanHooks to display transaction history for escrow contracts.

## Features

- **Transaction History**: View SorobanHooks transaction history for any escrow contract
- **Watcher Creation**: Enable automatic tracking of contract transactions
- **Activity Timeline**: Beautiful timeline display of all contract interactions
- **Real-time Updates**: Refresh transaction data with a single click

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a contract address in the lookup field
2. Select the chain type (testnet/mainnet)
3. Click "Lookup Contract"
4. View the transaction history from SorobanHooks
5. If no history exists, click "Enable Watcher" to start tracking

## SorobanHooks API Integration

This viewer integrates with the SorobanHooks API:

- **Fetch Transactions**: `GET /v1/api/contract/transactions?address=<contractAddress>&page=1&limit=25`
- **Create Watcher**: `POST /v1/api/get_contract_transaction`

## Testing

To test this feature:

1. Create a testnet escrow using the Trustless Work BackOffice
2. Use the generated contract address in the Viewer
3. Verify transaction history appears (or create a watcher)
4. Perform actions on the escrow (fund, mark milestone)
5. Return to the Viewer and confirm new transactions appear

## Repository

- [Trustless Work Spikes](https://github.com/Trustless-Work/trustlesswork-spikes)
- [SorobanHooks Documentation](https://sorobans-organization.gitbook.io/sorobans-organization-docs/sorobanhooks/contract-watchers)
- [Viewer](https://viewer.trustlesswork.com/)
