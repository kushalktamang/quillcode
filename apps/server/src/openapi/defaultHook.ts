import type { Hook } from "@hono/zod-openapi";
import type { Env } from "hono";

import { HttpStatusCodes } from "../../../../packages/httpStatus/src";

const defaultHook = <E extends Env>(
  ...[result, c]: Parameters<Hook<unknown, E, string, unknown>>
) => {
  if (!result.success) {
    return c.json(
      {
        success: false as const,
        error: { issues: result.error.issues },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }
};

export default defaultHook;
