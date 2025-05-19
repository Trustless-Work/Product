---
description: The ideal schema for this endpoint.
---

# Initialize Escrow

## Schema

This validates an escrow form using Zod, including amounts, wallet addresses, trustline, and a list of milestones.

```typescript
import { isValidWallet } from "@/helpers/valid-data.helper";
import { z } from "zod";

export const formSchema = z.object({
  engagementId: z.string().min(1, {
    message: "Engagement is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
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
});

```

## Custom Hook

This contains all the form logic, including schema validation, onSubmit function and others states and functionalities.

```typescript
import { InitializeEscrowPayload } from "@/@types/escrows/escrow-payload.entity";
import { useWalletContext } from "@/providers/wallet.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/initialize-escrow-form.schema";
import { toast } from "sonner";
import { useEscrowContext } from "@/providers/escrow.provider";
import { InitializeEscrowResponse } from "@/@types/escrows/escrow-response.entity";
import { useTabsContext } from "@/providers/tabs.provider";
import { escrowService } from "../services/escrow.service";
import { trustlines } from "../constants/trustline.constant";
import { Trustline } from "@/@types/trustline.entity";
import { z } from "zod";
import { Resolver } from "react-hook-form";
import { steps } from "../constants/initialize-steps.constant";
import { buildEscrowFromResponse } from "../../../../helpers/build-escrow-from-response.helper";

type FormValues = z.infer<typeof formSchema>;

export const useInitializeEscrow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<InitializeEscrowResponse | null>(
    null
  );
  const { walletAddress } = useWalletContext();
  const { setEscrow } = useEscrowContext();
  const { setActiveTab } = useTabsContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      engagementId: "",
      title: "",
      description: "",
      amount: "",
      platformFee: "",
      receiverMemo: 0,
      roles: {
        approver: "",
        serviceProvider: "",
        platformAddress: "",
        releaseSigner: "",
        disputeResolver: "",
        receiver: "",
      },
      trustline: {
        address: "",
        decimals: 10000000,
      },
      milestones: [
        {
          description: "",
          status: "pending",
          evidence: "",
          approvedFlag: false,
        },
      ],
    },
    mode: "onChange",
  });

  const trustlinesOptions = trustlines.map((trustline: Trustline) => ({
    value: trustline.address,
    label: trustline.name,
  }));

  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    form.setValue("milestones", [
      ...currentMilestones,
      { description: "", status: "pending", evidence: "", approvedFlag: false },
    ]);
  };

  const removeMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones");
    if (currentMilestones.length > 1) {
      form.setValue(
        "milestones",
        currentMilestones.filter((_, i) => i !== index)
      );
    }
  };

  const loadTemplate = () => {
    form.setValue("title", "Sample TW Escrow");
    form.setValue(
      "description",
      "This is a sample TW escrow for testing purposes"
    );
    form.setValue("engagementId", "ENG12345");
    form.setValue("amount", "50");
    form.setValue("platformFee", "5");
    form.setValue("roles.approver", walletAddress || "");
    form.setValue("roles.serviceProvider", walletAddress || "");
    form.setValue("roles.platformAddress", walletAddress || "");
    form.setValue("roles.releaseSigner", walletAddress || "");
    form.setValue("roles.disputeResolver", walletAddress || "");
    form.setValue("roles.receiver", walletAddress || "");
    form.setValue("receiverMemo", 90909090);
    form.setValue(
      "trustline.address",
      trustlines.find((t) => t.name === "USDC")?.address || ""
    );
    form.setValue("milestones", [
      {
        description: "Initial milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
      {
        description: "Second milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
      {
        description: "Final milestone",
        status: "pending",
        evidence: "",
        approvedFlag: false,
      },
    ]);
  };

  const onSubmit = async (payload: InitializeEscrowPayload) => {
    setLoading(true);
    setResponse(null);

    try {
      // This is the final payload that will be sent to the API
      const finalPayload: InitializeEscrowPayload = {
        ...payload,
        receiverMemo: payload.receiverMemo ?? 0,
        signer: walletAddress || "",
      };

      /**
       * API call by using the escrow service
       * @Note:
       * - We need to specify the endpoint and the method
       * - We need to specify that the returnEscrowDataIsRequired is false
       * - The result will be an InitializeEscrowResponse
       */
      const result = (await escrowService.execute({
        payload: finalPayload,
        endpoint: "/deployer/invoke-deployer-contract",
        method: "post",
      })) as InitializeEscrowResponse;

      if (result.status === "SUCCESS") {
        const escrow = buildEscrowFromResponse(result, walletAddress || "");
        setEscrow(escrow);
        setActiveTab("escrow");
        toast.info("Escrow Created");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const fields = getStepFields(currentStep);
    const isValid = await form.trigger(fields);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const getStepFields = (
    step: number
  ): (keyof z.infer<typeof formSchema>)[] => {
    switch (step) {
      case 0:
        return ["title", "engagementId", "description"];
      case 1:
        return ["amount", "platformFee", "trustline", "receiverMemo"];
      case 2:
        return ["roles"];
      case 3:
        return ["milestones"];
      default:
        return [];
    }
  };

  return {
    form,
    loading,
    response,
    trustlinesOptions,
    currentStep,
    addMilestone,
    removeMilestone,
    loadTemplate,
    onSubmit,
    nextStep,
    prevStep,
  };
};

```



## Form

This form is built with react hook form. We use the custom hook and zod schema mentioned before.

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../schemas/initialize-escrow-form.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { steps } from "../../constants/initialize-steps.constant";
import { InitializeEscrowResponse } from "@/@types/escrows/escrow-response.entity";
import { ResponseDisplay } from "@/components/utils/response-display";

interface InitializeEscrowFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  loading?: boolean;
  response: InitializeEscrowResponse | null;
  trustlinesOptions: { value: string; label: string }[];
  currentStep: number;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  addMilestone: () => void;
  removeMilestone: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export const InitializeEscrowForm = ({
  form,
  loading,
  response,
  trustlinesOptions,
  currentStep,
  onSubmit,
  addMilestone,
  removeMilestone,
  nextStep,
  prevStep,
}: InitializeEscrowFormProps) => {
  const renderStep = () => {
    const currentStepData = steps[currentStep];

    return (
      <Card className="w-full md:w-3/4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {currentStepData.title}
          </CardTitle>
          <FormDescription>{currentStepData.description}</FormDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="title"
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
                  name="engagementId"
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
                  name="description"
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
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
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
                    name="platformFee"
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

                  <FormField
                    control={form.control}
                    name="trustline.address"
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
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
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

                  <FormField
                    control={form.control}
                    name="receiverMemo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Memo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roles.approver"
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
                  name="roles.serviceProvider"
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
                  name="roles.platformAddress"
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
                  name="roles.releaseSigner"
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
                  name="roles.disputeResolver"
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
                  name="roles.receiver"
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
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Milestones</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMilestone}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Milestone
                  </Button>
                </div>

                {form.watch("milestones").map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`milestones.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Milestone {index + 1} - Description
                                </FormLabel>
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
                        {form.watch("milestones").length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMilestone(index)}
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
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between mb-8 w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center",
              index !== steps.length - 1 ? "flex-1" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full flex flex-col items-center justify-center"
          >
            {renderStep()}
          </form>
        </Form>

        <div className="flex w-3/4 justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              disabled={loading}
            >
              {loading ? "Initializing..." : "Initialize Escrow"}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      <ResponseDisplay response={response} />
    </div>
  );
};

```

