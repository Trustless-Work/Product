---
icon: sack-dollar
---

# Fund Escrow

### Single & Multi Release

```typescript
/**
 * Fund Escrow Payload, this can be a single-release or multi-release
 */
export type FundEscrowPayload = {
  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: number;

  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};
```
