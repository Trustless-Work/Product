---
description: The ideal schema for this endpoint.
---

# Change Milestone Flag Schema

## Schema

This validates an escrow form using Zod, including wallet addresses, change flag properties and milestone index.

```typescript
import { isValidWallet } from "@/helpers/valid-data.helper";
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  milestoneIndex: z.string().min(1, "Milestone index is required"),
  newFlag: z.boolean(),
  approver: z
    .string()
    .min(1, {
      message: "Approver is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Approver must be a valid wallet.",
    }),
});

```

This schema will be used in the custom hook of this form.
