import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import relations from "./schema/relations";

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl === undefined || databaseUrl.length === 0) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(databaseUrl);
const db = drizzle({ client: sql, relations });

export default db;
