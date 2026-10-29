import type { JSX } from "@opentui/react/jsx-runtime";

import Header from "./_components/layout/header";
import { Input } from "./_components/layout/input";
import { DialogProvider } from "./providers/dialog";
import { KeyboardLayerProvider } from "./providers/keybindings";
import { ToastProvider } from "./providers/toast";

function App(): JSX.Element {
  return (
    <KeyboardLayerProvider>
      <DialogProvider>
        <ToastProvider>
          <box
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            gap={2}
          >
            <Header />
            <box width="100%" maxWidth={78} paddingX={2}>
              <Input onSubmit={() => {}} />
            </box>
          </box>
        </ToastProvider>
      </DialogProvider>
    </KeyboardLayerProvider>
  );
}

export default App;
