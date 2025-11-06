import { z } from "zod";

export const changeMilestoneStatusSchema = z.object({
  milestoneIndex: z
    .string()
    .min(1, { message: "Milestone is required" }),
  status: z
    .string()
    .min(1, { message: "Status is required" }),
  evidence: z.string().optional(),
});

export type ChangeMilestoneStatusValues = z.infer<
  typeof changeMilestoneStatusSchema
>;
