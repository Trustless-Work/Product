import type { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

// Default to public network if not specified
const STELLAR_PUBLIC_NETWORK = "PUBLIC";

// Define the schema for Stellar configuration using Zod
export const stellarEnvSchema = z.object({
    STELLAR_SECRET_KEY: z.string().min(1, "Stellar secret key is required"),
    STELLAR_NETWORK: z.enum(["PUBLIC", "TESTNET"]).default(STELLAR_PUBLIC_NETWORK)
});

// Type inference from the schema
export type StellarConfig = z.infer<typeof stellarEnvSchema>;

/**
 * Validates Stellar configuration from runtime settings and environment variables
 * @param runtime The agent runtime containing settings
 * @returns Validated Stellar configuration
 * @throws Error if validation fails
 */
export async function validateStellarConfig(
    runtime: IAgentRuntime
): Promise<StellarConfig> {
    try {
        const config = {
            STELLAR_SECRET_KEY:
                runtime.getSetting("STELLAR_SECRET_KEY") ||
                process.env.STELLAR_SECRET_KEY,
            STELLAR_NETWORK:
                runtime.getSetting("STELLAR_NETWORK") ||
                process.env.STELLAR_NETWORK ||
                STELLAR_PUBLIC_NETWORK
        };

        // Parse and validate the configuration
        return stellarEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
                .join("\n");
            throw new Error(
                `Stellar configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
