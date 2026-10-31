import type { ReactNode } from "react";

import type { Theme, ThemeColors } from "../../_assets/themes";

interface ThemeContextValue {
  colors: ThemeColors;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export type { ThemeContextValue, ThemeProviderProps };
