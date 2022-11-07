import React from "react";
import Frame from "./Frame";

export default {
  title: "Design/Frame",
  component: Frame,
};

export const FrameRegular = (props) => (
  <Frame {...props}>
    <p>Welcome to the Frame! Enjoy your stay</p>
  </Frame>
);
