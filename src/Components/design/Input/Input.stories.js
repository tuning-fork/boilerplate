import React from "react";
import Input, { InputType } from "./Input";
import "../../design.css";

export default {
  title: "Design/Input",
  component: Input,
  argTypes: {
    value: {
      defaultValue: "Jenny",
      // control: { type: "text" },
    },
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

export const InputBasic = (props) => <Input {...props} />;
