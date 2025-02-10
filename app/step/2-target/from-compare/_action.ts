"use server";

import { firestore } from "@/app/_config/firestore";
import { researchFlow } from "@/app/_flow/researchFlow";
import { redirect } from "next/navigation";
import { after } from "next/server";

export const handleSubmit = async ({
  items,
  category,
}: {
  items: string[];
  category: string;
}) => {
  console.log({ items, category });

  const env = process.env.ENV || "production";

  if (env === "local") {
    return redirect("/result/135353533");
  }

  const plan = await firestore.collection("plans").add({
    status: "created",
    category,
    items,
  });

  const doc = await firestore.collection("results").add({
    status: "created",
    createdAt: new Date().toISOString(),
    plans: [
      {
        id: plan.id,
        name: `${items.join(" vs ")}の比較`,
      },
    ],
  });
  if (!doc.id) {
    throw new Error("Failed to create a new result");
  }

  after(async () => {
    const res = await researchFlow({
      category,
      items: items.map((item) => ({
        perspective: category,
        userSelection: item,
      })),
    });
    console.log({
      compare_result: res,
    });
    await firestore.doc(`plans/${plan.id}`).set({
      status: "finished",
      result: res,
    });
  });

  return redirect(`/result/${doc.id}`);
};
