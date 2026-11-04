import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";

import { HttpStatusCodes } from "../../../../../packages/httpStatus/src";
import type { ServerBindings } from "../../types";

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return error;
};

const onError: ErrorHandler<ServerBindings> = (error, c) => {
  const log = c.get("logger");
  if (error instanceof HTTPException) {
    if (error.status >= HttpStatusCodes.INTERNAL_SERVER_ERROR) {
      log.error("HTTP exception", { err: serializeError(error) });
    }
    return c.json({ error: error.message === "" ? "Request failed" : error.message }, error.status);
  }

  log.error("Unhandled server error", { err: serializeError(error) });
  return c.json({ error: "Internal server error" }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
};

export default onError;
