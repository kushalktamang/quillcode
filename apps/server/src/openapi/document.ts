import { Scalar } from "@scalar/hono-api-reference";

import type { ServerOpenAPI } from "../types";

function openApiDocument(server: ServerOpenAPI) {
  server.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Quillcode",
    },
  });

  server.get(
    "/reference",
    Scalar({
      layout: "modern",
      url: "/docs",
      defaultHttpClient: { targetKey: "node", clientKey: "fetch" },
    }),
  );
}

export default openApiDocument;
