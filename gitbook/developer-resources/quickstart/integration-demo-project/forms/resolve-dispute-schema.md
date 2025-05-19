---
description: The ideal schema for this endpoint.
---

# Resolve Dispute Schema

## Schema

This validates an escrow form using Zod, including wallet addresses and entities funds.

```typescript
import { isValidWallet } from "@/helpers/valid-data.helper";
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  disputeResolver: z
    .string()
    .min(1, {
      message: "Dispute resolver is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Dispute resolver must be a valid wallet.",
    }),
  approverFunds: z.string().min(1, "Approver funds is required"),
  receiverFunds: z.string().min(1, "Receiver funds is required"),
});

```

This schema will be used in the custom hook of this form.
