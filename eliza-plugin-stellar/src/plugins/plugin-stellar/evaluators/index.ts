import { composeContext } from "@elizaos/core";
import { generateObjectArray } from "@elizaos/core";
import { MemoryManager } from "@elizaos/core";
import {
    type ActionExample,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type Evaluator,
} from "@elizaos/core";

const xdrTemplate =
    // {{actors}}
    `TASK: Extract Stellar XDR transactions from the conversation as an array in JSON format.

# START OF EXAMPLES
These are examples of the expected output of this task:
{{evaluationExamples}}
# END OF EXAMPLES

# INSTRUCTIONS

Extract any Stellar XDR transaction strings from the conversation:
- Stellar XDR strings typically start with "AAAAAA" and contain a long base64-encoded string
- Check if the XDR has already been extracted by comparing with known XDRs
- Set type to 'transaction', 'payment', or 'other' based on the context
- If you're not sure about the type, set it to 'transaction'
- Set already_processed to true if this XDR has already been processed
- Set valid to true if the XDR appears to be a valid Stellar XDR format
- Invalid XDRs should still be extracted but marked with valid: false
- Include any relevant context about the transaction if available

Recent Messages:
{{recentMessages}}

Response should be a JSON object array inside a JSON markdown block. Correct response format:
\`\`\`json
[
  {"xdr": string, "type": enum<transaction|payment|other>, "context": string, "already_processed": boolean, "valid": boolean},
  {"xdr": string, "type": enum<transaction|payment|other>, "context": string, "already_processed": boolean, "valid": boolean},
  ...
]
\`\`\``;

