---
icon: table
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

# Payloads

### Escrow's Payload Entity

```typescript
import { MultiReleaseEscrow, SingleReleaseEscrow } from "./types.entity";

/**
 * Documentation: https://docs.trustlesswork.com/trustless-work/developer-resources/quickstart/integration-demo-project/entities
 */

// ----------------- Milestone Payloads -----------------
/**
 * Single Release Milestone Payload
 */
export type SingleReleaseMilestonePayload = {
  /**
   * Text describing the function of the milestone
   */
  description: string;
};

/**
 * Multi Release Milestone Payload
 */
export type MultiReleaseMilestonePayload = {
  /**
   * Text describing the function of the milestone
   */
  description: string;
  /**
   * Amount to be transferred upon completion of this milestone
   */
  amount: number;
};

// ----------------- Initialize Escrow -----------------
/**
 * Single Release Initialize Escrow Payload
 */
export type InitializeSingleReleaseEscrowPayload = Omit<
  SingleReleaseEscrow,
  "contractId" | "balance" | "milestones"
> & {
  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: SingleReleaseMilestonePayload[];
};

/**
 * Multi Release Initialize Escrow Payload
 */
export type InitializeMultiReleaseEscrowPayload = Omit<
  MultiReleaseEscrow,
  "contractId" | "balance" | "milestones"
> & {
  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: MultiReleaseMilestonePayload[];
};

// ----------------- Update Escrow -----------------
/**
 * Single Release Update Escrow Payload
 */
export type UpdateSingleReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<SingleReleaseEscrow, "contractId" | "signer" | "balance">;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Multi Release Update Escrow Payload
 */
export type UpdateMultiReleaseEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<MultiReleaseEscrow, "contractId" | "signer" | "balance">;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

// ----------------- Change Milestone Status -----------------
/**
 * Change Milestone Status Payload, this can be a single-release or multi-release
 */
export type ChangeMilestoneStatusPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Index of the milestone to be updated
   */
  milestoneIndex: string;

  /**
   * New status of the milestone
   */
  newStatus: string;

  /**
   * New evidence of work performed by the service provider.
   */
  newEvidence?: string;

  /**
   * Address of the entity providing the service.
   */
  serviceProvider: string;
};

// ----------------- Approve Milestone -----------------
/**
 * Approve Milestone Payload, this can be a single-release or multi-release
 */
export type ApproveMilestonePayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  /**
   * Address of the entity requiring the service.
   */
  approver: string;

  /**
   * New flag value of the milestone
   */
  newFlag: boolean;
};

// ----------------- Start Dispute -----------------
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

/**
 * Multi Release Start Dispute Payload. This starts a dispute for a specific milestone.
 */
export type MultiReleaseStartDisputePayload =
  SingleReleaseStartDisputePayload & {
    /**
     * Index of the milestone to be disputed
     */
    milestoneIndex: string;
  };

// ----------------- Resolve Dispute -----------------
/**
 * Resolve Dispute Payload
 */
export type SingleReleaseResolveDisputePayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Amount of funds to be returned to the approver based on the global amount.
   */
  approverFunds: string;

  /**
   * Amount of funds to be returned to the receiver based on the global amount.
   */
  receiverFunds: string;
};

/**
 * Multi Release Resolve Dispute Payload
 */
export type MultiReleaseResolveDisputePayload =
  SingleReleaseResolveDisputePayload & {
    /**
     * Index of the milestone to be resolved
     */
    milestoneIndex: string;
  };

// ----------------- Fund Escrow -----------------
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

// ----------------- Get Escrow -----------------
/**
 * Get Escrow Params
 */
export type GetEscrowParams = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

// ----------------- Release Funds -----------------
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

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

/**
 * Multi Release Release Funds Payload
 */
export type MultiReleaseReleaseFundsPayload =
  SingleReleaseReleaseFundsPayload & {
    /**
     * Index of the milestone to be released
     */
    milestoneIndex: string;
  };

// ----------------- Get Balance -----------------
/**
 * Get Balance Params
 */
export type GetBalanceParams = {
  /**
   * Address of the user signing the contract transaction
   */
  signer: string;

  /**
   * Addresses of the escrows to get the balance
   */
  addresses: string[];
};

```
