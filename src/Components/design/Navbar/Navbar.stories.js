import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./Navbar";

export default {
  title: "Design/Navbar",
  component: Component,
  argTypes: {},
};

export const Sidebar = (props) => (
  <HashRouter>
    <div style={{ display: "flex", height: "100%" }}>
      <Component {...props} organizationId="2" />
      <Switch>
        <div style={{ backgroundColor: "#f5f7f9", padding: "20px", flex: "1" }}>
          <Route path="/organizations">All Organizations</Route>
          {/* <Route path="/users/userid">User Profile</Route> */}
        </div>
      </Switch>
    </div>
  </HashRouter>
);
