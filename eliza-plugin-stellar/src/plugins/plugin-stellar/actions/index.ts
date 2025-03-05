import {
    type Action,
    type ActionExample,
    type IAgentRuntime,
    type Memory,
    elizaLogger,
    MemoryManager,
    stringToUuid
} from "@elizaos/core";
import * as StellarSdk from '@stellar/stellar-sdk';

import { validateStellarConfig } from "../environment.ts";

interface SigningResult {
    success: boolean;
    message: string;
    signedXdr?: string;
    error?: string;
}

class StellarTransactionHandler {
    private runtime: IAgentRuntime;
    public memoryManager: MemoryManager;

    constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;
        this.memoryManager = new MemoryManager({
            runtime,
            tableName: "stellar_transactions",
        });
    }

    async getLatestTransaction(userId: string): Promise<{ xdr: string; network: string } | null> {
        try {
            const memories = await this.memoryManager.getMemories({
                roomId: stringToUuid(userId),
                count: 1
            });

            if (!memories?.length) return null;

            const transaction = JSON.parse(memories[0].content.text);
            return {
                xdr: transaction.unsignedXdr,
                network: transaction.network
            };
        } catch (error) {
            elizaLogger.error("Error retrieving transaction:", error);
            return null;
        }
    }

    async signTransaction(xdr: string, network: string): Promise<SigningResult> {
        try {
            // Get the private key from environment
            const config = await validateStellarConfig(this.runtime);
            const secretKey = config.STELLAR_SECRET_KEY;

            // Determine network passphrase
            const networkPassphrase = network === "TESTNET"
                ? StellarSdk.Networks.TESTNET
                : StellarSdk.Networks.PUBLIC;

            // Create keypair from secret
            const keypair = StellarSdk.Keypair.fromSecret(secretKey);

            // Decode and sign the transaction
            const transaction = new StellarSdk.Transaction(
                xdr,
                networkPassphrase
            );

            transaction.sign(keypair);
            const signedXdr = transaction.toXDR();

            return {
                success: true,
                message: "Transaction signed successfully",
                signedXdr
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to sign transaction",
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }
}

export const signStellarTransaction: Action = {
    name: "SIGN_STELLAR_TRANSACTION",
    similes: [
        "STELLAR_SIGN_TX",
        "SIGN_STELLAR_TX",
        "STELLAR_TX_SIGN",
        "SIGN_XDR",
    ],
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        console.log("validating tx!!");
        await validateStellarConfig(runtime);
        const xdrPattern = /[A-Za-z0-9+/=]{50,}/;
        const hasXdr = xdrPattern.test(message.content.text);
    
        console.log("Contains XDR:", hasXdr);
        return hasXdr;
    },
    description:
        "Signs a Stellar transaction given a XDR",
    handler: async (runtime: IAgentRuntime, message: Memory) => {
        console.log("Action triggered");
        const handler = new StellarTransactionHandler(runtime);

        try {
            // Extract XDR from message
            const xdrPattern = /([A-Za-z0-9+/=]{50,})/;
            const xdrMatch = message.content.text.match(xdrPattern);
            
            if (!xdrMatch || !xdrMatch[1]) {
                return {
                    success: false,
                    message: "Could not extract XDR from message"
                };
            }

            const xdr = xdrMatch[1];
            const network = message.content.text.toLowerCase().includes('testnet') ? 'TESTNET' : 'PUBLIC';

            // Sign the transaction
            const result = await handler.signTransaction(xdr, network);

            if (!result.success) {
                return {
                    success: false,
                    message: `Failed to sign transaction: ${result.error}`
                };
            }

            // Store the signed transaction
            await handler.memoryManager.createMemory({
                userId: stringToUuid(message.userId || "unknown"),
                agentId: runtime.agentId,
                content: {
                    text: JSON.stringify({
                        signedXdr: result.signedXdr,
                        network: network,
                        timestamp: Date.now()
                    }),
                    type: "STELLAR_SIGNED_XDR"
                },
                roomId: message.roomId,
                createdAt: Date.now()
            });

            return {
                success: true,
                message: "Transaction signed successfully",
                signedXdr: result.signedXdr,
                network: network
            };
        } catch (error) {
            elizaLogger.error("Error in sign transaction handler:", error);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    },
    examples: [
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "I need help submitting this Stellar transaction"
                }
            },
            {
                "user": "{{user2}}",
                "content": {
                    "text": "I'd be happy to help. Do you have the XDR for your transaction?"
                }
            },
            {
                "user": "{{user1}}",
                "content": {
                    "text": "Yes, here it is: AAAAAH8ab6ZBisg/UxNFBWp8FFXL0L7CKrwDL6Q40f0Uz2FqAAAAZAB3wuYAAAACAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAA3gDx9gtvBwDGxF6sgiLDUOBnwEJmm7TCJ9LwyaLp/iUAAAABVVNEAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAAAmKIuZAAAAAAAAAAABFM9hagAAAEDRRWwywj9SNa2M8AYl4OMxIpLSzH9KK9hQUFgQpzV+/e8HA5jPUi9WQl19QeGz8/uFwOXAtmOgpZcxK6J7HQ0I"
                }
            },
            {
                "user": "{{user2}}",
                "content": {
                    "text": "Thanks for providing the XDR. Let me process this transaction for you.",
                    "metadata": {
                        "details": {
                            "type": "transaction",
                            "context": "User wants to submit this Stellar transaction",
                            "already_processed": false,
                            "valid": true
                        }
                    }
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "I've created another payment transaction. Here's the XDR: AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw=="
                }
            },
            {
                "user": "{{user2}}",
                "content": {
                    "text": "I'll process this payment transaction for you right away.",
                    "metadata": {
                        "details": {
                            "type": "payment",
                            "context": "User created another payment transaction",
                            "already_processed": false,
                            "valid": true
                        }
                    }
                }
            }
        ],
        [
            {
                "user": "{{user1}}",
                "content": {
                    "text": "Did you finish processing my payment from earlier? The XDR was AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw=="
                }
            },
            {
                "user": "{{user2}}",
                "content": {
                    "text": "Yes, that transaction has already been processed and confirmed on the Stellar network.",
                    "metadata": {
                        "details": {
                            "type": "payment",
                            "context": "User asking about previously processed payment",
                            "already_processed": true,
                            "valid": true
                        }
                    }
                }
            }
        ]
    ] as ActionExample[][]
} as Action;