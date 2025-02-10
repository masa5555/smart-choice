"use server";

import { after } from "next/server";

import { firestore } from "@/app/_config/firestore";
import { redirect } from "next/navigation";

export const handleSubmit = async (formData: FormData) => {
  console.log(formData);

  if (!formData) {
    throw new Error("Failed to get form data");
  }

  const env = process.env.ENV || "production";

  if (env === "local") {
    return redirect("/result/135353533");
  }

  const doc = await firestore.collection("results").add({
    status: "created",
    createdAt: new Date().toISOString(),
  });
  if (!doc.id) {
    throw new Error("Failed to create a new result");
  }

  // 一旦固定値
  const plans = ["reasoning", "research", "observe", "format"];

  // add all child docs
  const childDocs = await Promise.all(
    plans.map(async (plan) => {
      return await firestore.doc(`results/${doc.id}`).add({
        name: plan,
      });
    }),
  );
  console.log({ childDocs });

  await firestore.doc(`results/${doc.id}`).set({
    plans: childDocs,
  });

  // https://nextjs.org/docs/app/api-reference/functions/after
  after(() => {});
  return redirect(`/result/${doc.id}`);
};
