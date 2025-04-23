import React from "react";
import theme from "../theme";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import ChainsAndTokensProvider from "./ChainsAndTokensProvider";
import ConnectionProvider from "./ConnectionProvider";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename="/allbridge">
          <ChainsAndTokensProvider>
            <ConnectionProvider>
              <App />
            </ConnectionProvider>
          </ChainsAndTokensProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default Providers;
