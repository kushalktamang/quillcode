import type { z } from "@hono/zod-openapi";

type ZodSchema = z.ZodUnion | z.ZodObject | z.ZodArray<z.ZodObject>;
type ZodIssue = z.ZodError["issues"][number];

export type { ZodIssue, ZodSchema };
