---
icon: dollar-sign
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

# Get Balances

### Params

```typescript
/**
 * Get Balance Params
 */
export type GetBalanceParams = {
  /**
   * Addresses of the escrows to get the balance
   */
  addresses: string[];
};
```
