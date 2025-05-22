---
description: All the entities that you'll need.
icon: user
---

# Entities

## Overview

In this document, we explore the structure and functionality of key escrow-related types and interfaces used in the system, including the Escrow and Escrow Response entities. These entities are crucial for handling escrow operations such as initializing, updating, and responding to requests regarding escrow contracts.

### Status, baseURL and HttpMethos

```typescript
/**
 * The base URL for the Trustless Work API
 */
export type baseURL =
  | "https://api.trustlesswork.com"
  | "https://dev.api.trustlesswork.com";

/**
 * Http Method
 */
export type HttpMethod = "get" | "post" | "put" | "delete";

/**
 * Unique possible statuses for a Trustless Work request
 */
export type Status = "SUCCESS" | "FAILED";

```

### Escrow Entity

```typescript
/**
 * Milestone
 */
export type Milestone = {
  /**
   * Text describing the function of the milestone.
   */
  description: string;

  /**
   * Milestone status. Ex: Approved, In dispute, etc...
   */
  status: string;

  /**
   * Evidence of work performed by the service provider.
   */
  evidence: string;

  /**
   * Flag indicating whether a milestone has been approved by the approver.
   */
  approvedFlag: boolean;
};

/**
 * Roles
 */
export type Roles = {
  /**
   * Address of the entity requiring the service.
   */
  approver: string;

  /**
   * Address of the entity providing the service.
   */
  serviceProvider: string;

  /**
   * Address of the entity that owns the escrow
   */
  platformAddress: string;

  /**
   * Address of the user in charge of releasing the escrow funds to the service provider.
   */
  releaseSigner: string;

  /**
   * Address in charge of resolving disputes within the escrow.
   */
  disputeResolver: string;

  /**
   * Address where escrow proceeds will be sent to
   */
  receiver: string;
};

/**
 * Flags
 */
export type Flags = {
  /**
   * Flag indicating that an escrow is in dispute.
   */
  disputeFlag?: boolean;

  /**
   * Flag indicating that escrow funds have already been released.
   */
  releaseFlag?: boolean;

  /**
   * Flag indicating that a disputed escrow has already been resolved.
   */
  resolvedFlag?: boolean;
};

/**
 * Escrow
 */
export interface Escrow {
  /**
   * Address of the user signing the contract transaction
   */
  signer: string;

  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Unique identifier for the escrow
   */
  engagementId: string;

  /**
   * Name of the escrow
   */
  title: string;

  /**
   * Roles that make up the escrow structure
   */
  roles: Roles;

  /**
   * Text describing the function of the escrow
   */
  description: string;

  /**
   * Amount to be transferred upon completion of escrow milestones
   */
  amount: string;

  /**
   * Commission that the platform will receive when the escrow is completed
   */
  platformFee: string;

  /**
   * Amount of the token (XLM, USDC, EURC, etc) in the smart contract.
   */
  balance: string;

  /**
   * Objectives to be completed to define the escrow as completed
   */
  milestones: Milestone[];

  /**
   * Flags validating certain escrow life states
   */
  flags?: Flags;

  /**
   * Information on the trustline that will manage the movement of funds in escrow
   */
  trustline: Trustline;

  /**
   * Field used to identify the recipient's address in transactions through an intermediary account. This value is included as a memo in the transaction and allows the funds to be correctly routed to the wallet of the specified recipient
   */
  receiverMemo: number;
}

/**
 * Trustline
 */
export interface Trustline {
  /**
   * Public address establishing permission to accept and use a specific token.
   */
  address: string;

  /**
   * Number of decimals into which the token is divided.
   */
  decimals: number;
}

```



## Escrow's Response Entity

```typescript
import { Status } from "./types";
import { EscrowPayload } from "./types.payload";

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
export type InitializeEscrowResponse = EscrowRequestResponse & {
  /**
   * ID (address) that identifies the escrow contract
   */
  contractId: string;

  /**
   * Escrow data
   */
  escrow: EscrowPayload;

  /**
   * Message of the request
   */
  message: string;
};

/**
 * Update Escrow Response
 */
export type UpdateEscrowResponse = InitializeEscrowResponse;

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


```



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

## Errors Entity

```typescript
import { ApiErrorTypes } from "@/errors/enums/error.enum";

/**
 * Types for Error response
 */
export type ErrorResponse = {
  message: string;
  code: number;
  type: ApiErrorTypes;
};

/**
 * Types for TW errors
 */
export type ApiError = Pick<ErrorResponse, "message" | "code">;

/**
 * Types for Wallet errors
 */
export type WalletError = Pick<ErrorResponse, "message" | "code">;

/**
 * Types for Request errors
 */
export type RequestError = ApiError | Error | WalletError;

```



With these entities, you'll be able to keep typed all the interactions with our API.

