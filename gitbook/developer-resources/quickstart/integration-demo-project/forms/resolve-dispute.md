---
description: The ideal schema for this endpoint.
---

# Resolve Dispute

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

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { formSchema } from "../schemas/resolve-dispute-form.schema";
import { escrowService } from "../services/escrow.service";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { toast } from "sonner";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { ResolveDisputePayload } from "@/@types/escrows/escrow-payload.entity";

export const useResolveDisputeForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      disputeResolver: escrow?.roles.disputeResolver || "",
      approverFunds: "0",
      receiverFunds: "0",
    },
  });

  const onSubmit = async (payload: ResolveDisputePayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an EscrowRequestResponse
       */
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/resolving-disputes",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      /**
       * @Responses:
       * result.status === "SUCCESS"
       * - Escrow updated successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * result.status !== "SUCCESS"
       * - Show an error toast
       */
      if (result.status === "SUCCESS") {
        const escrowUpdated: Escrow = {
          ...escrow!,
          flags: {
            resolvedFlag: true,
          },
          balance: (
            Number(escrow?.balance) -
            Number(payload.approverFunds) -
            Number(payload.receiverFunds)
          ).toString(),
        };

        setEscrow(escrowUpdated);

        toast.info("Dispute Resolved");
        setResponse(result);
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, response, onSubmit };
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useResolveDisputeForm } from "../../hooks/resolve-dispute-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import { ResponseDisplay } from "@/components/utils/response-display";

export function ResolveDisputeForm() {
  const { form, loading, response, onSubmit } = useResolveDisputeForm();
  const { escrow } = useEscrowContext();

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract / Escrow ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CAZ6UQX7..."
                    {...field}
                    disabled={!!escrow?.contractId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disputeResolver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dispute Resolver Address</FormLabel>
                <FormControl>
                  <Input disabled placeholder="GDISPUTE...XYZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="approverFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver Funds</FormLabel>
                  <FormControl>
                    <Input placeholder="300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverFunds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Funds</FormLabel>
                  <FormControl>
                    <Input placeholder="700" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resolving..." : "Resolve Dispute"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}

```
