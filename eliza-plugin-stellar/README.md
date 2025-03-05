# Stellar Plugin for ElizaOS

A plugin for ElizaOS that enables signing and processing of Stellar blockchain transactions.

## Overview

This plugin allows ElizaOS agents to interact with the Stellar blockchain by:
- Signing Stellar transactions using XDR format
- Supporting both Public and Testnet networks
- Validating and processing transactions
- Managing memory for tracking processed transactions
- Automatically extracting XDR from conversations

## Features

### Transaction Signing

The plugin can sign Stellar transactions provided in XDR format using a configured secret key. It supports both the Stellar Public network and Testnet.

### XDR Extraction

The plugin includes an evaluator that automatically detects and extracts Stellar XDR transaction strings from user messages, triggering appropriate actions when valid XDRs are found.

### Transaction Management

Transactions are stored in memory with metadata about their type, context, and processing status, allowing for tracking of transaction history.

## Configuration

The plugin requires the following environment variables or runtime settings:

## Prerequisites

- Node.js 23+
- pnpm
- TypeScript knowledge

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Compile the TypeScript code:
```bash
pnpm tsc
```
3. Add your stellar secret key to .env file
```bash
STELLAR_SECRET_KEY=''
```

4. Run the project using the 'direct' client:
```bash
pnpm exec node --loader ts-node/esm ./src/scripts/load-with-plugin.ts --characters=./characters/eternalai.character.json
```

**Note:** Only the 'direct' client will work within this repo since it uses mocked capabilities of the real client. Plugins developed here can be directly transposed into the main Eliza repository.

## Running the Project

You can run the project using the following command:

```bash
pnpm exec node --loader ts-node/esm ./src/scripts/load-with-plugin.ts --characters=./characters/eternalai.character.json
```

**Alternatively,** to simplify this process, use the predefined script:

```bash
pnpm mock-eliza --characters=./characters/eternalai.character.json
```

This script will prompt for a comma-separated list of character files to load.

**Note:** The 'mock-eliza' script uses the 'direct' client because the project contains mocked capabilities of the real client.