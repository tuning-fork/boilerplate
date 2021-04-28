import React from "react";
import { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCurrentUserContext } from "../../Contexts/currentUserContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log("private route rendered");
  const { currentUserStore } = useCurrentUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUserStore.currentUserInfo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
