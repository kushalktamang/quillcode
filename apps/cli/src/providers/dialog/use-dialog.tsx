import { useContext } from "react";

import { DialogContext } from "./constants";
import type { DialogContextValue } from "./types";

function useDialog(): DialogContextValue {
  const value = useContext(DialogContext);
  if (value === null) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return value;
}

export default useDialog;
