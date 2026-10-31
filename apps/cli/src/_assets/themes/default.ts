import THEMES from "./themes";
import type { Theme } from "./types";

const quillcodeDefault = THEMES.find((t) => t.name === "Quillcode");
if (quillcodeDefault === undefined) {
  throw new Error('Default theme "quillcode" not found in THEMES');
}

const DEFAULT_THEME: Theme = quillcodeDefault;

export default DEFAULT_THEME;
