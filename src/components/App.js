import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Search from "./Search";
import User from "./User";
import GlobalStyle from "../style/GlobalStyle";
import hooks from "../hooks";
import themes from "../themes";

function App() {
  const dark = hooks.usePreferredTheme();
  const theme = dark ? themes.dark : themes.light;
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/:username" component={User} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
