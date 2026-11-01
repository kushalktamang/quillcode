import SessionShell from "../_components/layout/session-shell";

const dummy = (): void => {};
function Session() {
  return <SessionShell onSubmit={dummy} inputDisabled loading />;
}

export default Session;
