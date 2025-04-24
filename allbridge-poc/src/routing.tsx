import { createBrowserRouter } from "react-router-dom";
import AllbridgeClient from "./pages/AllBridgeClient";
const destination = "GDW2WOVG6JQLYD46HQWAGUDYFPWKCUNOCCMMZEUUEVNSGI4ODA3H3NXH";
const amount = "100";

export const routing = createBrowserRouter([
  {
    path: "/",
    element: <AllbridgeClient destination={destination} amount={amount} />,
    id: "Demo",
  },
]);
