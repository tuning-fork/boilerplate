import React from "react";
import Component from "./Container";

export default {
  title: "Design/Container",
  component: Component,
  argTypes: {
    as: {
      options: ["div", "section", "article"],
      control: { type: "radio" },
    },
  },
};

export const Container = (props) => (
  <Component {...props}>
    <h1>Heading 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut
      venenatis tellus in.
    </p>
  </Component>
);
