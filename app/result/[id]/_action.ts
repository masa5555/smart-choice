"use server";

import { firestore } from "@/app/_config/firestore";
const crypto = require("node:crypto");

export default async function createNewResult() {
  const uuid = crypto.randomUUID();
  console.log({ uuid });
  const doc = firestore.collection("results").doc(`${uuid}`);
  console.log({ doc });
  const res = await doc.update({
    id: uuid,
    status: "created",
    // createdAt: new Date().toISOString(),
  });
  console.log({ res, uuid });

  const a = await doc.get();
  console.log({ a: a.data() });

  return {
    id: uuid,
  };
}
