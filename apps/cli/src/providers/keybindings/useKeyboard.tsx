import { useContext } from "react";

import { KeyboardLayerContext } from "./constants";

function useKeyboardLayer() {
  const context = useContext(KeyboardLayerContext);
  if (context === null) {
    throw new Error("useKeyboardLayer must be used within a KeyboardLayerProvider");
  }
  return context;
}

export default useKeyboardLayer;
