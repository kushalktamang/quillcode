import { useCallback, useEffect, useRef } from "react";

import type { Theme } from "../../_assets/themes";
import THEMES from "../../_assets/themes/themes";
import { useDialog } from "../../providers/dialog";
import useTheme from "../../providers/theme/use-theme";
import { SearchList } from "../search";

const filterTheme = (theme: Theme, query: string): boolean =>
  theme.name.toLowerCase().includes(query.toLowerCase());

const getThemeKey = (theme: Theme): string => theme.name;
function ThemeContent() {
  const dialog = useDialog();
  const { setTheme, currentTheme } = useTheme();

  // Lazy state keeps the theme from when the dialog opened,
  // without reading a ref during render.
  const originalThemeRef = useRef<Theme>(currentTheme);
  const confirmedRef = useRef(false);

  // Revert to original theme if the user dismisses without confirming
  useEffect(() => {
    return () => {
      if (!confirmedRef.current) {
        setTheme(originalThemeRef.current);
      }
    };
  }, [setTheme]);

  const handleSelect = useCallback(
    (theme: Theme) => {
      confirmedRef.current = true;
      setTheme(theme);
      dialog.close();
    },
    [setTheme, dialog],
  );

  const handleHighlight = useCallback(
    (theme: Theme) => {
      setTheme(theme);
    },
    [setTheme],
  );

  const renderTheme = useCallback(
    (theme: Theme, isSelected: boolean) => (
      <text selectable={false} fg={isSelected ? "black" : "white"}>
        {theme.name === originalThemeRef.current.name ? "\u0020\u2022\u0020" : "\u0020\u0020\u0020"}
        {theme.name}
      </text>
    ),
    [originalThemeRef],
  );

  return (
    <SearchList
      items={THEMES}
      onSelect={handleSelect}
      onHighlight={handleHighlight}
      filterFunc={filterTheme}
      renderItem={renderTheme}
      getKey={getThemeKey}
      placeholder="Search themes"
      emptyText="No matching themes"
    />
  );
}

export default ThemeContent;
