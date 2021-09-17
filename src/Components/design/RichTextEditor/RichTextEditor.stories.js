import React from "react";
import Component from "./RichTextEditor";

export default {
  title: "Design/Rich Text Editor",
  component: Component,
  argTypes: {
    value: {
      defaultValue: "<h2>Hi</h2>",
    },
  },
};

export const RichTextEditor = (props) => <Component {...props} />;
