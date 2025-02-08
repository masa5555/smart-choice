"use server";

import {
  // DynamicRetrievalMode,
  gemini15Flash,
  // gemini15Pro,
  // gemini20FlashExp,
  googleAI,
} from "@genkit-ai/googleai";
import { genkit, z } from "genkit";
import { GeneratePerspectiveSchema } from "./schema";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash,
});

export const generatePerspectiveFlow = ai.defineFlow(
  {
    name: "generatePerspectiveFlow",
    inputSchema: z.string(),
    outputSchema: z.object({
      theme: z.string(),
      perspectives: GeneratePerspectiveSchema,
    }),
  },
  async (category) => {
    // 選択肢、チェックボックス分けれるようにしたい
    const { output } = await ai.generate({
      prompt: `
      # タスク
      ${category}を比較する上での観点を生成して

      # 制約
      - 人によって選択肢が分かれやすいものを優先してほしい
      `,
      output: {
        schema: GeneratePerspectiveSchema,
      },
    });
    if (!output) {
      throw new Error("Failed to generate perspective");
    }
    return {
      theme: category,
      perspectives: output,
    };
  },
);
