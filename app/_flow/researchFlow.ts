"use server";

import { z } from "genkit";
import { vertexAiGemini20Flash } from "../_config/genkit";

const ai = vertexAiGemini20Flash;

export const researchFlow = ai.defineFlow(
  {
    name: "researchFlow",
    inputSchema: z.array(
      z.object({
        perspective: z.string(),
        userSelection: z.string(),
      }),
    ),
    outputSchema: z.string(),
  },
  async (input) => {
    if (input.length === 0) {
      return "エラー: 入力がありません";
    }

    const response = await ai.generate({
      prompt: `
      # タスク
      ${input[0].userSelection}を比較する上での調査を文章で生成して下さい

      # 制約
      - 人によって選択肢が分かれやすいものを優先してほしい
      - ${input[0].userSelection}に最適化された理由を生成してほしい
      - ${input[0].perspective}に最適化された理由を生成してほしい
      `,
      output: {
        schema: z.string().describe("生成された文章"),
      },
    });
    const { output, usage } = response;
    if (!output) {
      throw new Error("Failed to generate reasoning");
    }
    console.log({ output, usage });
    return output;
  },
);
