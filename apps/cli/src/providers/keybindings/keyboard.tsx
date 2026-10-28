import { useKeyboard, useRenderer } from "@opentui/react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import { BASE_LAYER, KeyboardLayerContext } from "./constants";
import type { KeyboardLayerProviderProps, Responder } from "./types";

function KeyboardLayerProvider({ children }: KeyboardLayerProviderProps) {
  const [stack, setStack] = useState<string[]>([BASE_LAYER]);
  const stackRef = useRef(stack);

  useLayoutEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  const responders = useRef<Map<string, Responder>>(new Map());
  const renderer = useRenderer();

  const push = useCallback((id: string, responder?: Responder) => {
    if (responder !== undefined) {
      responders.current.set(id, responder);
    }

    setStack((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  }, []);

  const pop = useCallback((id: string) => {
    if (id === BASE_LAYER) return;

    responders.current.delete(id);
    setStack((prev) => prev.filter((layer) => layer !== id));
  }, []);

  const isTopLayer = useCallback(
    (id: string) => {
      return stack.length === 0 || stack.at(-1) === id;
    },
    [stack],
  );

  const setResponder = useCallback((id: string, responder: Responder | null) => {
    if (responder === null) {
      responders.current.delete(id);
    } else {
      responders.current.set(id, responder);
    }
  }, []);

  // Single ctrl+c handler that walks the responder chain
  useKeyboard((key) => {
    if (!key.ctrl || key.name !== "c") return;

    for (const layerId of stackRef.current.toReversed()) {
      if (responders.current.get(layerId)?.() === true) {
        return;
      }
    }

    // No responder handled it — exit
    renderer.destroy();
  });

  const value = useMemo(
    () => ({ push, pop, isTopLayer, setResponder }),
    [push, pop, isTopLayer, setResponder],
  );

  return <KeyboardLayerContext.Provider value={value}>{children}</KeyboardLayerContext.Provider>;
}

export default KeyboardLayerProvider;
