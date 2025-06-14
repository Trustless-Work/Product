---
description: The ideal form for this endpoint.
---

# Get Escrow

## Schema

This validates an escrow form using Zod, including wallet addresses.

```typescript
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer Address is required"),
});

```

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { formSchema } from "../schemas/get-escrow-form.schema";
import { useWalletContext } from "@/providers/wallet.provider";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetEscrowPayload } from "@/@types/escrows/escrow-payload.entity";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow } from "@/@types/escrows/escrow.entity";

export const useGetEscrowForm = () => {
  const { walletAddress } = useWalletContext();
  const { escrow, setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Escrow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: GetEscrowPayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an Escrow
       */
      const escrow = (await escrowService.execute({
        payload,
        endpoint: "/escrow/get-escrow-by-contract-id",
        method: "get",
        requiresSignature: false,
      })) as Escrow;

      /**
       * @Responses:
       * escrow !== null
       * - Escrow received successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * escrow === null
       * - Show an error toast
       */
      if (escrow) {
        setEscrow({ ...escrow, contractId: payload.contractId });
        setResponse(escrow);
        toast.info("Escrow Received");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, error, onSubmit };
};

```

## Form

This form is built with react hook form. We use the custom hook and zod schema mentioned before.

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useGetEscrowForm } from "../../hooks/get-escrow-form.hook";
import { ResponseDisplay } from "@/components/utils/response-display";

export function GetEscrowForm() {
  const { form, loading, response, onSubmit } = useGetEscrowForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contractId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract / Escrow ID</FormLabel>
              <FormControl>
                <Input placeholder="CAZ6UQX7..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="signer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signer Address</FormLabel>
              <FormControl>
                <Input disabled placeholder="GSIGN...XYZ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Getting Escrow..." : "Get Escrow"}
        </Button>
      </form>

      <ResponseDisplay response={response} />
    </Form>
  );
}

```
