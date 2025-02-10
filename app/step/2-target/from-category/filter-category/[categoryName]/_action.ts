"use server";

import { after } from "next/server";

import { firestore } from "@/app/_config/firestore";
import { generateReasoningFlow } from "@/app/_flow/generateReasoningFlow";
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
      const planId = await firestore.collection("plans").add({
        name: plan,
      });
      return {
        id: planId.id,
        name: plan,
        status: "created",
      };
    }),
  );

  console.log({ childDocs });

  await firestore.doc(`results/${doc.id}`).set({
    plans: childDocs,
  });

  // https://nextjs.org/docs/app/api-reference/functions/after
  after(async () => {
    const researchPlan = childDocs.find((plan) => plan.name === "research");
    if (!researchPlan) {
      throw new Error("Failed to find research plan");
    }
    const userSelection = Object.entries(formData)
      .filter(([key, _]) => !key.includes("ACTION"))
      .map(([key, value]) => {
        return {
          perspective: key,
          userSelection: String(value),
        };
      });
    const result = await generateReasoningFlow(userSelection);
    await firestore.doc(`plans/${researchPlan.id}`).set({
      status: "finished",
      result: result,
    });

    // for (const plan of childDocs) {
    //   if (plan.name === "research") {
    //     // cse.list(query)
    //   } else if (plan.name === "observe") {
    //     // {}
    //   } else if {
    //     // {}
    //   } else {
    //     // {}
    //   }
    // }
  });
  return redirect(`/result/${doc.id}`);
};
