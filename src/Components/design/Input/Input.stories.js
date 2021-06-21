import React from "react";
import Component, { InputType } from "./Input";
import "../../design.css";

export default {
  title: "Design/Input",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Name",
      control: { type: "text" },
    },
    type: {
      options: Object.values(InputType),
      control: { type: "radio" },
    },
  },
};

export const Input = (props) => <Component {...props} />;
