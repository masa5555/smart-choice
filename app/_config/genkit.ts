import vertexAI, { gemini15Flash } from "@genkit-ai/vertexai";
import { genkit } from "genkit";

export const vertexAiGemini15Flash = genkit({
  plugins: [vertexAI()],
  model: gemini15Flash,
});
