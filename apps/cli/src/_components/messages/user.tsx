import { useTheme } from "../../providers/theme";
import { BORDER_CHARS, BORDER_LEFT } from "./constants";
import type { Props } from "./types";

function UserMessage({ message }: Props) {
  const { colors } = useTheme();

  return (
    <box width="100%" alignItems="center">
      <box
        border={BORDER_LEFT}
        borderColor={colors.primary}
        width="100%"
        customBorderChars={BORDER_CHARS}
      >
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor={colors.surface}
          width="100%"
        >
          <text>{message}</text>
        </box>
      </box>
    </box>
  );
}

export default UserMessage;
