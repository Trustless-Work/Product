# SDK Required Payloads

This document details all required payloads for the Trustless Work SDK functions.

## Transaction Execution

### executeTransaction
```typescript
interface ExecuteTransactionPayload {
  /** Destination address */
  to: string;
  
  /** Amount in Wei */
  value: bigint;
  
  /** Hex-encoded calldata (optional) */
  data?: string;
  
  /** Gas limit override (optional) */
  gasLimit?: bigint;
}
```

## Message Signing

### signMessage
```typescript
interface SignMessagePayload {
  /** Message content to be signed */
  message: string;
  
  /** Signer wallet address */
  from: string;
}
```

## Balance Queries

### getBalance
```typescript
interface GetBalancePayload {
  /** Optional address to query (defaults to wallet address) */
  address?: string;
  
  /** Optional ERC-20 token address (for token balances) */
  token?: string;
}
```

## Wallet Creation

### createWallet
```typescript
interface CreateWalletPayload {
  /** Number of required signatures (M in M-of-N scheme) */
  threshold: number;
  
  /** Total number of participants holding key shares */
  participants: number;
  
  /** Target chain ID (optional, defaults to Base mainnet: 8453) */
  chainId?: number;
}
