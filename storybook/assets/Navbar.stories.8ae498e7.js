import"./index.b8fd3884.js";import{H as n}from"./react-router-dom.2fcfabae.js";import{C as t,c as a}from"./currentUserContext.27130f19.js";import{N as e}from"./Navbar.4ca2f425.js";import{j as r}from"./jsx-runtime.0b933dff.js";import"./index.014bc556.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./iframe.b8251f0f.js";import"./iconBase.b42efa6b.js";import"./DropdownMenu.41902008.js";import"./Button.4d99bcbe.js";const s=o=>r(t.Provider,{value:{status:a.SUCCESS,error:null,user:{firstName:"Chidi",lastName:"Anagonye"},jwt:"2906e7695a1948038e253074bfabc077",logout:()=>console.log("Logout called!")},children:r(o,{})});var U={parameters:{storySource:{source:`import React from "react";
import { HashRouter } from "react-router-dom";
import {
  CurrentUserContext,
  CurrentUserStatus,
} from "../../../Contexts/currentUserContext";
import Component from "./Navbar";

const MockCurrentUserProvider = (Story) => (
  <CurrentUserContext.Provider
    value={{
      status: CurrentUserStatus.SUCCESS,
      error: null,
      user: {
        firstName: "Chidi",
        lastName: "Anagonye",
      },
      jwt: "2906e7695a1948038e253074bfabc077",
      logout: () => console.log("Logout called!"),
    }}
  >
    <Story />
  </CurrentUserContext.Provider>
);

export default {
  title: "Design/Navbar",
  component: Component,
  args: {
    user: { firstName: "Chidi", lastName: "Anagonye" },
    organizationName: "Baklava Foundation",
  },
  decorators: [MockCurrentUserProvider],
};

export const Navbar = (props) => (
  <HashRouter>
    <Component {...props} />
  </HashRouter>
);
;Navbar.__docgenInfo={"description":"","methods":[],"displayName":"Navbar"}`,locationsMap:{navbar:{startLoc:{col:22,line:36},endLoc:{col:1,line:40},startBody:{col:22,line:36},endBody:{col:1,line:40}}}}},title:"Design/Navbar",component:e,args:{user:{firstName:"Chidi",lastName:"Anagonye"},organizationName:"Baklava Foundation"},decorators:[s]};const i=o=>r(n,{children:r(e,{...o})});i.__docgenInfo={description:"",methods:[],displayName:"Navbar"};const h=["Navbar"];export{i as Navbar,h as __namedExportsOrder,U as default};
//# sourceMappingURL=Navbar.stories.8ae498e7.js.map
