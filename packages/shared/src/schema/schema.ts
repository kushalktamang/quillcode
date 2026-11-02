import { z } from "zod";

// Keep the explicit key schema here because the one-argument z.record(...) form
// does not type-check cleanly with the Zod typings used in this workspace.
// LLM tool-call arguments don’t know the shape ahead of time, but we know it came from JSON.
const toolCallArgumentSchema = z.record(z.string(), z.json());

const messagePartSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("reasoning"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("tool-call"),
    id: z.string(),
    name: z.string(),
    args: toolCallArgumentSchema,
    result: z.string().optional(),
  }),
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
]);

const messagePartsSchema = z.array(messagePartSchema);

// Tool-call arguments stay as nested JSON on the wire so the client does not need
// a second JSON.parse step after decoding the SSE event payload itself.
const chatStreamEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text-delta"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("reasoning-delta"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("tool-call"),
    toolCallId: z.string(),
    toolName: z.string(),
    args: toolCallArgumentSchema,
  }),
  z.object({
    type: z.literal("tool-result"),
    toolCallId: z.string(),
    result: z.string(),
  }),
  z.object({
    type: z.literal("done"),
    messageId: z.string(),
    durationMs: z.number(),
  }),
  z.object({
    type: z.literal("error"),
    message: z.string(),
  }),
]);

type MessagePart = z.infer<typeof messagePartSchema>;
type ChatStreamEvent = z.infer<typeof chatStreamEventSchema>;

export type { MessagePart, ChatStreamEvent };
export { toolCallArgumentSchema, messagePartSchema, messagePartsSchema, chatStreamEventSchema };
