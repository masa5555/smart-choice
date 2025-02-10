import { enableFirebaseTelemetry } from "@genkit-ai/firebase";
import vertexAI, { gemini20Flash001 } from "@genkit-ai/vertexai";
import { genkit } from "genkit";

enableFirebaseTelemetry();

export const vertexAiGemini20Flash = genkit({
  plugins: [vertexAI({ location: "us-central1" })],
  model: gemini20Flash001,
});
