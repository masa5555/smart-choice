"use server";

import { firestore } from "@/app/_config/firestore";

export default async function getResult({
  id,
}: {
  id: string;
}) {
  if (process.env.ENV === "local") {
    return {
      status: "created",
      createdAt: new Date().toISOString(),
    };
  }
  const doc = await firestore.doc(`results/${id}`).get();

  return doc.data();
}
