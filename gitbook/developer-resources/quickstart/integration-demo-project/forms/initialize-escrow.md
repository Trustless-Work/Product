---
description: The ideal form for this endpoint.
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

      /**
       * @Responses:
       * result.status === "SUCCESS"
       * - Escrow created successfully
       * - Set the escrow in the context
       * - Set the active tab to "escrow"
       * - Show a success toast
       *
       * result.status !== "SUCCESS"
       * - Show an error toast
       */
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

