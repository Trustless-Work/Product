import { z } from "zod";

export const EscrowAttestationActaSchema = z.object({
  attestations: z
    .array(
      z.object({
        attester: z.string().min(1, "Attester address is required"),
        attestedAddress: z.string().min(1, "Attested address is required"),
        timestamp: z
          .union([z.string(), z.number()])
          .refine(
            (val) => {
              const num = Number(val);
              return Number.isFinite(num) && num > 0;
            },
            { message: "Timestamp must be a valid positive number" }
          ),
        signature: z
          .string()
          .min(1, "Signature is required")
          .regex(
            /^0x[0-9a-fA-F]{130}$/,
            "Signature must be a valid 65-byte Ethereum signature (0x + 130 hex chars)"
          ),
        statement: z
          .string()
          .min(1, "Statement is required")
          .max(1000, "Statement must be at most 1000 characters"),
      })
    )
    .min(1, "At least one attestation is required"),
  transactionHash: z
    .string()
    .regex(
      /^0x[0-9a-fA-F]{64}$/,
      "Transaction hash must be a valid 32-byte hex string (0x + 64 hex chars)"
    ),
  escrowContract: z
    .string()
    .min(1, "Escrow contract address is required")
    .regex(
      /^0x[0-9a-fA-F]{40}$/,
      "Escrow contract address must be a valid Ethereum address (0x + 40 hex chars)"
    ),
  actorAddress: z
    .string()
    .min(1, "Actor address is required")
    .regex(
      /^0x[0-9a-fA-F]{40}$/,
      "Actor address must be a valid Ethereum address (0x + 40 hex chars)"
    ),
});

export type EscrowAttestationActaInput = z.infer<typeof EscrowAttestationActaSchema>;
