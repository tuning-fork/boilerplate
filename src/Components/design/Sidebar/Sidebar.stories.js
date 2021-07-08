import React from "react";
import Component from "./Sidebar";
import { withRouter, useHistory, useLocation, NavLink } from "react-router-dom";
//Dashboard Icon
import HomeIcon from "@material-ui/icons/Home";
//Grants Icon
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
//Boilerplates Icon
import ExtensionIcon from "@material-ui/icons/Extension";
//Reports Icon
import BarChartIcon from "@material-ui/icons/BarChart";
//Funding Organizations Icon
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
//Categories Icon
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

HomeIcon.displayName = "HomeIcon";
LocalAtmIcon.displayName = "LocalAtmIcon";
ExtensionIcon.displayName = "ExtensionIcon";
BarChartIcon.displayName = "BarChartIcon";
AccountBalanceIcon.displayName = "AccountBalanceIcon";
FormatListBulletedIcon.displayName = "FormatListBulletedIcon";

export default {
  title: "Design/Sidebar",
  component: Component,
  argTypes: {},
};

// extract pathname from location
const { pathname } = useLocation();
// isActive={() => endpoint.includes(pathname)}

export const Sidebar = (props) => (
  <Component {...props} className="sidebar">
    <HomeIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      <HomeIcon />
      {props.text}
    </NavLink>
    <LocalAtmIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      {props.text}
    </NavLink>
    <ExtensionIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      {props.text}
    </NavLink>
    <BarChartIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      {props.text}
    </NavLink>
    <AccountBalanceIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      {props.text}
    </NavLink>
    <FormatListBulletedIcon />
    <NavLink activeClassName="selected" to={props.endpoint}>
      {props.text}
    </NavLink>
  </Component>
);
