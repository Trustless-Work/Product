---
icon: thumbs-up
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

# Approve Milestone

### Single & Multi Release

```typescript
/**
 * Approve Milestone Payload, this can be a single-release or multi-release
 */
export type ApproveMilestonePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Index of the milestone to be updated
   */
  milestoneIndex: string;

  /**
   * New evidence of work performed by the service provider.
   */
  newEvidence?: string;

  /**
   * Address of the entity requiring the service.
   */
  approver: string;
};
```
