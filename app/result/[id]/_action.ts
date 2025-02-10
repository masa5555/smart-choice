"use server";

import { firestore } from "@/app/_config/firestore";
const crypto = require("node:crypto");

export default async function createNewResult() {
  const uuid = crypto.randomUUID();
  console.log({ uuid });
  const doc = firestore.collection("results").add({
    status: "created",
    createdAt: new Date().toISOString(),
  });
  console.log({ id: doc.id });

  return {
    id: doc.id,
  };
}
