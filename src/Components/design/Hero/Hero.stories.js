import React from "react";
import { HashRouter } from "react-router-dom";
import Component from "./Hero";

export default {
  title: "Design/Hero",
  component: Component,
  argTypes: {
    headerText: {
      defaultValue: "Header Text",
      control: {
        type: "text",
      },
    },
  },
};

export const Hero = (props) => <Component {...props} />;
