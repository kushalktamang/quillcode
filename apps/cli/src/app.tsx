import { TextAttributes } from "@opentui/core";
import type { JSX } from "@opentui/react/jsx-runtime";

function App(): JSX.Element {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="block" text="quillCode" />
        <text attributes={TextAttributes.DIM}>What will you build?</text>
      </box>
    </box>
  );
}

export default App;
