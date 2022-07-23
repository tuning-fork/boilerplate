import React from "react";
import Avatar from "../Avatar/Avatar";
import Component from "./AvatarStack";

export default {
  title: "Design/AvatarStack",
  component: Component,
  args: {
    max: 3,
  },
};

export const AvatarStack = (props) => (
  <Component {...props}>
    <Avatar>Chidi Anagonye</Avatar>
    <Avatar>Tahani Jamil</Avatar>
    <Avatar>Jason Mendoza</Avatar>
    <Avatar>Elenor Shellstrop</Avatar>
  </Component>
);
