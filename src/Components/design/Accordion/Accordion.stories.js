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
    <AccordionItem title="Mission Statement">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </AccordionItem>
    <AccordionItem title="About Our Team">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </AccordionItem>
    <AccordionItem title="Budget">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </AccordionItem>
  </Component>
);
