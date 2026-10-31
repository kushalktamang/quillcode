import { homedir } from "node:os";
import { join } from "node:path";

import { createContext } from "react";

import type { ThemeContextValue } from "./types";

const CONFIG_DIR = join(homedir(), ".quillcode");

const THEME_PREFERENCES_PATH = join(CONFIG_DIR, "preferences.json");

const ThemeContext = createContext<ThemeContextValue | null>(null);

export { CONFIG_DIR, THEME_PREFERENCES_PATH, ThemeContext };
