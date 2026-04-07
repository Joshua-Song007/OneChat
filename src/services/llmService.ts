// src/services/llmService.ts

export const llmService = {
  async chatCompletion(systemPrompt: string, userPrompt: string): Promise<string> {
    console.log("llmService.chatCompletion called");
    console.log("System prompt:", systemPrompt.slice(0, 200));
    console.log("User prompt:", userPrompt.slice(0, 200));
    // Stub: just echo something simple.
    return "This is a stubbed LLM response based on your message.";
  }
};
// src/services/llmService.ts