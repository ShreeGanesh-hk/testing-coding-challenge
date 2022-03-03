import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import Store from "./common/store";
import Home from "./view/home";

export default function App() {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Store>
        <Home />
      </Store>

    </ThemeProvider>
  );
}