async function handler(runtime: IAgentRuntime, message: Memory): Promise<any> {
    console.log("HANDLING EVALUATORS")
    const state = await runtime.composeState(message);

    const { agentId, roomId } = state;

    const context = composeContext({
        state,
        template: xdrTemplate,
    });

    const xdrs = await generateObjectArray({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
    });

    console.log(xdrs);

    const xdrManager = new MemoryManager({
        runtime,
        tableName: "stellar_xdrs",
    });

    if (!xdrs) {
        return [];
    }

    // Filter out XDRs that are already processed or invalid
    const filteredXDRs = xdrs
        .filter((xdrData) => {
            return (
                !xdrData.already_processed &&
                xdrData.valid === true &&
                xdrData.xdr &&
                xdrData.xdr.trim() !== ""
            );
        })
        .map((xdrData) => ({
            xdr: xdrData.xdr,
            type: xdrData.type,
            context: xdrData.context || ""
        }));

    // Store each XDR in memory and process them
    const responses: Memory[] = [];

    for (const xdrData of filteredXDRs) {
        const xdrMemory = await xdrManager.addEmbeddingToMemory({
            userId: agentId!,
            agentId,
            content: {
                text: xdrData.xdr,
                metadata: {
                    type: xdrData.type,
                    context: xdrData.context,
                    action: "PROCESS_STELLAR_XDR"
                }
            },
            roomId,
            createdAt: Date.now(),
        });

        await xdrManager.createMemory(xdrMemory, true);
        responses.push(xdrMemory);

        // Add a small delay between processing
        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    // Process actions for all collected responses
    if (responses.length > 0) {
        await runtime.processActions(message, responses, state);
    }

    return filteredXDRs.map(xdrData => xdrData.xdr);
}

export const stellarXDREvluator: Evaluator = {
    name: "GET_STELLAR_XDR",
    similes: [
        "EXTRACT_XDR",
        "PROCESS_XDR",
        "GET_TRANSACTION",
        "EXTRACT_TRANSACTION",
        "PROCESS_STELLAR_TRANSACTION"
    ],
    validate: async (
        runtime: IAgentRuntime,
        message: Memory
    ): Promise<boolean> => {
        // Look for a base64-encoded string that matches Stellar XDR pattern
        const content = message.content.text;
        const xdrPattern = /(?:xdr\s*:\s*)?([A-Za-z0-9+/=]{50,})/i;
        const match = content.match(xdrPattern);

        const potentialXDR = !!match;
        console.log("XDR validation:", potentialXDR);

        return potentialXDR;
    },
    description:
        "Extract and process Stellar XDR transaction strings from user messages, triggering appropriate actions when valid XDRs are found.",
    handler,
    examples: [
        {
            context: `Actors in the scene:
{{user1}}: A Stellar blockchain user wanting to submit a transaction.
{{user2}}: Assistant helping with blockchain operations.

Known Stellar XDRs:
None`,
            messages: [
                {
                    user: "{{user1}}",
                    content: { text: "I need help submitting this Stellar transaction" },
                },
                {
                    user: "{{user2}}",
                    content: { text: "I'd be happy to help. Do you have the XDR for your transaction?" },
                },
                {
                    user: "{{user1}}",
                    content: { text: "Yes, here it is: AAAAAH8ab6ZBisg/UxNFBWp8FFXL0L7CKrwDL6Q40f0Uz2FqAAAAZAB3wuYAAAACAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAA3gDx9gtvBwDGxF6sgiLDUOBnwEJmm7TCJ9LwyaLp/iUAAAABVVNEAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAAAmKIuZAAAAAAAAAAABFM9hagAAAEDRRWwywj9SNa2M8AYl4OMxIpLSzH9KK9hQUFgQpzV+/e8HA5jPUi9WQl19QeGz8/uFwOXAtmOgpZcxK6J7HQ0I" },
                },
                {
                    user: "{{user2}}",
                    content: { text: "Thanks for providing the XDR. Let me process this transaction for you." },
                },
            ] as ActionExample[],
            outcome: `\`\`\`json
[
  {
    "xdr": "AAAAAH8ab6ZBisg/UxNFBWp8FFXL0L7CKrwDL6Q40f0Uz2FqAAAAZAB3wuYAAAACAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAA3gDx9gtvBwDGxF6sgiLDUOBnwEJmm7TCJ9LwyaLp/iUAAAABVVNEAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAAAmKIuZAAAAAAAAAAABFM9hagAAAEDRRWwywj9SNa2M8AYl4OMxIpLSzH9KK9hQUFgQpzV+/e8HA5jPUi9WQl19QeGz8/uFwOXAtmOgpZcxK6J7HQ0I",
    "type": "transaction",
    "context": "User wants to submit this Stellar transaction",
    "already_processed": false,
    "valid": true
  }
]
\`\`\``,
        },
        {
            context: `Actors in the scene:
{{user1}}: A Stellar wallet user making a payment.
{{user2}}: Assistant helping with Stellar operations.

Known Stellar XDRs:
AAAAAH8ab6ZBisg/UxNFBWp8FFXL0L7CKrwDL6Q40f0Uz2FqAAAAZAB3wuYAAAACAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAA3gDx9gtvBwDGxF6sgiLDUOBnwEJmm7TCJ9LwyaLp/iUAAAABVVNEAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAAAmKIuZAAAAAAAAAAABFM9hagAAAEDRRWwywj9SNa2M8AYl4OMxIpLSzH9KK9hQUFgQpzV+/e8HA5jPUi9WQl19QeGz8/uFwOXAtmOgpZcxK6J7HQ0I`,
            messages: [
                {
                    user: "{{user1}}",
                    content: { text: "I've created another payment transaction. Here's the XDR: AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw==" },
                },
                {
                    user: "{{user2}}",
                    content: { text: "I'll process this payment transaction for you right away." },
                },
            ] as ActionExample[],
            outcome: `\`\`\`json
[
  {
    "xdr": "AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw==",
    "type": "payment",
    "context": "User created another payment transaction",
    "already_processed": false,
    "valid": true
  }
]
\`\`\``,
        },
        {
            context: `Actors in the scene:
{{user1}}: A user discussing an already processed transaction.
{{user2}}: Assistant helping with Stellar operations.

Known Stellar XDRs:
AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw==`,
            messages: [
                {
                    user: "{{user1}}",
                    content: { text: "Did you finish processing my payment from earlier? The XDR was AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw==" },
                },
                {
                    user: "{{user2}}",
                    content: { text: "Yes, that transaction has already been processed and confirmed on the Stellar network." },
                },
            ] as ActionExample[],
            outcome: `\`\`\`json
[
  {
    "xdr": "AAAAANW8EUZAAY9gYyIvmb2IpPF7tcIhhTrMy9YbKWxINTOGAAAAZAEr8BkAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAdZtwPxUrSKUMZsmmxeNzh2zFPQgN9nNS1xIJCO+GcJUAAAABU1REAAAAAADdvkoXq7LXRpTIq1jZT66MxaCzF0QGdgCabQu29sl5nAAAAACYloAAAAAAAAAAAAE1M4YAAABAXj9UW7SEfMRPgFqy4ztRZiMqGGz0pSRiN2J8xOIBkQWuCqmyjylOafK9GLXbMm5IjSd3qcGVjJCnNvAYx7yECw==",
    "type": "payment",
    "context": "User asking about previously processed payment",
    "already_processed": true,
    "valid": true
  }
]
\`\`\``,
        },
    ],
};