import React from "react";
import Component, {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
} from "./Accordion";

export default {
  title: "Design/Accordion",
  component: Component,
};

export const Accordion = (props) => (
  <Component {...props}>
    <AccordionItem>
      <AccordionItemHeader heading="h2">Mission Statement</AccordionItemHeader>
      <AccordionItemPanel>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItemPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionItemHeader heading="h2">About Our Team</AccordionItemHeader>
      <AccordionItemPanel>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItemPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionItemHeader heading="h2">Budget</AccordionItemHeader>
      <AccordionItemPanel>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionItemPanel>
    </AccordionItem>
  </Component>
);
