"use server";

import { firestore } from "@/app/_config/firestore";

export async function getPlans({
  id,
}: {
  id: string;
}): Promise<{
  status: string;
  createdAt: string;
  plans: {
    id: string;
    name: string;
  }[];
}> {
  if (process.env.ENV === "local") {
    return {
      status: "created",
      createdAt: new Date().toISOString(),
      plans: [
        {
          id: "1",
          name: "reasoning",
        },
        {
          id: "2",
          name: "research",
        },
        {
          id: "3",
          name: "observe",
        },
        {
          id: "4",
          name: "format",
        },
      ],
    };
  }
  const doc = await firestore.doc(`results/${id}`).get();

  /**
   * ページを閉じても実行され続ける
   * 何度アクセスしても、キャッシュを返せるようにする
   * データのGETリクエストはfirestoreの参照のみに専念し、プロパティが存在しない場合は、ローディングを表示する
   * このactionは、実行計画の参照のみに専念する
   * response format
   * {
   *    plans:
   *      {
   *        id: uuid,
   *        name: string,
   *       }[]
   * }
   */

  return doc.data();
}
