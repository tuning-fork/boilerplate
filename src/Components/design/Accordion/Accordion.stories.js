import React from "react";
import Component from "./Accordion";
import AccordionItem from "./AccordionItem/AccordionItem";

export default {
  title: "Design/Accordion",
  component: Component,
  argTypes: {},
};

export const Accordion = (props) => (
  <Component {...props}>
    <AccordionItem title="Mission Statement" heading="h2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </AccordionItem>
    <AccordionItem title="About Our Team" heading="h2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </AccordionItem>
    <AccordionItem title="Budget" heading="h2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </AccordionItem>
  </Component>
);
