import type { ReactNode } from "react";

interface DialogConfig {
  title: string;
  children: ReactNode;
}

interface DialogContextValue {
  open: (config: DialogConfig) => void;
  close: () => void;
}

interface DialogProviderProps {
  children: ReactNode;
}

interface DialogProps {
  currentDialog: DialogConfig | null;
  close: () => void;
}

export type { DialogConfig, DialogContextValue, DialogProviderProps, DialogProps };
