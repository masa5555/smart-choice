import { firestore } from "@/app/_config/firestore";
import { Hono } from "hono";

const app = new Hono().get("/:id", async (c) => {
  const id = c.req.param("id");
  const plan = await firestore.doc(`plans/${id}`).get();

  return c.json({
    message: "Hello from Hono!",
    status: 200,
    body: plan.data(),
  });
});

export default app;
