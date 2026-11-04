import { DEFAULT_CHAT_MODEL_ID } from "@quillcode/shared";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

import SessionShell from "../_components/layout/sessionShell";
import { UserMessage } from "../_components/messages";
import apiClient from "../lib/apiClient";
import getErrorMessage from "../lib/httpError";
import { useToast } from "../providers/toast";

const newSessionStateSchema = z.object({ message: z.string().min(1) });

const dummy = (): void => {};

function NewSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const hasStartedRef = useRef(false);

  const state = useMemo(() => {
    const parsed = newSessionStateSchema.safeParse(location.state);
    return parsed.success ? parsed.data : null;
  }, [location.state]);

  // Create the session on mount — this screen exists to do this
  useEffect(() => {
    // Guard: if navigated here directly without state, go home
    if (state === null) {
      void navigate("/", { replace: true });
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const createSession = async () => {
      try {
        const res = await apiClient.sessions.$post({
          json: {
            title: state.message.slice(0, 100),
            cwd: process.cwd(),
            initialMessage: {
              role: "USER",
              content: state.message,
              mode: "BUILD",
              model: DEFAULT_CHAT_MODEL_ID,
            },
          },
        });

        if (!res.ok) {
          throw new Error(await getErrorMessage(res));
        }
        const session = await res.json();
        void navigate(`/sessions/${session.id}`, { replace: true, state: { session } });
      } catch (error) {
        toast.show({
          variant: "error",
          message: error instanceof Error ? error.message : "Failed to create session",
        });
        void navigate("/", { replace: true });
      }
    };

    void createSession();
  }, [state, navigate, toast]);

  if (state === null) return null;

  return (
    <SessionShell onSubmit={dummy} inputDisabled loading>
      <UserMessage message={state.message} />
    </SessionShell>
  );
}

export default NewSession;
