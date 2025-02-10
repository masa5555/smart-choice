"use server";

import { z } from "genkit";
import { vertexAiGemini20Flash } from "../_config/genkit";

const ai = vertexAiGemini20Flash;

const outputSchema = z.string();

export const generateReasoningFlow = ai.defineFlow(
  {
    name: "generateReasoningFlow",
    inputSchema: z.object({
      category: z.string(),
      items: z.array(
        z.object({
          perspective: z.string(),
          userSelection: z.string(),
        }),
      ),
    }),
    outputSchema,
  },
  async ({ category, items }) => {
    if (items.length === 0) {
      return "エラー: 入力がありません";
    }
    const response = await ai.generate({
      prompt: `
      # タスク
      ${category}を比較する上での思考を文章で生成して下さい
      `,
      output: {
        schema: outputSchema,
      },
    });
    console.log({ response });
    const { output, usage } = response;
    if (!output) {
      throw new Error("Failed to generate reasoning");
    }
    console.log({ output, usage });
    return output;
  },
);
