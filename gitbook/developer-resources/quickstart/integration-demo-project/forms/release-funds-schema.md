---
description: The ideal schema for this endpoint.
---

# Release Funds Schema

## Schema

This validates an escrow form using Zod, including wallet addresses.

```typescript
import { isValidWallet } from "@/helpers/valid-data.helper";
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  releaseSigner: z
    .string()
    .min(1, {
      message: "Release signer is required.",
    })
    .refine((value) => isValidWallet(value), {
      message: "Release signer must be a valid wallet.",
    }),
  signer: z.string().min(1, "Signer address is required"),
});

```

This schema will be used in the custom hook of this form.
