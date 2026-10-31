import type { JSX } from "@opentui/react/jsx-runtime";

import { DialogProvider } from "../providers/dialog";
import { KeyboardLayerProvider } from "../providers/keybindings";
import ThemeProvider from "../providers/theme/provider";
import { ToastProvider } from "../providers/toast";
import RootFile from "./__root";

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <DialogProvider>
          <ToastProvider>
            <RootFile />
          </ToastProvider>
        </DialogProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
}

export default App;
