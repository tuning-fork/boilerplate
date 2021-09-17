import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCurrentUserContext } from "../../Contexts/currentUserContext";

export const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const { currentUserStore } = useCurrentUserContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUserStore.currentUser) {
          if (Component) {
            return <Component {...props} />;
          }
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
