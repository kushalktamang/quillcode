import type { InferResponseType } from "hono/client";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { z } from "zod";

import SessionShell from "../_components/layout/sessionShell";
import { BotMessage, ErrorMessage, UserMessage } from "../_components/messages";
import apiClient from "../lib/apiClient";
import getErrorMessage from "../lib/httpError";
import { useToast } from "../providers/toast";

type SessionData = InferResponseType<(typeof apiClient.sessions)[":id"]["$get"], 200>;

const sessionLocationSchema = z.object({
  session: z.custom<SessionData>((val) => val !== null && typeof val === "object" && "id" in val),
});

function ChatMessage({ msg }: { msg: SessionData["messages"][number] }) {
  if (msg.role === "USER") {
    return <UserMessage message={msg.content} />;
  }

  if (msg.role === "ERROR") {
    return <ErrorMessage message={msg.content} />;
  }

  return <BotMessage content={msg.content} model={msg.model} />;
}

const dummy = (): void => {};
function Session() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const prefetched = useMemo(() => {
    const parsed = sessionLocationSchema.safeParse(location.state);
    return parsed.success ? parsed.data.session : null;
  }, [location.state]);

  const [fetchedSession, setFetchedSession] = useState<SessionData | null>(null);
  const session = prefetched ?? (fetchedSession?.id === id ? fetchedSession : null);

  useEffect(() => {
    // Skip fetch if session was passed via location state
    if (prefetched !== null) return;

    if (id === undefined) return;

    let ignore = false;
    const fetchSession = async () => {
      try {
        const res = await apiClient.sessions[":id"].$get({
          param: { id },
        });
        if (ignore) return;
        if (!res.ok) throw new Error(await getErrorMessage(res));
        const resolved = await res.json();
        setFetchedSession(resolved);
      } catch (error) {
        if (ignore) return;
        toast.show({
          variant: "error",
          message: error instanceof Error ? error.message : "Failed to load session",
        });
        void navigate("/", { replace: true });
      }
    };

    void fetchSession();
    return () => {
      ignore = true;
    };
  }, [id, prefetched, toast, navigate]);

  if (session === null) {
    return <SessionShell onSubmit={dummy} inputDisabled loading />;
  }

  return (
    <SessionShell onSubmit={dummy} inputDisabled>
      {session.messages.map((message) => (
        <ChatMessage key={message.id} msg={message} />
      ))}
    </SessionShell>
  );
}

export default Session;
