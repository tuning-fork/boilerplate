import React from "react";
import { Link, Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Button from "./Button";

export default {
  title: "Design/Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Button",
    },
  },
};

export const ButtonRegular = (props) => (
  <Button {...props}>{props.children}</Button>
);

export const ButtonWithIcon = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "20px",
    }}
  >
    <Button {...props}>
      <MdSearch />
    </Button>
    <Button {...props}>
      <MdSearch />
      {props.children}
    </Button>
    <Button {...props}>
      {props.children}
      <MdSearch />
    </Button>
  </div>
);

export const ButtonUserIcon = (props) => (
  <Button {...props} variant="usericon">
    JW
  </Button>
);

export const ButtonLink = (props) => (
  <HashRouter>
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button {...props} as="a" href="https://example.com">
        https://example.com
      </Button>
      <Button {...props} as={Link} to="/route-1">
        Route 1
      </Button>
      <Button {...props} as={Link} to="/route-2">
        Route 2
      </Button>
    </div>
    <Switch>
      <Route path="/route-1">Route 1</Route>
      <Route path="/route-2">Route 2</Route>
      <Route path="/">
        <Redirect to="/route-1" />
      </Route>
    </Switch>
  </HashRouter>
);
