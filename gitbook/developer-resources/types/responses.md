---
icon: reply
layout:
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
---

# Responses

### Escrow's Response Entity

```typescript
import { Date, EscrowType, Status } from "./types";
import {
  Flags,
  MultiReleaseEscrow,
  MultiReleaseMilestone,
  Roles,
  SingleReleaseEscrow,
  SingleReleaseMilestone,
  Trustline,
} from "./types.entity";

/**
 * Escrow's Response like fund, release, change, etc ...
 */
export type EscrowRequestResponse = {
  /**
   * Status of the request
   */
  status: Status;

  /**
   * Unsigned transaction
   */
  unsignedTransaction?: string;
};

/**
 * Send Transaction Response
 */
export type SendTransactionResponse = {
  /**
   * Status of the request
   */
  status: Status;

  /**
   * Message of the request
   */
  message: string;
};

/**
 * Initialize Escrow Response
 */
export type InitializeSingleReleaseEscrowResponse = EscrowRequestResponse & {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: SingleReleaseEscrow;

  /**
   * Message of the request
   */
  message: string;
};

/**
 * Initialize Multi Release Escrow Response
 */
export type InitializeMultiReleaseEscrowResponse =
  InitializeSingleReleaseEscrowResponse & {
    /**
     * Escrow data
     */
    escrow: MultiReleaseEscrow;
  };

/**
 * Update Escrow Response
 */
export type UpdateSingleReleaseEscrowResponse =
  InitializeSingleReleaseEscrowResponse;

/**
 * Update Multi Release Escrow Response
 */
export type UpdateMultiReleaseEscrowResponse =
  InitializeMultiReleaseEscrowResponse;

/**
 * Get Balances Response
 */
export type GetEscrowBalancesResponse = {
  /**
   * Address of the escrow
   */
  address: string;

  /**
   * Balance of the escrow
   */
  balance: number;
};

/**
 * Get Escrows From Indexer Response
 */
export type GetEscrowsFromIndexerResponse = {
  signer?: string;
  contractId?: string;
  engagementId: string;
  title: string;
  roles: Roles;
  description: string;
  amount: number;
  platformFee: number;
  balance?: number;
  milestones:
    | SingleReleaseMilestone[]
    | (MultiReleaseMilestone[] & { disputeStartedBy: Roles });
  flags?: Flags;
  trustline: Trustline & { name: string };
  receiverMemo?: number;
  disputeStartedBy?: string;
  fundedBy?: string;
  isActive?: boolean;
  approverFunds?: string;
  receiverFunds?: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  type: EscrowType;
};

```

