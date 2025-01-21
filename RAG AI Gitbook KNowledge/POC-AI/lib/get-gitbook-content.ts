/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchGitBookContent = async (query: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/gitbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        console.error('Failed to fetch GitBook content');
        return null;
      }
  
      const { results } = await response.json();
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return results.hits.map((hit: any) => hit.snippet).join('\n');
    } catch (error) {
      console.error('Error fetching GitBook content:', error);
      return null;
    }
  };