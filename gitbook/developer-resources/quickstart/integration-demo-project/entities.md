---
description: All the entities that you'll need.
icon: user
---

# Entities

## Overview

In this document, we explore the structure and functionality of key escrow-related types and interfaces used in the system, including the Escrow and Escrow Response entities. These entities are crucial for handling escrow operations such as initializing, updating, and responding to requests regarding escrow contracts.



### Escrow Entity

```typescript
import { Trustline } from "../trustline.entity";

// Milestone
export type Milestone = {
  description: string;
  status: string;
  evidence: string;
  approvedFlag: boolean;
};

// Roles
export type Roles = {
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  releaseSigner: string;
  disputeResolver: string;
  receiver: string;
};

// Flags
export type Flags = {
  disputeFlag?: boolean;
  releaseFlag?: boolean;
  resolvedFlag?: boolean;
};

// Escrow
export interface Escrow {
  signer?: string;
  contractId?: string;
  engagementId: string;
  title: string;
  roles: Roles;
  description: string;
  amount: string;
  platformFee: string;
  balance?: string;
  milestones: Milestone[];
  flags?: Flags;
  trustline: Trustline;
  receiverMemo: number;
}

```



## Escrow's Response Entity

```typescript
import { Status } from "../http.entity";
import type { EscrowPayload } from "./escrow-payload.entity";

// Escrow's Response like fund, release, change, etc ...
export type EscrowRequestResponse = {
  status: Status;
  unsignedTransaction?: string;
};

// Initialize Escrow Response
export type InitializeEscrowResponse = {
  contractId: string;
  escrow: EscrowPayload;
  message: string;
  status: Status;
};

// Update Escrow Response
export type UpdateEscrowResponse = InitializeEscrowResponse;

```



## Escrow's Payload Entity

```typescript
import type { Escrow } from "./escrow.entity";

// Payload base
export type EscrowPayload = Escrow;

// Initialize Escrow Payload
export type InitializeEscrowPayload = Omit<EscrowPayload, "contractId"> & {};

// Change Milestone Status Payload
export type ChangeMilestoneStatusPayload = {
  contractId?: string;
  milestoneIndex: string;
  newStatus: string;
  evidence?: string;
  serviceProvider?: string;
};

// Change Milestone Flag Payload
export type ChangeMilestoneFlagPayload = Omit<
  ChangeMilestoneStatusPayload,
  "serviceProvider" | "newStatus"
> & {
  approver?: string;
  newFlag: boolean;
};

// Start Dispute Payload
export type StartDisputePayload = {
  contractId: string;
  signer: string;
};

// Resolve Dispute Payload
export type ResolveDisputePayload = {
  contractId: string;
  disputeResolver?: string;
  approverFunds: string;
  receiverFunds: string;
};

// Fund Escrow Payload
export type FundEscrowPayload = {
  amount: string;
  contractId: string;
  signer: string;
};

// Get Escrow Payload
export type GetEscrowPayload = {
  contractId: string;
  signer: string;
};

// Release Funds Escrow Payload
export type ReleaseFundsEscrowPayload = {
  contractId: string;
  serviceProvider?: string;
  releaseSigner?: string;
  signer: string;
};

// Update Escrow Payload
export type UpdateEscrowPayload = {
  contractId: string;
  escrow: EscrowPayload;
  signer: string;
};

// Get Balance Params
export type GetBalanceParams = {
  signer: string;
  addresses: string[];
};

// Escrow Payload Service
export type EscrowPayloadService =
  | Escrow
  | InitializeEscrowPayload
  | GetEscrowPayload
  | ChangeMilestoneStatusPayload
  | ChangeMilestoneFlagPayload
  | StartDisputePayload
  | ResolveDisputePayload
  | FundEscrowPayload
  | ReleaseFundsEscrowPayload
  | UpdateEscrowPayload
  | GetBalanceParams;

```



## Trustline Entity

```typescript
export interface Trustline {
  name?: string;
  address: string;
  decimals: number;
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



## HTTP Entity

```typescript
// Http Method
export type HttpMethod = "get" | "post" | "put" | "delete";

// Status
export type Status = "SUCCESS" | "FAILED";

```



With these entities, you'll be able to keep typed all the interactions with our API.

