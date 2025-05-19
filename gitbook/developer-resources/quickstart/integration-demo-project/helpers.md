---
description: Some important helpers that we'll need.
icon: circle-question
---

# Helpers

## Valid Wallet

In order to know if the Stellar Wallet is valid, we've created a custom function.

```typescript
export const isValidWallet = (wallet: string) => {
  // Verify that the wallet is 56 characters long and starts with 'G'
  if (wallet.length !== 56 || wallet[0] !== "G") {
    return false;
  }

  // Verify that the wallet is a valid base32 string
  const base32Regex = /^[A-Z2-7]+$/;
  if (!base32Regex.test(wallet)) {
    return false;
  }

  return true;
};

```



## Build Escrow from Response

The `Initialize Escrow` function returns the initialized escrow, but we need to structure it properly to store it correctly in the context.

```typescript
import {
  InitializeEscrowResponse,
  UpdateEscrowResponse,
} from "@/@types/escrows/escrow-response.entity";
import { Escrow } from "@/@types/escrows/escrow.entity";

/**
 * Builds an Escrow object from an InitializeEscrowResponse, this structure is
 * used to create a new escrow based on the Escrow's entity
 */
export const buildEscrowFromResponse = (
  result: InitializeEscrowResponse | UpdateEscrowResponse,
  walletAddress: string
): Escrow => ({
  contractId: result.contractId,
  signer: walletAddress || "",
  engagementId: result.escrow.engagementId,
  title: result.escrow.title,
  description: result.escrow.description,
  amount: result.escrow.amount,
  platformFee: result.escrow.platformFee,
  receiverMemo: result.escrow.receiverMemo ?? 0,
  roles: {
    approver: result.escrow.roles.approver,
    serviceProvider: result.escrow.roles.serviceProvider,
    platformAddress: result.escrow.roles.platformAddress,
    releaseSigner: result.escrow.roles.releaseSigner,
    disputeResolver: result.escrow.roles.disputeResolver,
    receiver: result.escrow.roles.receiver,
  },
  flags: {
    disputeFlag: false,
    releaseFlag: false,
    resolvedFlag: false,
  },
  trustline: {
    address: result.escrow.trustline.address,
    decimals: result.escrow.trustline.decimals,
  },
  milestones: result.escrow.milestones.map((m) => ({
    description: m.description,
    status: "pending",
    evidence: "",
    approvedFlag: false,
  })),
});

```

