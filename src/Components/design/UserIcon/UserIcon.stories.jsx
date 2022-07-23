import React from "react";
import Component from "./UserIcon";

export default {
  title: "Design/UserIcon",
  component: Component,
  args: {
    firstName: "Chidi",
    lastName: "Anagonye",
  },
};

export const UserIcon = (props) => <Component {...props} />;
