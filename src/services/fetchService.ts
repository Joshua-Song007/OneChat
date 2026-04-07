// src/services/fetchService.ts

export interface FetchResult {
  text: string;
  metadata: {
    title?: string;
    headings?: string[];
  };
}

export const fetchService = {
  async fetchAndClean(url: string): Promise<FetchResult> {
    console.log("fetchService.fetchAndClean called with:", url);
    // Stubbed page content
    return {
      text: `Stubbed page content for ${url}`,
      metadata: {
        title: `Stubbed title for ${url}`,
        headings: []
      }
    };
  }
};
