import { index, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const roleEnum = pgEnum("role", ["USER", "ASSISTANT", "ERROR"]);
const modeEnum = pgEnum("mode", ["BUILD", "PLAN"]);
const messageStatusEnum = pgEnum("message_status", ["COMPLETE", "INTERRUPTED"]);

const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    cwd: text("cwd"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);

const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    role: roleEnum("role").notNull(),
    status: messageStatusEnum("status").notNull(),
    model: text("model").notNull(),
    content: text("content").notNull(),
    parts: jsonb("parts").$type<unknown[]>(),
    mode: modeEnum("mode").notNull(),
    duration: integer("duration"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("messages_session_id_idx").on(t.sessionId)],
);

const schema = { sessions, messages };

export { roleEnum, modeEnum, messageStatusEnum, sessions, messages };
export default schema;
