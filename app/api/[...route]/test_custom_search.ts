import { google } from "googleapis";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const customSearch = google.customsearch({
    version: "v1",
    auth: process.env.CUSTOM_SEARCH_API_KEY,
  });

  const res = await customSearch.cse.list({
    cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
    q: "冷蔵庫",
  });

  console.log(res.data);

  return c.json({
    message: "Hello from Hono!",
    status: 200,
    body: {},
  });
});

export default app;
