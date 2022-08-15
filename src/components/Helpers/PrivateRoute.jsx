import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCurrentUser } from "../../contexts/currentUserContext";

export const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const { user } = useCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (Component) {
            return <Component {...props} />;
          }
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/splashpage",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
