# Trustless Work Faucet

## Overview  

This project is a **Stellar testnet token faucet**, designed to distribute test tokens for Trustless Work's escrow functionality.  

A new token called **TRUST** has been created on the Stellar testnet, along with new accounts for issuing and distributing the token.  

Additionally, the repository includes scripts that allow generating other accounts or test tokens if needed.  


## Features

- **Faucet Application**: A Next.js-based interface that allows users to request tokens.
- **Error Handling**: Validates wallet addresses before distributing tokens.
- **Documentation**: Includes detailed documentation on Token Details and How to Use.
- **Stellar Testnet Token Scripts**: Script for deploying a testnet token with predefined parameters.
- **Account Generation Scripts**: Scripts to create and configure issuer and distribution accounts, including funding and key management.

## Prerequisites

Before setting up, ensure you have the following installed:

```bash
- Node.js (v14 or higher)
- Git
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trustless-work-faucet.git
   cd trustless-work-faucet
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Faucet Application

Start the Next.js application:
```bash
npm run dev
```
This launches the local faucet interface.

## Scripts for Account and Token Management

This project includes additional scripts to generate issuer and distribution accounts, as well as to create tokens. These scripts allow users to set up new accounts and tokens as needed. 

For more details on how to use these scripts, please refer to the **[Scripts README](scripts/stellar/README.md)**.

## Monitoring Tools

You can use the following tools to monitor transactions:
- **[Stellar Expert](https://stellar.expert)**
- **[Stellar Laboratory](https://laboratory.stellar.org)**

## License

This project is licensed under the MIT License.