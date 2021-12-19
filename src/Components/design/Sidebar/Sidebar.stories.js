import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./Sidebar";

export default {
  title: "Design/Sidebar",
  component: Component,
};

export const Sidebar = (props) => (
  <HashRouter>
    <div style={{ display: "flex", height: "100%" }}>
      <Component {...props} organizationId="2" />
      <div style={{ backgroundColor: "#f5f7f9", padding: "20px", flex: "1" }}>
        <Switch>
          <Route path="/organizations/:organizationId/dashboard">
            Dashboard
          </Route>
          <Route path="/organizations/:organizationId/reports">Reports</Route>
          <Route path="/organizations/:organizationId/grants">Grants</Route>
          <Route path="/organizations/:organizationId/boilerplates">
            Boilerplates
          </Route>
          <Route path="/organizations/:organizationId/funding_orgs">
            Funding Organizations
          </Route>
          <Route path="/organizations/:organizationId/categories">
            Categories
          </Route>
          <Route path="/organizations/:organizationId/users">Users</Route>
          <Route path="/">
            <Redirect to="/organizations/2/dashboard" />
          </Route>
        </Switch>
      </div>
    </div>
  </HashRouter>
);
