---
description: The ideal form for this endpoint.
---

# Fund Escrow

## Schema

This validates an escrow form using Zod, including wallet addresses and amount.

```typescript
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, "Contract ID is required"),
  signer: z.string().min(1, "Signer address is required"),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
});

```

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/fund-escrow-form.schema";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow } from "@/@types/escrows/escrow.entity";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { FundEscrowPayload } from "@/@types/escrows/escrow-payload.entity";

export const useFundEscrowForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "",
      amount: escrow?.amount?.toString() || "1000",
      signer: walletAddress || "Connect your wallet to get your address",
    },
  });

  const onSubmit = async (payload: FundEscrowPayload) => {
    setLoading(true);
    setError(null);
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
        endpoint: "/escrow/fund-escrow",
        method: "post",
        returnEscrowDataIsRequired: false,
      })) as EscrowRequestResponse;

      /**
       * @Responses:
       * result.status === "SUCCESS"
       * - Escrow funded successfully
       * - Set the escrow in the context
       * - Show a success toast
       *
       * result.status !== "SUCCESS"
       * - Show an error toast
       */
      if (result.status === "SUCCESS") {
        // Validate balance in order to avoid negative balances in the escrow context
        const escrowUpdated: Escrow = {
          ...escrow!,
          balance:
            escrow?.balance && Number(escrow.balance) > 0
              ? (Number(escrow.balance) + Number(payload.amount)).toString()
              : payload.amount,
        };

        setEscrow(escrowUpdated);

        toast.info("Escrow Funded");
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

import { useFundEscrowForm } from "../../hooks/fund-escrow-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import { ResponseDisplay } from "@/components/utils/response-display";

export function FundEscrowForm() {
  const { form, loading, response, onSubmit } = useFundEscrowForm();
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

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    disabled={Number(escrow?.balance) >= Number(escrow?.amount)}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Funding..." : "Fund Escrow"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}

```
