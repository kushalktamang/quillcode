import type { BorderSides } from "@opentui/core";
import { createContext } from "react";

import type { ToastContextValue, ToastVariant } from "./types";

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3000;

const BORDER_SIDES: BorderSides[] = ["left", "right"];

const colors = {
  success: "#82E0AA",
  error: "E74C5E",
  info: "#56D6C2",
  surface: "#222126",
} as const;

const variantColors: Record<ToastVariant, string> = {
  success: colors.success,
  error: colors.error,
  info: colors.info,
};

const currentToast: { variant?: ToastVariant } = {
  variant: "success",
};

const borderColor = variantColors[currentToast.variant ?? "info"];

export { ToastContext, DEFAULT_DURATION, colors, variantColors, borderColor, BORDER_SIDES };
