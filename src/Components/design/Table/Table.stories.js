import React from "react";
import Component from "./Table";

export default {
  title: "Design/Table",
  component: Component,
  argTypes: {},
};

export const Table = (props) => (
  <Component
    {...props}
    columns={[
      { Header: "Status", accessor: "status" },
      { Header: "Title", accessor: "title" },
    ]}
    data={[
      { status: "Draft", title: "Good Place Neighborhood Grant" },
      { status: "Submitted", title: "Bad Place Neighborhood Grant" },
    ]}
  />
);
