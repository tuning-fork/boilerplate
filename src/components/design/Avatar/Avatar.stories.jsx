import React from "react";
import Component from "./Avatar";

export default {
  title: "Design/Avatar",
  component: Component,
  args: {
    children: "Chidi Anagonye",
  },
};

export const Avatar = (props) => <Component {...props} />;
