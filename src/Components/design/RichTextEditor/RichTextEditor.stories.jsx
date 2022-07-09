import React from "react";
import Component from "./RichTextEditor";

export default {
  title: "Design/Rich Text Editor",
  component: Component,
  args: {
    value: "<h2>Hi</h2>"
  },
};

export const RichTextEditor = (props) => <Component {...props} />;
