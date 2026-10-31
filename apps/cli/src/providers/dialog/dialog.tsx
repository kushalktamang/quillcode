import { TextAttributes } from "@opentui/core";
import { useKeyboard, useTerminalDimensions } from "@opentui/react";

import { useKeyboardLayer } from "../keybindings";
import useTheme from "../theme/use-theme";
import { BackgroundColor, stopPropagation } from "./constants";
import type { DialogProps } from "./types";

function Dialog({ currentDialog, close }: DialogProps) {
  const { isTopLayer } = useKeyboardLayer();
  const dimensions = useTerminalDimensions();
  const { colors } = useTheme();

  useKeyboard((key) => {
    if (currentDialog === null || !isTopLayer("dialog")) return;

    if (key.name === "escape") {
      close();
    }
  });

  if (currentDialog === null) {
    return null;
  }

  const { title, children } = currentDialog;

  return (
    <box
      position="absolute"
      left={0}
      top={0}
      width={dimensions.width}
      height={dimensions.height}
      justifyContent="center"
      alignItems="center"
      backgroundColor={BackgroundColor}
      zIndex={100}
      onMouseDown={close}
    >
      <box
        width={Math.min(60, dimensions.width - 4)}
        height="auto"
        backgroundColor={colors.dialogSurface}
        paddingX={4}
        paddingY={1}
        flexDirection="column"
        gap={1}
        onMouseDown={stopPropagation}
      >
        <box
          paddingBottom={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <text attributes={TextAttributes.BOLD}>{title}</text>
          <text attributes={TextAttributes.DIM} onMouseDown={close}>
            esc
          </text>
        </box>
        <box flexGrow={1}>{children}</box>
      </box>
    </box>
  );
}

export default Dialog;
