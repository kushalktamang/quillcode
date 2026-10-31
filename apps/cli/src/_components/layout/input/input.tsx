import type { JSX } from "@opentui/react/jsx-runtime";

import useTheme from "../../../providers/theme/use-theme";
import { CommandMenu } from "../../commands";
import Status from "../../ui/status";
import { BORDER_SIDES, CURSOR_STYLE, INPUT_BORDER_CHARS, TEXTAREA_KEY_BINDINGS } from "./constants";
import type { Props } from "./types";
import useInput from "./use-input";

function Input(props: Props): JSX.Element {
  const { colors } = useTheme();
  const {
    textareaRef,
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleTextareaContentChange,
    handleCommandExecute,
    setSelectedIndex,
    isTopLayer,
    disabled,
  } = useInput(props);

  return (
    <box width="100%" alignItems="center">
      <box
        width="100%"
        border={BORDER_SIDES}
        borderColor={colors.primary}
        customBorderChars={INPUT_BORDER_CHARS}
      >
        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          width="100%"
          gap={1}
          backgroundColor={colors.surface}
        >
          {showCommand && (
            <box
              position="absolute"
              bottom="100%"
              left={0}
              width="100%"
              backgroundColor={colors.surface}
              zIndex={10}
            >
              <CommandMenu
                query={commandQuery}
                selectedIndex={selectedIndex}
                scrollRef={scrollRef}
                onSelect={setSelectedIndex}
                onExecute={handleCommandExecute}
              />
            </box>
          )}

          <textarea
            ref={textareaRef}
            onContentChange={handleTextareaContentChange}
            cursorColor="#7daea3"
            cursorStyle={CURSOR_STYLE}
            focused={!disabled && (isTopLayer("base") || isTopLayer("command"))}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            placeholder="...fix a bug in the database"
          />

          <Status />
        </box>
      </box>
    </box>
  );
}

export default Input;
