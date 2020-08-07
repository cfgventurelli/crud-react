import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "./components/home";
import Regiao from "./components/regiao";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/regiao" component={Regiao} />
    <Redirect from="*" to="/" />
  </Switch>
);
