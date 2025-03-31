# Trustless Work Wallet Dashboard

This is a Next.js-based dashboard for managing Trustless Work wallet.

## Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager
- A modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Trustless-Work/Product.git
cd dashboard-tw-wallet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure the constants in `src/lib/constants.ts`:
```typescript
export const API_BASE_URL = 'https://horizon-testnet.stellar.org';
export const DEFAULT_ACCOUNT_ID = 'GA6KH5VWPCHBOEF63X57SPX6T4H366YFFKKGCVDBTXT2N7JVL6PJCK7G';
export const TRANSACTIONS_PER_PAGE = 10;
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## Features

- Web3 wallet integration
- Transaction management
- Balance tracking

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS


## Contributing

[Add contribution guidelines]

## License

[Add license information]
