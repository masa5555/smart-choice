"use server";

import { z } from "genkit";
import { vertexAiGemini20Flash } from "../_config/genkit";

const ai = vertexAiGemini20Flash;

export const menuSuggestionStreamingFlow = ai.defineFlow(
  {
    name: "menuSuggestionFlow",
    inputSchema: z.string(),
    streamSchema: z.string(),
    outputSchema: z.object({ theme: z.string(), menuItem: z.string() }),
  },
  async (restaurantTheme, { sendChunk }) => {
    const response = await ai.generateStream({
      prompt: `Invent a menu item for a ${restaurantTheme} themed restaurant.`,
    });

    for await (const chunk of response.stream) {
      // Here, you could process the chunk in some way before sending it to
      // the output stream via streamingCallback(). In this example, we output
      // the text of the chunk, unmodified.
      sendChunk(chunk.text);
      // console.log(chunk.text);
    }

    return {
      theme: restaurantTheme,
      menuItem: (await response.response).text,
    };
  },
);
