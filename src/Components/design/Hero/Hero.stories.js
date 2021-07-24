import { CenterFocusStrong } from "@material-ui/icons";
import React from "react";
import Component from "./Hero";

export default {
  title: "Design/Hero",
  component: Component,
  argTypes: {
    headerText: {
      defaultValue: "Good Place Neighborhood Grant",
      control: {
        type: "text",
      },
    },
  },
};

export const Hero = (props) => (
  <Component {...props}>
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <dl style={{ flexDirection: "column" }}>
        <dt>Funding Organization</dt>
        <dd>The Good Place</dd>

        <dt>RFP Website</dt>
        <dd>goodorbad.com/newneighborhoods</dd>

        <dt>Purpose</dt>
        <dd>Moral Testing</dd>
      </dl>

      <div style={{ flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: "var(--tertiary-light)",
            padding: "5px",
            boxShadow: "10px 10px var(--tertiary-dark)",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <dl>
            <dt>DEADLINE</dt>
            <dd>June 30, 2021</dd>
          </dl>
        </div>
        <div>Total Word Count: 0</div>
      </div>
    </div>
  </Component>
);
