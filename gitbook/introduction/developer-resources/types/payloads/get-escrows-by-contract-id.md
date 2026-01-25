---
icon: table
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

# Get Escrows by Contract ID

### Params

```typescript
/**
 * Get Escrow From Indexer By Contract Ids Params
 */
export type GetEscrowFromIndexerByContractIdsParams = {
  /**
   * IDs (addresses) that identifies the escrow contracts.
   */
  contractIds: string[];

  /**
   * If true, the escrows will be validated on the blockchain to ensure data consistency.
   * This performs an additional verification step to confirm that the escrow data
   * returned from the indexer matches the current state on the blockchain.
   * Use this when you need to ensure the most up-to-date and accurate escrow information.
   * If you active this param, your request will take longer to complete.
   */
  validateOnChain?: boolean;
};
```
