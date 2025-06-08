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

## Escrow's Payload Entity

```typescript
import { Escrow } from "./types.entity";

/**
 * Escrow Payload
 */
export type EscrowPayload = Escrow;

/**
 * Initialize Escrow Payload
 */
export type InitializeEscrowPayload = Omit<
  EscrowPayload,
  "contractId" | "balance"
> & {};

/**
 * Change Milestone Status Payload
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
   * Evidence of work performed by the service provider.
   */
  evidence?: string;

  /**
   * Address of the entity providing the service.
   */
  serviceProvider: string;
};

/**
 * Change Milestone Flag Payload
 */
export type ChangeMilestoneApprovedFlagPayload = Omit<
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

/**
 * Start Dispute Payload
 */
export type StartDisputePayload = {
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
 * Resolve Dispute Payload
 */
export type ResolveDisputePayload = {
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
 * Fund Escrow Payload
 */
export type FundEscrowPayload = {
  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: string;

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
 * Get Escrow Payload
 */
export type GetEscrowPayload = {
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
 * Release Funds Payload
 */
export type ReleaseFundsPayload = {
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
 * Update Escrow Payload
 */
export type UpdateEscrowPayload = {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: Omit<EscrowPayload, "contractId" | "signer" | "balance">;

  /**
   * Address of the user signing the contract transaction
   */
  signer: string;
};

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

/**
 * Send Transaction Payload
 */
export interface SendTransactionPayload {
  /**
   * Signed XDR transaction
   */
  signedXdr: string;

  /**
   * Flag indicating if the escrow data is required to be returned. Only InitializeEscrow and UpdateEscrow are allowed to return the escrow data.
   */
  returnEscrowDataIsRequired: boolean;
}

```
