import Header from "../_components/layout/header";
import { Input } from "../_components/layout/input";

const dummy = (): void => {};

function RootFile() {
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
        <Input onSubmit={dummy} />
      </box>
    </box>
  );
}

export default RootFile;
