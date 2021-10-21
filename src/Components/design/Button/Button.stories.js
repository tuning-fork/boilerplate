import React from "react";
import Button from "./Button";
import { MdSearch } from "react-icons/md";

// Ensures icon component doesn't show up as <[object Object] /> in story "Show
// code" section.
MdSearch.displayName = "SearchIcon";

export default {
  title: "Design/Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Button",
    },
  },
};

const Container = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "20px",
    }}
  >
    {children}
  </div>
);

export const ButtonRegular = (props) => (
  <Button {...props}>{props.children}</Button>
);

export const ButtonWithIcon = (props) => (
  <Container>
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
  </Container>
);

export const ButtonUserIcon = (props) => (
  <Button {...props} variant="usericon" color="colorwheel" text="JW">
    {props.children}
  </Button>
);
