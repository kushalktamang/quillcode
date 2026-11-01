import type { ReactNode } from "react";

import { useTheme } from "./providers/theme";

interface Props {
  children: ReactNode;
}

function ThemeRoot({ children }: Props) {
  const { colors } = useTheme();
  return (
    <box flexGrow={1} width="100%" height="100%" backgroundColor={colors.background}>
      {children}
    </box>
  );
}

export default ThemeRoot;
