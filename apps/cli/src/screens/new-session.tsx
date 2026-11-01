import { useLocation, Navigate } from "react-router";
import { z } from "zod";

import SessionShell from "../_components/layout/session-shell";
import { BotMessage, ErrorMessage, UserMessage } from "../_components/messages";

const stateSchema = z.object({ message: z.string().min(1) });

const dummy = (): void => {};

function NewSession() {
  const location = useLocation();
  const parsed = stateSchema.safeParse(location.state);

  if (!parsed.success) return <Navigate to="/" replace />;

  const { message } = parsed.data;

  return (
    <SessionShell onSubmit={dummy} inputDisabled loading>
      <UserMessage message={message} />
      <BotMessage
        content="This is a sample bot response to demonstrate the message layout."
        model="fabel-5.1"
      />
      <ErrorMessage message="This is a sample error message." />
    </SessionShell>
  );
}

export default NewSession;
