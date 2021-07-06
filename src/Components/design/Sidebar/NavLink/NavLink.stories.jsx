import React from "react";
import NavLink from "./NavLink";
//Dashboard Icon
import HomeIcon from "@material-ui/icons/Home";
HomeIcon.displayName = "HomeIcon";

export default {
  title: "Design/NavLink",
  component: NavLink,
  argTypes: {
    text: {
      defaultValue: "NavLink",
      control: {
        type: "text",
      },
    },
    hreflink: {
      defaultValue: "https://google.com",
      control: {
        type: "text",
      },
    },
  },
};

export const NavLinkRegular = (props) => (
  <NavLink {...props} href={props.hreflink}>
    {props.text}
  </NavLink>
);

export const NavLinkWithIcon = (props) => (
  <div className="navlink-container">
    <HomeIcon className="navlink-icon" />
    <NavLink {...props} href={props.hreflink}>
      {props.text}
    </NavLink>
  </div>
);
