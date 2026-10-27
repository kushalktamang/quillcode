import type { TextareaRenderable } from "@opentui/core";
import { useRenderer } from "@opentui/react";
import { useCallback, useEffect, useRef } from "react";

import type { Command } from "../../commands/types";
import useCommand from "../../commands/use-commands";
import type { Props } from "./types";

function useInput({ onSubmit, disabled = false }: Props) {
  const textareaRef = useRef<TextareaRenderable>(null);
  const renderer = useRenderer();

  const {
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  } = useCommand();

  const handleTextareaContentChange = useCallback(() => {
    const textarea = textareaRef.current;

    // Early return if its empty
    if (textarea === null) {
      return;
    }

    handleContentChange(textarea.plainText);
  }, [handleContentChange]);

  const handleOnSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    const textarea = textareaRef.current;

    if (textarea === null) {
      return;
    }

    const text = textarea.plainText.trim();

    if (text.length === 0) {
      return;
    }

    onSubmit(text);
    textarea.setText("");
  }, [disabled, onSubmit]);

  const handleCommand = useCallback(
    (command: Command | undefined) => {
      const textarea = textareaRef.current;

      if (textarea === null || command === undefined) {
        return;
      }

      textarea.setText("");

      if (command.action === undefined) {
        textarea.insertText(`${command.value} `);
        return;
      }

      void command.action({
        exit: () => {
          renderer.destroy();
        },
      });
    },
    [renderer],
  );

  const handleCommandExecute = useCallback(
    (index: number) => {
      handleCommand(resolveCommand(index));
    },
    [resolveCommand, handleCommand],
  );

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea === null) {
      return;
    }

    textarea.onSubmit = () => {
      if (disabled) {
        return;
      }

      if (showCommand) {
        handleCommand(resolveCommand(selectedIndex));
        return;
      }

      handleOnSubmit();
    };
  }, [disabled, showCommand, selectedIndex, resolveCommand, handleCommand, handleOnSubmit]);

  return {
    textareaRef,
    showCommand,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleTextareaContentChange,
    handleCommandExecute,
    setSelectedIndex,
    disabled,
  };
}

export default useInput;
