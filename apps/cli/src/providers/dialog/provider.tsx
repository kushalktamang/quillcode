import { useCallback, useMemo, useState } from "react";

import { useKeyboardLayer } from "../keybindings";
import { DialogContext } from "./constants";
import Dialog from "./dialog";
import type { DialogConfig, DialogContextValue } from "./types";
import type { DialogProviderProps } from "./types";

function DialogProvider({ children }: DialogProviderProps) {
  const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);
  const { push, pop } = useKeyboardLayer();

  const close = useCallback(() => {
    setCurrentDialog(null);
    pop("dialog");
  }, [pop]);

  const open = useCallback(
    (config: DialogConfig) => {
      setCurrentDialog(config);
      push("dialog", () => {
        close();
        return true;
      });
    },
    [push, close],
  );

  const value = useMemo<DialogContextValue>(
    () => ({ currentDialog, open, close }),
    [currentDialog, open, close],
  );

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog currentDialog={currentDialog} close={close} />
    </DialogContext.Provider>
  );
}

export default DialogProvider;
