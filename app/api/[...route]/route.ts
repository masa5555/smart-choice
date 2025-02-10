import { Hono } from "hono";
import { handle } from "hono/vercel";

import helloRoute from "./hello";
import planRoute from "./plans";
import testCustomSearchRoute from "./test_custom_search";

export const runtime = "nodejs"; // or 'nodejs'

const app = new Hono()
  .basePath("/api")
  .route("/hello", helloRoute)
  .route("/plans", planRoute)
  .route("/test_custom_search", testCustomSearchRoute);

export const GET = handle(app);

export const POST = handle(app);

export type AppType = typeof app;
