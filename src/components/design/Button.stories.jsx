import React from "react";
import Button from "./Button";
import "./theme.css";

export default {
  title: "Design/Button",
  component: Button,
};

const Container = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    {children}
  </div>
);

export const Primary = () => (
  <Container>
    <Button>Button</Button>
    <Button color="error">Button</Button>
    <Button color="success">Button</Button>
    <Button color="contrast">Button</Button>
  </Container>
);

export const Outlined = () => (
  <Container>
    <Button variant="outlined">Button</Button>
    <Button color="error" variant="outlined">
      Button
    </Button>
    <Button color="success" variant="outlined">
      Button
    </Button>
    <Button color="contrast" variant="outlined">
      Button
    </Button>
  </Container>
);

export const Text = () => (
  <Container>
    <Button variant="text">Button</Button>
    <Button color="error" variant="text">
      Button
    </Button>
    <Button color="success" variant="text">
      Button
    </Button>
    <Button color="contrast" variant="text">
      Button
    </Button>
  </Container>
);
