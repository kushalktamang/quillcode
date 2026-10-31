import { useRenderer } from "@opentui/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Theme } from "../../_assets/themes";
import { ThemeContext } from "./constants";
import { loadTheme, saveTheme } from "./storage";
import type { ThemeProviderProps } from "./types";

function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(loadTheme);
  const renderer = useRenderer();

  useEffect(() => {
    renderer.setBackgroundColor(currentTheme.colors.background);
  }, [currentTheme.colors.background, renderer]);

  const setTheme = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    saveTheme(theme);
  }, []);

  const value = useMemo(
    () => ({ colors: currentTheme.colors, currentTheme, setTheme }),
    [currentTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
