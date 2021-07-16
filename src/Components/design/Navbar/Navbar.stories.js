import React from "react";
import Component from "./Navbar";
import NavLink from "./NavLink/NavLink";
import Button, { ButtonVariant, ButtonColor } from "../Button/Button";
import Input, { InputType } from "../Input/Input";

export default {
  title: "Design/Navbar",
  component: Component,
  argTypes: {},
};

export const Navbar = (props) => (
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
