import React from "react";
import Component from "./AccordionItem";
import AccordionItemHeader from "./AccordionItemHeader";
import AccordionItemPanel from "./AccordionItemPanel";

export default {
  title: "Design/Accordion/Accordion Item",
  component: Component,
};

export const AccordionItem = (props) => (
  <Component {...props}>
    <AccordionItemHeader heading="h2">Budget</AccordionItemHeader>
    <AccordionItemPanel>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </AccordionItemPanel>
  </Component>
);
