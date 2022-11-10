import React from "react";
import { MdError } from "react-icons/md";
import Popover from "./Popover";

export default {
  title: "Design/Popover",
  component: Popover,
  args: {
    text: "This is the popover",
  },
};

export const PopoverRegular = (props) => (
  <Popover {...props}>
    <p>Hover over me to see the popover!</p>
  </Popover>
);

export const PopoverWithIcon = (props) => (
  <Popover {...props}>
    <div style={{ marginLeft: "200px" }}>
      <MdError />
    </div>
  </Popover>
);
