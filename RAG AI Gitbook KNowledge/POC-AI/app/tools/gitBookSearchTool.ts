/* eslint-disable @typescript-eslint/no-explicit-any */
import { tool } from "ai";
import { z } from "zod";

export const gitBookSearchTool = tool({
  description:
    "Fetches information from GitBook based on a query and project selection.",
  parameters: z.object({
    query: z.string().min(1).describe("The search query for GitBook."),
    project: z
      .object({
        value: z.string().describe("The project identifier"),
        label: z.string().describe("The project name"),
      })
      .describe("The selected project information"),
  }),
  execute: async ({ query, project }) => {
    let GITBOOK_SPACE_ID: string | undefined;
    let GITBOOK_API_TOKEN: string | undefined;

    // Set the correct environment variables based on project
    switch (project.value) {
      case "kindfi":
        GITBOOK_SPACE_ID = process.env.GITBOOK_KF_SPACE_ID;
        GITBOOK_API_TOKEN = process.env.GITBOOK_KF_API_TOKEN;
        break;
      case "trustless":
        GITBOOK_SPACE_ID = process.env.GITBOOK_TL_SPACE_ID;
        GITBOOK_API_TOKEN = process.env.GITBOOK_TL_API_TOKEN;
        break;
      default:
        throw new Error(`Unknown project: ${project.value}`);
    }

    if (!GITBOOK_SPACE_ID || !GITBOOK_API_TOKEN) {
      throw new Error(
        `GitBook credentials are not properly configured for ${project.label}`
      );
    }

    try {
      const response = await fetch(
        `https://api.gitbook.com/v1/spaces/${GITBOOK_SPACE_ID}/search/ask`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITBOOK_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitBook API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return {
        answer: data.answer.text,
        followUpQuestions: data.answer.followupQuestions,
        sources: data.answer.sources.map(
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (source: { page: any; type: any }) => ({
            page: source.page,
            type: source.type,
          })
        ),
      };
    } catch (error) {
      console.error(`GitBook search error for ${project.label}:`, error);
      throw new Error(
        `Failed to fetch information from ${project.label} GitBook`
      );
    }
  },
});
