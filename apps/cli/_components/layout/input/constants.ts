import type { BorderSides, KeyBinding } from "@opentui/core";

import { EmptyBorder } from "../../ui/border";

const BORDER_SIDES: BorderSides[] = ["left"];

const INPUT_BORDER_CHARS = {
  ...EmptyBorder,
  vertical: "┃",
  bottomLeft: "╹",
};

const CURSOR_STYLE = { style: "line", blinking: true } as const;

const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

export { BORDER_SIDES, INPUT_BORDER_CHARS, CURSOR_STYLE, TEXTAREA_KEY_BINDINGS };
