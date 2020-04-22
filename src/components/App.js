import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Search from "./Search";
import User from "./User";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/:username" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
