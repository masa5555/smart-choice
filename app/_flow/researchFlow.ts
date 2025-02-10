"use server";

import { z } from "genkit";
import { google } from "googleapis";
import { vertexAiGemini20Flash } from "../_config/genkit";

const ai = vertexAiGemini20Flash;

const outputSchema = z.array(
  z.object({
    itemName: z.string(),
    description: z.string(),
  }),
);

export const researchFlow = ai.defineFlow(
  {
    name: "researchFlow",
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
      return [];
    }

    const customSearch = google.customsearch({
      version: "v1",
      auth: process.env.CUSTOM_SEARCH_API_KEY,
    });

    const res = await customSearch.cse.list({
      cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
      q: category,
    });

    console.log(res.data);
    if (!res.data.items) {
      return [];
    }
    const result = await Promise.all(
      res.data.items.map(async (d) => {
        if (!d.link) return;
        const scrape = await fetch(d.link);
        const text = await scrape.text();
        const summary = await ai.generate({
          prompt: `
          # タスク
            コンテキストから${category}の商品に関わる情報を最大1000字で要約して
          
          # コンテキスト
            ${text}
          `,
        });
        const summaryText = summary.text;
        console.log({ summaryText });
        return {
          title: d.title,
          link: d.link,
          summary: summaryText,
        };
      }),
    );

    const response = await ai.generate({
      prompt: `
      # タスク
      ${category}の商品の比較を商品ごとに作成して

      # 観点
      ${items.map((item) => `- ${item.perspective}: ${item.userSelection}`).join("\n")}

      # 事前情報
      ${items.map((item) => `- ${item.perspective}: ${item.userSelection}`).join("\n")}
      `,
      output: {
        schema: outputSchema,
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
