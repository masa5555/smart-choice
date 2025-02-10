import { firestore } from "@/app/_config/firestore";
import { Hono } from "hono";

const app = new Hono().get("/:id", async (c) => {
  const id = c.req.param("id");

  if (process.env.ENV === "local") {
    return c.json({
      message: "Hello from Hono!",
      status: 200,
      body: {
        id: "1agaega33",
        name: "reasoning",
        status: "created",
        result: "",
      },
    });
  }
  const plan = await firestore.doc(`plans/${id}`).get();

  return c.json({
    message: "Hello from Hono!",
    status: 200,
    body: plan.data() as {
      id: string;
      name: string;
      status: string;
      result: string;
    },
  });
});

export default app;
