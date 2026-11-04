import type { ServerType } from "@quillcode/server";
import { hc } from "hono/client";

const apiClient = hc<ServerType>(process.env.API_URL ?? "http://localhost:8080");

export default apiClient;
