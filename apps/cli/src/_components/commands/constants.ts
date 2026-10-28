import Commands from "./commands";

const MAX_VISIBLE_ITEMS = 8;

// Align all commands names in a fix width column so their descriptions
// start at the same horizontal position for a clean tabular look.
// The width will adjust to accommodate the longest command name
const COMMAND_COL_WIDTH = Math.max(0, ...Commands.map((cmd) => cmd.name.length)) + 4;

const SCROLLBAR_OPTIONS = { visible: false };

const COLORS = {
  background: "#222126",
  selectedBg: "#7daea3",
  selectedFg: "black",
  name: "white",
  description: "gray",
} as const;

export { MAX_VISIBLE_ITEMS, COMMAND_COL_WIDTH, SCROLLBAR_OPTIONS, COLORS };
