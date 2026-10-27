import type { JSX } from "@opentui/react/jsx-runtime";

import Header from "../_components/layout/header";
import Input from "../_components/layout/input/input";

function App(): JSX.Element {
  return (
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
  );
}

export default App;
