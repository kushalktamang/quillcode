import type { JSX } from "@opentui/react/jsx-runtime";
import { memo, useCallback } from "react";

import useTheme from "../../providers/theme/use-theme";
import { COMMAND_COL_WIDTH } from "./constants";
import type { CommandListProps } from "./types";

function CommandList({
  cmd,
  index,
  isSelected,
  onSelect,
  onExecute,
}: CommandListProps): JSX.Element {
  const { colors } = useTheme();
  const handleMouseMove = useCallback(() => {
    if (isSelected !== null) {
      onSelect(index);
    }
  }, [isSelected, index, onSelect]);

  const handleMouseDown = useCallback(() => {
    onExecute(index);
  }, [index, onExecute]);

  return (
    <box
      flexDirection="row"
      paddingX={1}
      height={1}
      overflow="hidden"
      backgroundColor={isSelected ? colors.selection : colors.background}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >
      {/* Name */}
      <box width={COMMAND_COL_WIDTH} flexShrink={0}>
        <text selectable={false} fg={isSelected ? "black" : "white"}>
          /{cmd.name}
        </text>
      </box>
      {/* Description */}
      <box flexShrink={1} flexGrow={1} overflow="hidden">
        <text selectable={false} fg={isSelected ? "black" : "grey"}>
          {cmd.description}
        </text>
      </box>
    </box>
  );
}

export default memo(CommandList);
