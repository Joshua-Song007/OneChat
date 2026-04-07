// src/services/searchService.ts

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  sourceDomain: string;
}

export const searchService = {
  async search(query: string): Promise<SearchResult[]> {
    console.log("searchService.search called with:", query);
    // Stub: return a fake result.
    return [
      {
        title: "Example result",
        url: "https://example.com",
        snippet: "This is a fake search result snippet.",
        sourceDomain: "example.com"
      }
    ];
  }
};
