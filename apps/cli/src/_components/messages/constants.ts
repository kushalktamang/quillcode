import type { BorderSides } from "@opentui/core";

import { EmptyBorder } from "../ui/border";

const BORDER_CHARS = {
  ...EmptyBorder,
  vertical: "┃",
  bottomLeft: "╹",
};

const BORDER_LEFT: BorderSides[] = ["left"];

export { BORDER_CHARS, BORDER_LEFT };
