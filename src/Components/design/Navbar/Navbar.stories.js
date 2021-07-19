import React from "react";
import { HashRouter } from "react-router-dom";
import Component from "./Navbar";

export default {
  title: "Design/Navbar",
  component: Component,
  argTypes: {
    userName: {
      defaultValue: "JW",
      control: {
        type: "text",
      },
    },
    organizationName: {
      defaultValue: "Baklava Foundation",
      control: {
        type: "text",
      },
    },
  },
};

export const Navbar = (props) => (
  <HashRouter>
    <Component {...props} organizationId="2" />
  </HashRouter>
);
