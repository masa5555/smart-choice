import { z } from "genkit";

export const GeneratePerspectiveSchema = z
  .array(
    z.object({
      name: z.string().describe("観点の名前 ex) 予算"),
      description: z
        .array(z.string())
        .min(1)
        .max(3)
        .describe(
          `# 出力タスク
          観点の詳細説明

          # 制約
          - 他の観点とのトレードオフについて、1行で収まるように簡潔に説明してください
          - 一文で一つのことだけを説明してほしい
          - 「-」を含めないでください
          - その観点を気にしない人のための選択を用意してください
          `,
        ),
      choices: z
        .array(z.string())
        .max(4)
        .describe(`
          # 出力タスク
          観点の具体的な選択肢

          # 制約
          - 観点名自体を含めないでください
          - unicodeで10文字以内にして下さい
          - 具体的な選択基準を設定して下さい ex) 10万円以下
        `),
    }),
  )
  .min(1)
  .max(5);
