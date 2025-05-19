---
description: The ideal form for this endpoint.
---

# Get Multiple Escrow Balances

## Schema

This validates an escrow form using Zod, including wallet addresses.

```typescript
import { z } from "zod";

export const formSchema = z.object({
  signer: z.string().min(1, "Signer address is required"),
  addresses: z
    .array(
      z.object({
        value: z.string().min(1, "Address is required"),
      })
    )
    .min(1, "At least one address is required"),
});

```

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/get-multiple-escrow-balances-form.schema";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { GetBalanceParams } from "@/@types/escrows/escrow-payload.entity";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";

type FormData = z.infer<typeof formSchema>;

export const useGetMultipleEscrowBalancesForm = () => {
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signer: walletAddress || "",
      addresses: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  const onSubmit = async (payload: FormData) => {
    setLoading(true);
    setResponse(null);

    // Transform the payload to the correct format
    const transformedData: GetBalanceParams = {
      addresses: payload.addresses.map((a) => a.value),
      signer: payload.signer,
    };

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an EscrowRequestResponse
       */
      const balances = (await escrowService.execute({
        payload: transformedData,
        endpoint: "/helper/get-multiple-escrow-balance",
        method: "get",
        requiresSignature: false,
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      /**
       * @Responses:
       * balances !== null
       * - Escrow balances received successfully
       * - Set the response
       * - Show a success toast
       *
       * balances === null
       * - Show an error toast
       */
      if (balances) {
        setResponse(balances);
        toast.info("Escrow Balances Received");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, fields, append, remove, onSubmit };
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
