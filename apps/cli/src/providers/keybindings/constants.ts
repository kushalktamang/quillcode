import { createContext } from "react";

import type { KeyboardLayerContextValue } from "./types";

const KeyboardLayerContext = createContext<KeyboardLayerContextValue | null>(null);

const BASE_LAYER = "base";

export { BASE_LAYER, KeyboardLayerContext };
