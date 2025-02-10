"use server";

import { firestore } from "@/app/_config/firestore";
import { redirect } from "next/navigation";

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

  const doc = await firestore.collection("results").add({
    status: "created",
    createdAt: new Date().toISOString(),
    plans: [
      {
        id: "1",
        name: `${items.join(" vs ")}の比較`,
        status: "created",
      },
    ],
  });
  if (!doc.id) {
    throw new Error("Failed to create a new result");
  }

  return redirect(`/result/${doc.id}`);
};
