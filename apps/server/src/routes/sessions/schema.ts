import { zValidator } from "@hono/zod-validator";
import { roleEnum, modeEnum } from "@quillcode/database/enums";
import { messages, sessions } from "@quillcode/database/schema";
import { HttpStatusCodes, HttpStatusPhrases } from "@quillcode/http-status";
import { findSupportedChatModel } from "@quillcode/shared";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import createMessageObjectSchema from "../../openapi/schemas/createMessageObject";

const dateAsString = z.date().transform((d) => d.toISOString());

const createSessionSchema = z.object({
  title: z.string(),
  cwd: z.string().optional(),
  initialMessage: z
    .object({
      role: z.enum(roleEnum.enumValues),
      content: z.string(),
      mode: z.enum(modeEnum.enumValues),
      model: z.string().refine((id) => Boolean(findSupportedChatModel(id)), "Unsupported model"),
    })
    .optional(),
});

const createSessionValidator = zValidator("json", createSessionSchema, (result, c) => {
  if (!result.success) {
    return c.json({ error: "Invalid request body" }, HttpStatusCodes.BAD_REQUEST);
  }
});

const messageSchema = createSelectSchema(messages, {
  createdAt: dateAsString,
});

const sessionSchema = createSelectSchema(sessions, { createdAt: dateAsString })
  .pick({
    id: true,
    title: true,
    cwd: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    messages: z.array(messageSchema),
  });

const sessionSummarySchema = sessionSchema.pick({
  id: true,
  title: true,
  createdAt: true,
});

const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);

export {
  messageSchema,
  sessionSchema,
  createSessionSchema,
  createSessionValidator,
  sessionSummarySchema,
  notFoundSchema,
};
