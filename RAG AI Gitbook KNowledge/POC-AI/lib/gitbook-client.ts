/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export class GitBookClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.gitbook.com/v1";
  }

  // Search for relevant content in a specific organization
  async searchContent(
    organizationId: string,
    query: string
  ): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/orgs/${organizationId}/search`,
        {
          params: { q: query },
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return response.data.hits.map((hit: any) => hit.snippet);
    } catch (error) {
      console.error("Error searching GitBook content:", error);
      return [];
    }
  }

  // Fetch the primary content of a specific space
  async fetchSpaceContent(spaceId: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/spaces/${spaceId}/content`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return response.data.pages.map((page: any) => page?.content || "");
    } catch (error) {
      console.error("Error fetching space content:", error);
      return [];
    }
  }
}
