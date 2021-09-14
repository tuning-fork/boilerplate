import { CenterFocusStrong } from "@material-ui/icons";
import React from "react";
import Component from "./Hero";

export default {
  title: "Design/Hero",
  component: Component,
  argTypes: {
    headerText: {
      defaultValue: "Good Place Neighborhood Grant",
      control: {
        type: "text",
      },
    },
  },
};

export const Hero = (props) => <Component {...props} />;
