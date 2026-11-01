import type { JSX } from "@opentui/react/jsx-runtime";
import { createMemoryRouter, RouterProvider } from "react-router";

import Root from "./__root";
import Home from "./screens/home";
import NewSession from "./screens/new-session";
import Session from "./screens/session";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "sessions/new", element: <NewSession /> },
      { path: "sessions/:id", element: <Session /> },
    ],
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
