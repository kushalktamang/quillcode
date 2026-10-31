import { useContext } from "react";

import { ThemeContext } from "./constants";
import type { ThemeContextValue } from "./types";

function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return value;
}

export default useTheme;
