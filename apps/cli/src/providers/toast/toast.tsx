import { useTerminalDimensions } from "@opentui/react";

import { SplitBorder } from "../../_components/ui/border";
import useTheme from "../theme/use-theme";
import { BORDER_SIDES } from "./constants";
import type { ToastOptions, ToastVariant } from "./types";

interface ToastProps {
  currentToast: ToastOptions | null;
}

function Toast({ currentToast }: ToastProps) {
  const { width } = useTerminalDimensions();
  const { colors } = useTheme();

  if (currentToast === null) {
    return null;
  }

  const variantColors: Record<ToastVariant, string> = {
    success: colors.success,
    error: colors.error,
    info: colors.info,
  };

  const borderColor = variantColors[currentToast.variant ?? "info"];

  return (
    <box
      position="absolute"
      justifyContent="center"
      alignItems="flex-start"
      top={2}
      right={2}
      width={Math.max(1, Math.min(60, width - 6))}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={colors.surface}
      borderColor={borderColor}
      border={BORDER_SIDES}
      customBorderChars={SplitBorder}
    >
      <box flexDirection="column" gap={1} width="100%">
        <text fg="#E1E1E1" wrapMode="word" width="100%">
          {currentToast.message}
        </text>
      </box>
    </box>
  );
}

export default Toast;
