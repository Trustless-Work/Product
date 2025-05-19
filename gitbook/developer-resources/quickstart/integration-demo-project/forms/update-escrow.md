---
description: The ideal schema for this endpoint.
---

# Update Escrow

## Schema

This validates an escrow form using Zod, including amounts, wallet addresses, trustline, and a list of milestones.

```typescript
import { isValidWallet } from "@/helpers/valid-data.helper";
import { z } from "zod";

export const formSchema = z.object({
  contractId: z.string().min(1, {
    message: "Contract ID is required.",
  }),
  signer: z.string().min(1, {
    message: "Signer is required.",
  }),
  escrow: z.object({
    title: z.string().min(1, {
      message: "Title is required.",
    }),
    engagementId: z.string().min(1, {
      message: "Engagement is required.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters long.",
    }),
    amount: z.string().min(1, {
      message: "Amount is required.",
    }),
    platformFee: z.string().min(1, {
      message: "Platform fee is required.",
    }),
    receiverMemo: z.number().min(0, {
      message: "Receiver memo must be a non-negative number.",
    }),
    roles: z.object({
      approver: z
        .string()
        .min(1, {
          message: "Approver is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Approver must be a valid wallet.",
        }),
      serviceProvider: z
        .string()
        .min(1, {
          message: "Service provider is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Service provider must be a valid wallet.",
        }),
      platformAddress: z
        .string()
        .min(1, {
          message: "Platform address is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Platform address must be a valid wallet.",
        }),
      releaseSigner: z
        .string()
        .min(1, {
          message: "Release signer is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Release signer must be a valid wallet.",
        }),
      disputeResolver: z
        .string()
        .min(1, {
          message: "Dispute resolver is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Dispute resolver must be a valid wallet.",
        }),
      receiver: z
        .string()
        .min(1, {
          message: "Receiver address is required.",
        })
        .refine((value) => isValidWallet(value), {
          message: "Receiver address must be a valid wallet.",
        }),
    }),
    trustline: z.object({
      address: z.string().min(1, {
        message: "Trustline address is required.",
      }),
      decimals: z.number().default(10000000),
    }),
    milestones: z
      .array(
        z.object({
          description: z.string().min(1, {
            message: "Milestone description is required.",
          }),
          status: z.string().default("pending"),
          evidence: z.string().default(""),
          approvedFlag: z.boolean().default(false),
        })
      )
      .min(1, { message: "At least one milestone is required." }),
  }),
});

```

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEscrowContext } from "@/providers/escrow.provider";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { toast } from "sonner";
import { escrowService } from "../services/escrow.service";
import { formSchema } from "../schemas/update-escrow-form.schema";
import { UpdateEscrowResponse } from "@/@types/escrows/escrow-response.entity";
import { UpdateEscrowPayload } from "@/@types/escrows/escrow-payload.entity";

export const useUpdateEscrowForm = () => {
  const { escrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const { setEscrow } = useEscrowContext();
  const [response, setResponse] = useState<UpdateEscrowResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      signer: walletAddress || "",
      contractId: escrow?.contractId || "",
      escrow: {
        title: escrow?.title || "",
        engagementId: escrow?.engagementId || "",
        description: escrow?.description || "",
        amount: escrow?.amount.toString() || "",
        platformFee: (Number(escrow?.platformFee) / 100).toString() || "",
        receiverMemo: escrow?.receiverMemo || 0,
        roles: {
          approver: escrow?.roles.approver || "",
          serviceProvider: escrow?.roles.serviceProvider || "",
          platformAddress: escrow?.roles.platformAddress || "",
          releaseSigner: escrow?.roles.releaseSigner || "",
          disputeResolver: escrow?.roles.disputeResolver || "",
          receiver: escrow?.roles.receiver || "",
        },
        trustline: {
          address: escrow?.trustline.address || "",
          decimals: escrow?.trustline.decimals || 10000000,
        },
        milestones: escrow?.milestones || [
          {
            description: "",
            status: "pending",
            evidence: "",
            approvedFlag: false,
          },
        ],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "escrow.milestones",
  });

  const onSubmit = async (payload: UpdateEscrowPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an UpdateEscrowResponse
       */
      const result = (await escrowService.execute({
        payload,
        endpoint: "/escrow/update-escrow-by-contract-id",
        method: "put",
        returnEscrowDataIsRequired: false,
      })) as UpdateEscrowResponse;

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
        const escrowUpdated = {
          ...escrow,
          ...payload.escrow,
          signer: payload.signer,
          contractId: payload.contractId,
        };

        setEscrow(escrowUpdated);
        setResponse(result);
        toast.info("Escrow Updated");
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { ResponseDisplay } from "@/components/utils/response-display";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateEscrowForm } from "../../hooks/update-escrow-form.hook";
import { useEscrowContext } from "@/providers/escrow.provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInitializeEscrow } from "../../hooks/initialize-escrow-form.hook";

export function UpdateEscrowForm() {
  const { form, loading, response, fields, append, remove, onSubmit } =
    useUpdateEscrowForm();
  const { trustlinesOptions } = useInitializeEscrow();
  const { escrow } = useEscrowContext();

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Escrow Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.trustline.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trustline</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedOption = trustlinesOptions.find(
                          (opt) => opt.value === value
                        );
                        if (selectedOption) {
                          field.onChange(selectedOption.value);
                        }
                      }}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a trustline" />
                      </SelectTrigger>
                      <SelectContent>
                        {trustlinesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.engagementId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engagement ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ENG12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.receiverMemo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Memo</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.platformFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Fee (%)</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="escrow.roles.approver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="escrow.roles.serviceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.roles.platformAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.roles.releaseSigner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Signer Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.roles.disputeResolver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispute Resolver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="escrow.roles.receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GCU2QK..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="escrow.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Escrow description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Milestones */}
          <FormField
            control={form.control}
            name="escrow.milestones"
            render={() => (
              <FormItem>
                <FormLabel>Milestones</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Milestones</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          append({
                            description: "",
                            status: "pending",
                            evidence: "",
                            approvedFlag: false,
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Milestone
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <Card key={field.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <FormField
                                control={form.control}
                                name={`escrow.milestones.${index}.description`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Milestone {index + 1}</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Milestone description"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="mt-8"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Escrow"}
          </Button>
        </form>
      </Form>

      <ResponseDisplay response={response} />
    </div>
  );
}

```
