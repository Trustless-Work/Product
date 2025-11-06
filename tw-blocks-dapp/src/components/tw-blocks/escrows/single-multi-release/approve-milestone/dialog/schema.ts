import { z } from "zod";

export const approveMilestoneSchema = z.object({
  milestoneIndex: z
    .string()
    .min(1, { message: "Milestone is required" }),
});

export type ApproveMilestoneValues = z.infer<typeof approveMilestoneSchema>;
