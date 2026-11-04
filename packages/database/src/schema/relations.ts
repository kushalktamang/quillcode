import { defineRelations } from "drizzle-orm";

import schema from "./schema";

const relations = defineRelations(schema, (r) => ({
  sessions: {
    messages: r.many.messages(),
  },
  messages: {
    session: r.one.sessions({
      from: r.messages.sessionId,
      to: r.sessions.id,
    }),
  },
}));

export default relations;
