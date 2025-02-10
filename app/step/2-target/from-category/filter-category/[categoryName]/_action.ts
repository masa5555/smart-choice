"use server";

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
  return redirect(`/result/${doc.id}`);
};
