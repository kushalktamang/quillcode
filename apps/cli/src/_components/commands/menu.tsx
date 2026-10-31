import { TextAttributes } from "@opentui/core";

import CommandsList from "./commands-list";
import { MAX_VISIBLE_ITEMS, SCROLLBAR_OPTIONS } from "./constants";
import getCommandsFiltered from "./filter";
import type { CommandMenuProps } from "./types";

// Command Menu
function CommandMenu({ query, selectedIndex, scrollRef, onSelect, onExecute }: CommandMenuProps) {
  const filteredCommands = getCommandsFiltered(query);

  if (filteredCommands.length === 0) {
    return (
      <box paddingX={1}>
        <text attributes={TextAttributes.DIM}>no matching commands</text>
      </box>
    );
  }

  const visibleHeight = Math.min(filteredCommands.length, MAX_VISIBLE_ITEMS);

  return (
    <scrollbox ref={scrollRef} height={visibleHeight} verticalScrollbarOptions={SCROLLBAR_OPTIONS}>
      {filteredCommands.map((cmd, i) => (
        <CommandsList
          key={cmd.value}
          cmd={cmd}
          index={i}
          isSelected={i === selectedIndex}
          onSelect={onSelect}
          onExecute={onExecute}
        />
      ))}
    </scrollbox>
  );
}

export default CommandMenu;
