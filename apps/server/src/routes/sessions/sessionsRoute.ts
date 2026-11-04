import { createRoute, z } from "@hono/zod-openapi";
import { HttpStatusCodes } from "@quillcode/http-status";

import jsonContent from "../../openapi/helpers/jsonContent";
import idUUIDParamsSchema from "../../openapi/schemas/idUuidParams";
import { createSessionSchema, notFoundSchema, sessionSchema, sessionSummarySchema } from "./schema";

const list = createRoute({
  tags: ["Sessions"],
  method: "get",
  path: "/sessions",
  summary: "List sessions",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(sessionSummarySchema), "Session list"),
  },
});

const getOne = createRoute({
  tags: ["Sessions"],
  method: "get",
  path: "/sessions/{id}",
  summary: "Get a session",
  request: { params: idUUIDParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(sessionSchema, "The session"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Session not found"),
  },
});

const create = createRoute({
  tags: ["Sessions"],
  method: "post",
  path: "/sessions",
  summary: "Create a session",
  request: {
    body: { content: { "application/json": { schema: createSessionSchema } }, required: true },
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(sessionSchema, "The created session"),
  },
});

type ListRoute = typeof list;
type GetOneRoute = typeof getOne;
type CreateRoute = typeof create;

export { create, getOne, list, type CreateRoute, type GetOneRoute, type ListRoute };
