---
icon: square-dollar
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

# Release Funds

### Single Release

```typescript
/**
 * Single Release Release Funds Payload
 */
export type SingleReleaseReleaseFundsPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;
};
```

### Multi Release

```typescript
/**
 * Multi Release Release Funds Payload
 */
export type MultiReleaseReleaseFundsPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;

  /**
   * Index of the milestone to be released
   */
  milestoneIndex: string;
};
```
