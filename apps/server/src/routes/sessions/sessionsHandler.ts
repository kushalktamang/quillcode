import db from "@quillcode/database/drizzle";
import { messages, sessions } from "@quillcode/database/schema";
import { HttpStatusCodes, HttpStatusPhrases } from "@quillcode/http-status";

import type { ServerRouteHandler } from "../../types";
import type { CreateRoute, GetOneRoute, ListRoute } from "./sessionsRoute";

const list: ServerRouteHandler<ListRoute> = async (c) => {
  const sessions = await db.query.sessions.findMany({
    orderBy: (session, { desc }) => [desc(session.createdAt)],
    columns: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
  return c.json(sessions);
};

const getOne: ServerRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const session = await db.query.sessions.findFirst({
    where: { id },
    with: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (session === undefined) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(session, HttpStatusCodes.OK);
};

const create: ServerRouteHandler<CreateRoute> = async (c) => {
  const { initialMessage, ...data } = c.req.valid("json");
  const sessionId = crypto.randomUUID();
  const sessionInsert = db
    .insert(sessions)
    .values({
      id: sessionId,
      ...data,
      userId: "local",
    })
    .returning();

  if (initialMessage === undefined) {
    const [createdSession] = await sessionInsert;
    if (createdSession === undefined) {
      throw new Error("Failed to create session");
    }

    return c.json({ ...createdSession, messages: [] }, HttpStatusCodes.CREATED);
  }

  const [createdSessions, createdMessages] = await db.batch([
    sessionInsert,
    db
      .insert(messages)
      .values({
        ...initialMessage,
        sessionId,
        status: "COMPLETE",
      })
      .returning(),
  ]);
  const [createdSession] = createdSessions;

  if (createdSession === undefined) {
    throw new Error("Failed to create session");
  }

  return c.json({ ...createdSession, messages: createdMessages }, HttpStatusCodes.CREATED);
};

export { create, getOne, list };
