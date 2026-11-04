import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";

import logger from "../config/logger";
import onError from "../middlewares/errors/errors";
import defaultHook from "../openapi/defaultHook";
import type { ServerBindings } from "../types/types";
import levelForStatus from "./types";

function createRouter() {
  return new OpenAPIHono<ServerBindings>({
    strict: false,
    defaultHook,
  });
}

function createServer() {
  const server = createRouter();

  // If want to use in c.get("logger")
  server.use("*", requestId());
  server.use("*", async (c, next) => {
    const log = logger.child({ requestId: c.get("requestId") });
    c.set("logger", log);

    const start = performance.now();
    await next();

    const { status } = c.res;
    log.log(levelForStatus(status), "Request completed", {
      method: c.req.method,
      path: c.req.path,
      status,
      latencyMs: Math.round(performance.now() - start),
    });
  });

  server.onError(onError);

  return server;
}

export { createRouter, createServer };
