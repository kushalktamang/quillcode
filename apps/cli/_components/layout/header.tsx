import type { JSX } from "@opentui/react/jsx-runtime";

function Header(): JSX.Element {
  return (
    <box alignItems="center" justifyContent="center">
      <box justifyContent="center" alignItems="center" gap={0.5} flexDirection="row">
        <ascii-font font="tiny" text="quill" />
        <ascii-font font="tiny" text="code" color="gray" />
      </box>
    </box>
  );
}

export default Header;
