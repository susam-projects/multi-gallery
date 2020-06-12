import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Main from "./Main/Main";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </Router>
  );
}

export default App;
