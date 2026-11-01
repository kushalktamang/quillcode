import { useCallback } from "react";
import { useNavigate } from "react-router";

import Header from "../_components/layout/header";
import { Input } from "../_components/layout/input";

function Home() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (text: string) => {
      void navigate("/sessions/new", { state: { message: text } });
    },
    [navigate],
  );

  return (
    <box
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      gap={2}
      position="relative"
      width="100%"
      height="100%"
    >
      <Header />
      <box width="100%" maxWidth={78} paddingX={2}>
        <Input onSubmit={handleSubmit} />
      </box>
    </box>
  );
}

export default Home;
