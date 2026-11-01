import type { BorderSides } from "@opentui/core";
import type { JSX } from "@opentui/react/jsx-runtime";

const BORDER_LEFT: BorderSides[] = ["left"];

function Header(): JSX.Element {
  return (
    <box
      border
      borderStyle="rounded"
      borderColor="gray"
      flexDirection="row"
      alignItems="center"
      paddingX={1}
      // paddingY={1}
      gap={2}
    >
      {/* left: logo + disclaimer */}
      <box flexDirection="column">
        <box flexDirection="row" gap={1}>
          <ascii-font font="tiny" text="quill" />
          <ascii-font font="tiny" text="code" color="gray" />
        </box>
        {/*<text fg="gray">Uses AI. Check for mistakes.</text>*/}
      </box>

      {/* right: divider is just a left-only border */}
      <box border={BORDER_LEFT} borderColor="gray" paddingLeft={2} flexDirection="column">
        <text fg="gray">Getting started</text>
        <text fg="gray">Use the tabs above to explore your sessions</text>
        <text>
          <span fg="white">/theme</span> <span fg="gray">- Change Themes</span>
        </text>
        <text>
          <span fg="white">/models</span> <span fg="gray">- Switch models</span>
        </text>
      </box>
    </box>
  );
}

export default Header;
