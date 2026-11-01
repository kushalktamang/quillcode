import { Outlet } from "react-router";

import { DialogProvider } from "./providers/dialog";
import { KeyboardLayerProvider } from "./providers/keybindings";
import ThemeProvider from "./providers/theme/provider";
import { ToastProvider } from "./providers/toast";
import ThemeRoot from "./theme";

function Root() {
  return (
    <ThemeProvider>
      <KeyboardLayerProvider>
        <DialogProvider>
          <ToastProvider>
            <ThemeRoot>
              <Outlet />
            </ThemeRoot>
          </ToastProvider>
        </DialogProvider>
      </KeyboardLayerProvider>
    </ThemeProvider>
  );
}

export default Root;
