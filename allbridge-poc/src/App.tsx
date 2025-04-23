import React from "react";
import "./App.css";
import AllbridgeClient from "./pages/AllBridgeClient";

const destination = "GDW2WOVG6JQLYD46HQWAGUDYFPWKCUNOCCMMZEUUEVNSGI4ODA3H3NXH";
const amount = "100";

function App() {
  return (
    <div className="App">
      <AllbridgeClient destination={destination} amount={amount} />
    </div>
  );
}

export default App;
