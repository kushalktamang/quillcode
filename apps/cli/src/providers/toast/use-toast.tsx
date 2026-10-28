import { useContext } from "react";

import { ToastContext } from "./constants";
import type { ToastContextValue } from "./types";

function useToast(): ToastContextValue {
  const value = useContext(ToastContext);
  if (value === null) {
    throw new Error("useToast must be within a toast provider.");
  }
  return value;
}

export default useToast;
