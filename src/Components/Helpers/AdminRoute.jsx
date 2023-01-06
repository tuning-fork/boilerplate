import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { CurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";

export default function AdminRoute({
  component: Component,
  children,
  ...rest
}) {
  const { isCurrentUserAdmin } = useContext(CurrentOrganizationContext);
  const buildOrganizationsLink = useBuildOrganizationsLink();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isCurrentUserAdmin) {
          if (Component) {
            return <Component {...props} />;
          }
          return children;
        }
        return (
          <Redirect to={{ pathname: buildOrganizationsLink("/dashboard") }} />
        );
      }}
    />
  );
}
