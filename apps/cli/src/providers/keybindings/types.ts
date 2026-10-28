import type { ReactNode } from "react";

type Responder = () => boolean;

interface KeyboardLayerProviderProps {
  children: ReactNode;
}

interface KeyboardLayerContextValue {
  push: (id: string, responder?: Responder) => void;
  pop: (id: string) => void;
  isTopLayer: (id: string) => boolean;
  setResponder: (id: string, responder: Responder | null) => void;
}

export type { Responder, KeyboardLayerProviderProps, KeyboardLayerContextValue };
