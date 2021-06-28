import React, { useState } from "react";
import Component from "./Checkbox";

export default {
  title: "Design/Checkbox",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Enabled",
      control: { type: "text" },
    },
  },
};

export const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Component
      {...props}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};
