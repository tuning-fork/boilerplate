import React from "react";
import Component from "./NavBar";
import NavLink from "./NavLink/NavLink";
import Button, { ButtonVariant, ButtonColor } from "./Button/Button";
import Input, { InputType } from "./Input/Input";
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

export default {
  title: "Design/NavBar",
  component: Component,
  argTypes: {},
};

export const NavBarVertical = (props) => (
  <Component {...props}>
    <NavLink>
      <HomeIcon />
      {props.text}
    </NavLink>
    <NavLink>
      <LocalAtmIcon />
      {props.text}
    </NavLink>
    <NavLink>
      <ExtensionIcon />
      {props.text}
    </NavLink>
    <NavLink>
      <BarChartIcon />
      {props.text}
    </NavLink>
    <NavLink>
      <AccountBalanceIcon />
      {props.text}
    </NavLink>
    <NavLink>
      <FormatListBulletedIcon />
      {props.text}
    </NavLink>
  </Component>
);

export const NavBarHorizontal = (props) => (
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

export const NavBarLogin = (props) => (
  <Component {...props}>
    {/* <LogoType></LogoType> */}
    <Input></Input>
    <Input></Input>
    <Button {...props}>{props.text}</Button>
    <Button {...props}>{props.text}</Button>
  </Component>
);
