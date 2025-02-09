"use server";

import { z } from "genkit";
import { vertexAiGemini20Flash } from "../_config/genkit";

const ai = vertexAiGemini20Flash;

const outputSchema = z.object({
  // productList: z.array(
  //   z.object({
  //     productName: z.string(),
  //     genreName: z.string(),
  //     smallImageUrl: z.string(),
  //   }),
  // ),
  categoryList: z.array(z.string()).max(5),
});

export const suggestCategoryFlow = ai.defineFlow(
  {
    name: "suggestCategoryFlow",
    inputSchema: z.string(),
    outputSchema,
  },
  async (productName) => {
    // fetch rakuten product search api
    const rakutenAppId = process.env.RAKUTEN_APP_ID;
    const rakutenResponse = await fetch(
      `https://app.rakuten.co.jp/services/api/Product/Search/20170426?format=json&applicationId=${rakutenAppId}&keyword=${productName}`,
    );
    if (!rakutenResponse.ok) {
      throw new Error("Failed to fetch rakuten product search api");
    }
    const rakutenJson = await rakutenResponse.json();
    const productList = rakutenJson?.Products?.map(
      (product: {
        Product: {
          productName: string;
          brandName: string;
          genreId: string;
          genreName: string;
          smallImageUrl: string;
        };
      }) => {
        const { productName, brandName, genreId, genreName, smallImageUrl } =
          product.Product;
        return { productName, brandName, genreId, genreName, smallImageUrl };
      },
    );
    console.log(productList);

    if (productList.length === 0) {
      const { output } = await ai.generate({
        prompt: `
        # タスク
        ${productName} に関係しそうな商品カテゴリを推薦してください。
  
        # 入力
        ${JSON.stringify(productList)}
        `,
        output: {
          schema: outputSchema,
        },
      });
      if (!output) {
        throw new Error("Failed to generate suggestion");
      }
      return output;
    }

    const { output } = await ai.generate({
      prompt: `
      # タスク
      以下の入力をグループ化してください。

      # 制約
      - 似たような商品名の商品をグループ化してください。
      - 具体的な商品名をカテゴリにしないでください。
      - ”genreName”をそのままカテゴリとして使用してください。

      # 入力
      ${JSON.stringify(productList)}
      `,
      output: {
        schema: outputSchema,
      },
    });

    if (!output) {
      throw new Error("Failed to generate suggestion");
    }

    return output;
  },
);
