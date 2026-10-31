import type { BorderSides } from "@opentui/core";
import { createContext } from "react";

import type { ToastContextValue } from "./types";

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3000;

const BORDER_SIDES: BorderSides[] = ["left", "right"];

export { ToastContext, DEFAULT_DURATION, BORDER_SIDES };
