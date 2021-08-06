import React from "react";
import { HashRouter } from "react-router-dom";
import Component from "./Navbar";

export default {
  title: "Design/Navbar",
  component: Component,
  argTypes: {
    user: {
      defaultValue: {
        first_name: "Chidi",
        last_name: "Anagonye",
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
