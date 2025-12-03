---
icon: face-angry
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Start Dispute

### Single Release

```typescript
/**
 * Single Release Start Dispute Payload. This starts a dispute for the entire escrow.
 */
export type SingleReleaseStartDisputePayload = {
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

### Multi Release

```typescript
/**
 * Multi Release Start Dispute Payload. This starts a dispute for a specific milestone.
 */
export type MultiReleaseStartDisputePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;

  /**
   * Index of the milestone to be disputed
   */
  milestoneIndex: string;
};
```
