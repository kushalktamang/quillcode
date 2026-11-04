import path from "path";

import { config } from "dotenv";
import { z } from "zod";

// load env files from only dev/test only
if (process.env.NODE_ENV !== "production") {
  const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  config({
    path: path.resolve(process.cwd(), envFile),
    quiet: true,
  });

  if (process.env.NODE_ENV === "development") {
    config({
      path: path.resolve(process.cwd(), "../../packages/database/.env"),
      quiet: true,
    });
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(8081),
  DATABASE_URL: z.string().min(1),
  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly", "silent"])
    .default("info"),
});

type Env = z.infer<typeof envSchema>;

const result = envSchema.safeParse(process.env);

if (!result.success) {
  /* oxlint-disable no-console -- runs before the logger exists */
  console.error("Invalid env:");
  console.error(z.flattenError(result.error).fieldErrors);
  /* oxlint-enable no-console */
  process.exit(1);
}

const env: Env = result.data;

export default env;
