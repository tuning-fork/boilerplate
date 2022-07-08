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
      <Component {...props} />
      <div style={{ backgroundColor: "#f5f7f9", padding: "20px", flex: "1" }}>
        <Switch>
          <Route path="/organizations/:organizationUuid/dashboard">
            Dashboard
          </Route>
          <Route path="/organizations/:organizationUuid/reports">Reports</Route>
          <Route path="/organizations/:organizationUuid/grants">Grants</Route>
          <Route path="/organizations/:organizationUuid/boilerplates">
            Boilerplates
          </Route>
          <Route path="/organizations/:organizationUuid/funding_orgs">
            Funding Organizations
          </Route>
          <Route path="/organizations/:organizationUuid/categories">
            Categories
          </Route>
          <Route path="/organizations/:organizationUuid/users">Users</Route>
          <Route path="/">
            <Redirect to="/organizations/77c48824-3904-449a-9966-e0d8af2f9f64/dashboard" />
          </Route>
        </Switch>
      </div>
    </div>
  </HashRouter>
);
