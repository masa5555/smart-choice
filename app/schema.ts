import { z } from "genkit";

export const GeneratePerspectiveSchema = z
  .array(
    z.object({
      name: z.string().describe("観点の名前 ex) 予算"),
      description: z
        .string()
        .describe("観点の説明 ex) 他の観点とのトレードオフなどの詳細説明"),
      choices: z.array(z.string()).max(4).describe("観点の選択肢"),
    }),
  )
  .max(5);
