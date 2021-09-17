import React, { useState } from "react";
import Component from "./Dropdown";

export default {
  title: "Design/Dropdown",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Further Actions",
    },
    placeholder: {
      defaultValue: "Pick One",
    },
    options: {
      defaultValue: [
        { value: "MARK_AS_SUBMITTED", label: "Mark as Submitted" },
        { value: "MARK_AS_SUCCESSFUL", label: "Mark as Successful" },
        { value: "MARK_AS_COPY", label: "Mark as Copy" },
        { value: "ARCHIVE", label: "Archive" },
      ],
    },
  },
};

export const Dropdown = (props) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Component
        {...props}
        value={value}
        onChange={(option) => setValue(option.value)}
      />
      <p>Selected value: {value}</p>
    </>
  );
};
