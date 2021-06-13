import React from "react";
import Button, { ButtonVariant, ButtonColor } from "./Button";
import SearchIcon from "@material-ui/icons/Search";
import "./theme.css";

SearchIcon.displayName = "SearchIcon";

export default {
  title: "Design/Button",
  component: Button,
  argTypes: {
    text: {
      defaultValue: "Button",
      control: {
        type: "text",
      },
    },
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: "radio" },
    },
    color: {
      options: Object.values(ButtonColor),
      control: { type: "radio" },
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
  <Button variant={props.variant} color={props.color}>
    {props.text}
  </Button>
);

export const ButtonWithIcon = (props) => (
  <Container>
    <Button variant={props.variant} color={props.color}>
      <SearchIcon />
    </Button>
    <Button variant={props.variant} color={props.color}>
      <SearchIcon />
      {props.text}
    </Button>
    <Button variant={props.variant} color={props.color}>
      {props.text}
      <SearchIcon />
    </Button>
  </Container>
);
