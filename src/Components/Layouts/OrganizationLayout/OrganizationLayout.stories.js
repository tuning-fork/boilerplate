import React, { useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./OrganizationLayout";
import { CurrentUserProvider } from "../../../Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "../../../Contexts/currentOrganizationContext";
import { useCurrentOrganizationContext } from "../../../Contexts/currentOrganizationContext";
import { useCurrentUserContext } from "../../../Contexts/currentUserContext";

export default {
  title: "Layouts/Organization Layout",
  component: Component,
};

export const OrganizationLayout = (props) => (
  <CurrentUserProvider>
    <CurrentOrganizationProvider>
      <HashRouter>
        <ContextWrapper />
      </HashRouter>
    </CurrentOrganizationProvider>
  </CurrentUserProvider>
);

const ContextWrapper = () => {
  const { currentUserDispatch } = useCurrentUserContext();
  const { currentOrganizationDispatch, currentOrganizationStore } =
    useCurrentOrganizationContext();

  useEffect(() => {
    currentUserDispatch({
      type: "SET_CURRENT_USER",
      payload: { user: { first_name: "Chidi", last_name: "Anagonye" } },
    });
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION",
      payload: { currentOrganization: { id: "2", name: "Baklava Foundation" } },
    });
  }, [currentOrganizationDispatch, currentUserDispatch]);

  if (!currentOrganizationStore.currentOrganization) {
    return null;
  }

  return (
    <Component organizationId="2">
      <Switch>
        <Route path="/organizations/:org_id/dashboard">Dashboard</Route>
        <Route path="/organizations/:org_id/reports">Reports</Route>
        <Route path="/">
          <Redirect to="/organizations/2/dashboard" />
        </Route>
      </Switch>
    </Component>
  );
};
