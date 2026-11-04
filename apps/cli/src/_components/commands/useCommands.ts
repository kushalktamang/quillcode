import type { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useMemo, useRef, useState } from "react";

import { useKeyboardLayer } from "../../providers/keybindings";
import getCommandsFiltered from "./filter";
import type { Command, UseCommandReturn } from "./types";

function useCommand(): UseCommandReturn {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCommand, setShowCommand] = useState(false);
  const scrollRef = useRef<ScrollBoxRenderable>(null);
  const { push, pop, isTopLayer } = useKeyboardLayer();

  const closeCommand = () => {
    setShowCommand(false);
    pop("command");
  };

  const commandQuery = showCommand && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(() => getCommandsFiltered(commandQuery), [commandQuery]);

  const handleContentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    // Jump back to the top of the list when the user types a new character
    const scrollBox = scrollRef.current;
    if (scrollBox !== null) {
      scrollBox.scrollTo(0);
    }

    // ( / space ) exits the menu bar
    const prefix = text.startsWith("/") ? text.slice(1) : null;
    if (prefix !== null && !prefix.includes(" ")) {
      setShowCommand(true);
      push("command", () => {
        closeCommand();
        return true;
      });
    } else {
      closeCommand();
    }
  };

  // Resolve a command at a specific index (returns the command and caller handles execution)
  const resolveCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command !== undefined) {
      closeCommand();
    }
    return command;
  };

  // Using Arrow keys to move command selection
  // The list follows along when the highlight goes off screen
  useKeyboard((key) => {
    if (!showCommand || !isTopLayer("command")) return;

    if (key.name === "escape") {
      key.preventDefault();
      closeCommand();
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        const newIndex = Math.max(0, i - 1);
        // keep the highlighted item visible when arrows past the edge
        const sb = scrollRef.current;
        if (sb !== null && newIndex < sb.scrollTop) {
          sb.scrollTo(newIndex);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        if (filteredCommands.length === 0) {
          return 0;
        }

        const newIndex = Math.min(filteredCommands.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb !== null) {
          const viewportHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewportHeight - 1;
          if (newIndex > visibleEnd) {
            sb.scrollTo(newIndex - viewportHeight + 1);
          }
        }
        return newIndex;
      });
    }
  });

  return {
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  };
}

export default useCommand;
