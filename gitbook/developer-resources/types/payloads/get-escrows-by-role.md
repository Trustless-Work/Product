---
icon: head-side-gear
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

# Get Escrows by Role

### Params

```typescript
/**
 * Get Escrows From Indexer By Role Params
 */
export type GetEscrowsFromIndexerByRoleParams = {
  /**
   * Page number. Pagination
   */
  page?: number;

  /**
   * Sorting direction. Sorting
   */
  orderDirection?: "asc" | "desc";

  /**
   * Order by property. Sorting
   */
  orderBy?: "createdAt" | "updatedAt" | "amount";

  /**
   * Created at = start date. Filtering
   */
  startDate?: string;

  /**
   * Created at = end date. Filtering
   */
  endDate?: string;

  /**
   * Max amount. Filtering
   */
  maxAmount?: number;

  /**
   * Min amount. Filtering
   */
  minAmount?: number;

  /**
   * Is active. Filtering
   */
  isActive?: boolean;

  /**
   * Escrow that you are looking for. Filtering
   */
  title?: string;

  /**
   * Engagement ID. Filtering
   */
  engagementId?: string;

  /**
   * Status of the single-release escrow. Filtering
   */
  status?: SingleReleaseEscrowStatus;

  /**
   * Type of the escrow. Filtering
   */
  type?: EscrowType;

  /**
   * If true, the escrows will be validated on the blockchain to ensure data consistency.
   * This performs an additional verification step to confirm that the escrow data
   * returned from the indexer matches the current state on the blockchain.
   * Use this when you need to ensure the most up-to-date and accurate escrow information.
   * If you active this param, your request will take longer to complete.
   */
  validateOnChain?: boolean;

  /**
   * Role of the user. Required
   */
  role: Role;

  /**
   * Address of the owner of the escrows. If you want to get all escrows from a specific role, you can use this parameter. But with this parameter, you can't use the signer parameter.
   */
  roleAddress: string;
};

```
