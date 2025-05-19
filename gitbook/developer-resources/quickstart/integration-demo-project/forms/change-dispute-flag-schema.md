---
description: The ideal schema for this endpoint.
---

# Change Dispute Flag Schema

## Schema

This validates an escrow form using Zod, including wallet addresses.

```typescript
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer address is required"),
});

```

This schema will be used in the custom hook of this form.
