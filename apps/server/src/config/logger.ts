import { createLogger } from "@quillcode/logger";

import env from "./env";

const logger = createLogger({
  service: "quillcodeServer",
  level: env.LOG_LEVEL,
  isProduction: env.NODE_ENV === "production",
});

export default logger;
