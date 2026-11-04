import env from "./config/env.js";
import server from "./server.js";

const { PORT: port } = env;

// idleTimeout must be high, otherwise LLM tool calls might not complete
// Bun's default is 10s, which kills slow LLM streams/tool calls. 255 is the max.
const runServer = {
  port,
  fetch: server.fetch,
  idleTimeout: 255,
};

export default runServer;
