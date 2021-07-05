import React from "react";
import Component from "./Navbar";
import NavLink from "./NavLink/NavLink";
import Button, { ButtonVariant, ButtonColor } from "../Button/Button";
import Input, { InputType } from "../Input/Input";
// import Dropdown, { Dropdown } from "./Dropdown/Dropdown";
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
  title: "Design/Navbar",
  component: Component,
  argTypes: {},
};

export const NavbarVertical = (props) => (
  <Component {...props} className="navbar">
    <div className="navbar-navitem">
      <HomeIcon />
      <NavLink className="navitem-navlink">{props.text}</NavLink>
    </div>
    <div className="navbar-navitem">
      <LocalAtmIcon />
      <NavLink className="navbar-navlink">{props.text}</NavLink>
    </div>
    <div className="navbar-navitem">
      <ExtensionIcon />
      <NavLink className="navbar-navlink">{props.text}</NavLink>
    </div>
    <div className="navbar-navitem">
      <BarChartIcon />
      <NavLink className="navbar-navlink">{props.text}</NavLink>
    </div>
    <div className="navbar-navitem">
      <AccountBalanceIcon />
      <NavLink className="navbar-navlink">{props.text}</NavLink>
    </div>
    <div className="navbar-navitem">
      <FormatListBulletedIcon />
      <NavLink className="navbar-navlink">{props.text}</NavLink>
    </div>
  </Component>
);

export const NavbarHorizontal = (props) => (
  <Component {...props}>
    {/* <LogoType></LogoType>
    <LinkBreadCrumb></LinkBreadCrumb>
    <CurrentOrg></CurrentOrg> */}
    {/* Need dropdown for User-Organizations Select */}
    {/* <Dropdown></Dropdown> */}
    {/* <CurrentUser></CurrentUser> */}
    {/* Need dropdown for User Profile and Logout */}
    {/* <Dropdown></Dropdown> */}
  </Component>
);

export const NavbarLogin = (props) => (
  <Component {...props}>
    {/* <LogoType></LogoType> */}
    <Input></Input>
    <Input></Input>
    <Button {...props}>{props.text}</Button>
    <Button {...props}>{props.text}</Button>
  </Component>
);
