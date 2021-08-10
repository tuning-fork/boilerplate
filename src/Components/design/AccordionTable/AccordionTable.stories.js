import React from "react";
import Component from "./AccordionTable";

export default {
  title: "Design/Accordion Table",
  component: Component,
  argTypes: {},
};

export const AccordionTable = (props) => (
  <Component
    {...props}
    columns={[
      { Header: "Title", accessor: "title" },
      { Header: "Category", accessor: "category" },
      { Header: "Word Count", accessor: "wordCount" },
    ]}
    data={[
      {
        title: "Mission Statement",
        category: "Info",
        wordCount: 235,
      },
      {
        title: "Chidi Anagonye Bio",
        category: "Staff Bios",
        wordCount: 102,
      },
      {
        title: "Budget",
        category: "Finance",
        wordCount: 34,
      },
    ]}
  />
);
