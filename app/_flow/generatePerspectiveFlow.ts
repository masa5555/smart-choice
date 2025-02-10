"use server";

import { z } from "genkit";
import {
  cacheGeneratePerspectiveCollectionName,
  firestore,
} from "../_config/firestore";
import { vertexAiGemini20Flash } from "../_config/genkit";
import { GeneratePerspectiveSchema } from "../_schema/GeneratePerspectiveSchema";

const ai = vertexAiGemini20Flash;

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
    let doc = null;
    if (process.env.ENV !== "local") {
      doc = await firestore
        .doc(`${cacheGeneratePerspectiveCollectionName}/${category}`)
        .get();
    }
    const existCache = doc && !!doc.data().theme;
    console.log({ existCache, theme: doc?.data().theme });
    if (existCache) {
      return doc.data();
    }

    // if (existCache) {
    //   return doc.data();
    // }

    // 選択肢、チェックボックス分けれるようにしたい
    const response = await ai.generate({
      prompt: `
      # タスク
      ${category}を比較する上での観点を生成して

      # 制約
      - 人によって選択肢が分かれやすいものを優先してほしい
      - ${category}に最適化された観点を生成してほしい
      
      # 冷蔵庫の場合の観点例
      - 予算
      - 大きさ
      - 電気代
      - 独自機能
      - 冷凍庫のサイズ
      `,
      output: {
        schema: GeneratePerspectiveSchema,
      },
    });
    const { output, usage } = response;
    // console.log({ output, usage });
    // const metadata = response.toJSON();
    // console.dir({ metadata }, { depth: null });
    if (!output) {
      console.error("error");
      throw new Error("Failed to generate perspective");
    }
    if (process.env.ENV !== "local") {
      await firestore
        .doc(`${cacheGeneratePerspectiveCollectionName}/${category}`)
        .set({
          theme: category,
          perspectives: output,
        });
    }
    return {
      theme: category,
      perspectives: output,
    };
  },
);
