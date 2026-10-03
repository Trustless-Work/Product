# Stellar Lab <> Escrow Interaction Tutorial

This tutorial demonstrates how to interact with Stellar's Escrow feature using the [Stellar Laboratory](https://laboratory.stellar.org/) interface and the Stellar SDK.

## Prerequisites

- A Stellar account (testnet or mainnet)
- SEP-10 compliant wallet
- Basic understanding of Stellar smart contracts

## Overview

Stellar's Escrow feature allows three-party transactions where funds are held until certain conditions are met. This tutorial covers:

1. Creating an escrow arrangement
2. Funding the escrow account
3. Release conditions and execution
4. Refund scenarios

## Tutorial Steps

### Step 1: Setup

Before interacting with escrow, ensure you have:
- A source account (the party initiating the escrow)
- A recipient account (the party receiving funds conditionally)
- A signer account (the trusted third party who releases funds)

### Step 2: Create the Escrow Arrangement

Use the following parameters in Stellar Laboratory's contract interaction tab:

```javascript
// Contract function call to create escrow
const createEscrowParams = {
  from: "source_account_address",
  to: "recipient_account_address", 
  signer: "signer_account_address",
  amount: 100, // in stroops (1 XLM = 10,000,000 stroops)
  releaseCondition: "SHA256_HASH_OF_SECRET",
  refundCondition: "SHA256_HASH_OF_SECRET"
};
```

### Step 3: Funding the Escrow

The source account must fund the escrow contract account with the specified amount.

### Step 4: Releasing Funds

When conditions are met, the signer calls the release function with the preimage that satisfies the release condition.

### Step 5: Refunding

If conditions aren't met within the timeframe, the source account can call the refund function.

## API Reference

See the full API documentation at [stellar.org/developers](https://stellar.org/developers).

## Security Considerations

- Always use testnet for development
- Verify signer addresses before creating escrow
- Set appropriate timeout periods
- Store secret hashes securely
