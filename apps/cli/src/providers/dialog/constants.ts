import { RGBA } from "@opentui/core";
import type { MouseEvent } from "@opentui/core";
import { createContext } from "react";

import type { DialogContextValue } from "./types";

const DialogContext = createContext<DialogContextValue | null>(null);

const BackgroundColor = RGBA.fromInts(0, 0, 0, 150);

const stopPropagation = (e: MouseEvent): void => {
  e.stopPropagation();
};

export { DialogContext, BackgroundColor, stopPropagation };
