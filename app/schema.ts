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
          - 他の観点とのトレードオフについて、簡潔に説明してください
          - 一文で一つのことだけを説明してほしい
          - スマホの横幅で2行以内の短く簡潔な長さにしてほしい
          - 「-」を含めないでください
          `,
        ),
      choices: z
        .array(
          z.string().describe(`
          # 出力タスク
          観点の選択肢名の値

          # 制約
          - 観点名自体を含めないでください
        `),
        )
        .max(4),
    }),
  )
  .max(5);
