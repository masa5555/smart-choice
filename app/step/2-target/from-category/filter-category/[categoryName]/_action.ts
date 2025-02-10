"use server";

import { after } from "next/server";

import { firestore } from "@/app/_config/firestore";
import { generateReasoningFlow } from "@/app/_flow/generateReasoningFlow";
import { researchFlow } from "@/app/_flow/researchFlow";
import { redirect } from "next/navigation";

export const handleSubmit = async (formData: FormData) => {
  console.log(formData);
  const category = String(formData.get("category"));

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
        status: "created",
        result: "",
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

  const userSelection = Array.from(formData)
    .filter(([key, _]) => !key.includes("ACTION"))
    .map(([key, value]) => {
      return {
        perspective: key,
        userSelection: String(value),
      };
    });
  console.log({ userSelection });

  // https://nextjs.org/docs/app/api-reference/functions/after
  after(async () => {
    const reasoningPlan = childDocs.find((plan) => plan.name === "reasoning");
    console.log({ reasoningPlan });
    if (reasoningPlan) {
      // const result = await generateReasoningFlow({
      //   category,
      //   items: userSelection,
      // });
      await firestore.doc(`plans/${reasoningPlan.id}`).set({
        name: "reasoning",
        status: "finished",
        result: "XXXXX",
      });
    }

    const researchPlan = childDocs.find((plan) => plan.name === "research");
    if (researchPlan) {
      const items = await researchFlow({
        category,
        items: userSelection,
      });
      await firestore.doc(`plans/${researchPlan?.id}`).set({
        name: "research",
        status: "finished",
        result: { items },
      });
    }
    console.log({ researchPlan });

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(1000);

    const observePlan = childDocs.find((plan) => plan.name === "observe");
    if (observePlan) {
      await firestore.doc(`plans/${observePlan?.id}`).set({
        name: "observe",
        status: "finished",
        result: "",
      });
    }
    console.log({ observePlan });

    await sleep(1000);

    const formatPlan = childDocs.find((plan) => plan.name === "format");
    console.log({ formatPlan });
    if (formatPlan) {
      await firestore.doc(`plans/${formatPlan?.id}`).set({
        name: "format",
        status: "finished",
        result: "",
      });
    }
  });
  return redirect(`/result/${doc.id}`);
};
