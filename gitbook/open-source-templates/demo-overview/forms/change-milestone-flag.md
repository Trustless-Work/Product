---
description: The ideal schema for this endpoint.
---

# Change Milestone Flag

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

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { useEscrowContext } from "@/providers/escrow.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../schemas/change-milestone-flag-form.schema";
import { escrowService } from "../services/escrow.service";
import { toast } from "sonner";
import { Escrow, Milestone } from "@/@types/escrows/escrow.entity";
import { EscrowRequestResponse } from "@/@types/escrows/escrow-response.entity";
import { ChangeMilestoneFlagPayload } from "@/@types/escrows/escrow-payload.entity";

export const useChangeMilestoneFlagForm = () => {
  const { escrow } = useEscrowContext();
  const { setEscrow } = useEscrowContext();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<EscrowRequestResponse | null>(null);

  // Default milestones if escrow is undefined
  const milestones = escrow?.milestones || [
    { description: "Initial setup", status: "pending" },
    { description: "Development phase", status: "pending" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractId: escrow?.contractId || "CAZ6UQX7DEMO123",
      milestoneIndex: "",
      newFlag: true,
      approver: escrow?.roles.approver || "GAPPROVER123456789",
    },
  });

  const onSubmit = async (payload: ChangeMilestoneFlagPayload) => {
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
        endpoint: "/escrow/change-milestone-approved-flag",
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
          milestones: escrow!.milestones.map((milestone: Milestone, index) =>
            index === Number(payload.milestoneIndex)
              ? { ...milestone, approvedFlag: payload.newFlag }
              : milestone
          ),
        };

        setEscrow(escrowUpdated);

        toast.info(
          `Milestone index - ${payload.milestoneIndex} has been approved`
        );
        setResponse(result);
        form.reset();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { form, milestones, loading, response, onSubmit };
};

```

## Form

This form is built with react hook form. We use the custom hook and zod schema mentioned before.

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeMilestoneFlagForm } from "../../hooks/change-milestone-flag-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import { ResponseDisplay } from "@/components/utils/response-display";

export function ChangeMilestoneFlagForm() {
  const { form, milestones, loading, response, onSubmit } =
    useChangeMilestoneFlagForm();
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
            name="approver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approver Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="GSERVICE..."
                    {...field}
                    disabled={!!escrow?.roles.approver}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="milestoneIndex"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Milestone Index</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {milestones.map((_, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          Milestone {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newFlag"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Approve Milestone</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    disabled={true}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Change Milestone Flag"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}

```
