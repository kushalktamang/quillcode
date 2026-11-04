import { z } from "zod";

interface ErrorResponse {
  json: () => Promise<unknown>;
  status: number;
  statusText: string;
}

const errorBodySchema = z.object({ error: z.string().min(1) });

async function getErrorMessage(response: ErrorResponse) {
  try {
    const result = errorBodySchema.safeParse(await response.json());
    if (result.success) {
      return result.data.error;
    }
  } catch {
    // Ignore invalid error payloads and fall back to the status text below.
    // Body wasn't valid JSON; fall back to the status text below.
  }

  return response.statusText.length > 0
    ? response.statusText
    : `Request failed with status ${response.status}`;
}

export default getErrorMessage;
