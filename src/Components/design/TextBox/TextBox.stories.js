import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Component from "./TextBox";
import "../../design.css";

export default {
  title: "Design/TextBox",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Name",
      control: { type: "text" },
    },
  },
};

export const TextBox = (props) => <Component {...props} />;

export const TextBoxWithPrefixAndSuffix = () => (
  <div style={{ display: "flex", gap: "20px" }}>
    <Component labelText="Amount" prefix="$" />
    <Component labelText="Search" prefix={<SearchIcon />} />
    <Component labelText="Amount" suffix="USD" align="right" />
  </div>
);
