# Trustless Work Spikes

Spikes and explorations for the Trustless Work SDK.

## SDK Documentation

### Core Functions

#### `executeTransaction`
Executes a transaction on-chain through a multi-party computation (MPC) wallet.

**Required Payload:**
```typescript
{
  to: string;        // Recipient address
  value: bigint;     // Amount to send (in Wei)
  data?: string;     // Calldata (optional)
  gasLimit?: bigint; // Gas limit (optional)
}
```

**Returns:** Transaction receipt hash upon successful execution.

---

#### `signMessage`
Signs a message using the MPC wallet's private key without broadcasting.

**Required Payload:**
```typescript
{
  message: string;   // Message to sign (will be hashed)
  from: string;      // Wallet address initiating the sign
}
```

**Returns:** Signed message as a signature string.

---

#### `getBalance`
Retrieves the ETH (or ERC-20) balance of the MPC wallet.

**Required Payload:**
```typescript
{
  address?: string;  // Optional: specific address to query
  token?: string;    // Optional: ERC-20 token contract address
}
```

**Returns:** Balance as a bigint (in Wei or token decimals).

---

#### `createWallet`
Creates a new MPC wallet with distributed key shares.

**Required Payload:**
```typescript
{
  threshold: number;       // Required signatures (e.g., 2 of 3)
  participants: number;    // Total number of key holders
  chainId?: number;        // Target chain ID (optional, defaults to Base)
}
```

**Returns:** Wallet deployment transaction hash and participant shares.

---

### Error Handling

All SDK functions throw errors with the following structure:
```typescript
{
  code: string;      // Error code (e.g., "INSUFFICIENT_FUNDS")
  message: string;   // Human-readable message
  details?: any;     // Additional context
}
