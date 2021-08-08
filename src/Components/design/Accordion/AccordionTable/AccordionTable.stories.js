import React from "react";
import Component from "./AccordionTable";

export default {
  title: "Design/Accordion/Accordion Table",
  component: Component,
};

const columns = [
  { Header: "Title", accessor: "title" },
  { Header: "Category", accessor: "category" },
  { Header: "Word Count", accessor: "wordCount" },
];
const data = [
  {
    title: "Mission Statement",
    category: "Info",
    wordCount: 235,
  },
  {
    title: "About Our Team",
    category: "Info",
    wordCount: 235,
  },
  {
    title: "Chidi Anagonye Bio",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Mission Statement",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Education and Family",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Community Engagement and Empowerment Programs",
    category: "Family Services",
    wordCount: 235,
    _expandableContent:
      "MIRA provides the resources and structure for Middle Eastern refugees to support one another and welcome new arrivals with what they need to succeed through support groups, community events, and bridge-building activities with the wider Chicago community. In FY18-19 189 MIRA Community Empowerment Clients participated in 645 Empowerment Activities.",
  },
  {
    title: "Current Finances",
    category: "Finance",
    wordCount: 102,
  },
  {
    title: "Budget",
    category: "Finance",
    wordCount: 34,
  },
];

export const AccordionTable = (props) => (
  <div style={{ width: "80%", margin: "0 auto" }}>
    <Component {...props} columns={columns} data={data} />
  </div>
);
