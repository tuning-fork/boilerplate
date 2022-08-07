import React, { useState } from "react";
import Panel from "./Panel";
import Button from "../Button/Button";

export default {
  title: "Design/Panel",
  component: Panel,
  argTypes: {
    heading: {
      defaultValue: "Hello!",
      control: {
        type: "text",
      },
    },
    headingClassName: {
      control: {
        type: "text",
      },
    },
    show: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
};

export const PanelRegular = (props) => (
  <Panel {...props}>
    <p>Welcome to the Panel! Enjoy your stay</p>
  </Panel>
);

export const PanelShowing = (props) => {
  const [showingPanel, setShowingPanel] = useState(false);

  return (
    <>
      <Button onClick={() => setShowingPanel(true)}>Open Panel</Button>
      <Panel heading="Hello!" show={showingPanel} {...props}>
        <p>Welcome to the Panel! Enjoy your stay</p>
        <Button onClick={() => setShowingPanel(false)}>Close</Button>
      </Panel>
    </>
  );
};
