import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./Sidebar";

export default {
  title: "Design/Sidebar",
  component: Component,
  argTypes: {},
};

export const Sidebar = (props) => (
  <HashRouter>
    <div style={{ display: "flex", height: "100%" }}>
      <Component {...props} organizationId="2" />
      <Switch>
        <div style={{ backgroundColor: "#f5f7f9", padding: "20px", flex: "1" }}>
          <Route path="/organizations/:org_id/dashboard">Dashboard</Route>
          <Route path="/organizations/:org_id/reports">Reports</Route>
          <Route path="/organizations/:org_id/grants">Grants</Route>
          <Route path="/organizations/:org_id/boilerplates">Boilerplates</Route>
          <Route path="/organizations/:org_id/funding_orgs">
            Funding Organizations
          </Route>
          <Route path="/organizations/:org_id/categories">Categories</Route>
          <Route path="/organizations/:org_id/users">Users</Route>
          <Route path="/">
            <Redirect to="/organizations/2/dashboard" />
          </Route>
        </div>
      </Switch>
    </div>
  </HashRouter>
);
