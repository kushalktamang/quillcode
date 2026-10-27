import type { ScrollBoxRenderable } from "@opentui/core";
import type { RefObject } from "react";

interface CommandContext {
  exit: () => void;
}

interface Command {
  name: string;
  description: string;
  value: string;
  action?: (ctx: CommandContext) => void | Promise<void>;
}

interface CommandMenuProps {
  query: string;
  selectedIndex: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  onSelect: (index: number) => void;
  onExecute: (index: number) => void;
}

interface UseCommandReturn {
  showCommand: boolean;
  commandQuery: string;
  selectedIndex: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (text: string) => void;
  resolveCommand: (index: number) => Command | undefined;
  setSelectedIndex: (index: number) => void;
}

interface CommandListProps {
  key?: string;
  cmd: Command;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onExecute: (index: number) => void;
}

export type { CommandContext, Command, CommandMenuProps, UseCommandReturn, CommandListProps };
