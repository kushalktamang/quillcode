import { createServer } from "./lib/createServer.js";
import openApiDocument from "./openapi/document.js";
import sessions from "./routes/sessions/index.js";

const server = createServer();

const routes = [sessions] as const;

openApiDocument(server);

routes.forEach((r) => {
  server.route("/", r);
});

export type ServerType = (typeof routes)[number];

// const routes = server.route("/sessions", sessions);
// export type ServerType = typeof routes;

export default server;
