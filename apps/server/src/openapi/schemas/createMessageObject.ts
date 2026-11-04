import { z } from "@hono/zod-openapi";

const createMessageObjectSchema = (dummyMessage = "Hello World!") => {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: dummyMessage,
      },
    });
};

export default createMessageObjectSchema;
