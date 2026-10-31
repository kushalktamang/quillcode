import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { z } from "zod";

import { DEFAULT_THEME, Themes } from "../../_assets/themes";
import type { Theme } from "../../_assets/themes";
import { CONFIG_DIR, THEME_PREFERENCES_PATH } from "./constants";

const PreferencesSchema = z.object({ themeName: z.string() });

function loadTheme(): Theme {
  try {
    const raw: unknown = JSON.parse(readFileSync(THEME_PREFERENCES_PATH, "utf8"));
    const parsed = PreferencesSchema.safeParse(raw);
    if (!parsed.success) return DEFAULT_THEME;
    return Themes.find((theme) => theme.name === parsed.data.themeName) ?? DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function saveTheme(theme: Theme): void {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true });
    const data: z.infer<typeof PreferencesSchema> = { themeName: theme.name };
    writeFileSync(THEME_PREFERENCES_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // Preference write failures shouldn't break theme switching for this session.
  }
}

export { loadTheme, saveTheme };
