import { createRouter } from "../../lib/createServer";
import {
  create as createHandler,
  getOne as getOneHandler,
  list as listHandler,
} from "./sessionsHandler";
import { create, getOne, list } from "./sessionsRoute";

const router = createRouter()
  .openapi(list, listHandler)
  .openapi(create, createHandler)
  .openapi(getOne, getOneHandler);

export default router;
