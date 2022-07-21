import{j as r}from"./jsx-runtime.2d63e2ec.js";import{H as e}from"./react-router-dom.feb326cf.js";import{C as t,c as a}from"./currentUserContext.6b995cee.js";import{N as n}from"./Navbar.cb7f216d.js";import"./iframe.bfd22f3a.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./iconBase.8f390e64.js";import"./DropdownMenu.e1af052b.js";import"./Button.eeacf784.js";const s=o=>r(t.Provider,{value:{status:a.SUCCESS,error:null,user:{firstName:"Chidi",lastName:"Anagonye"},jwt:"2906e7695a1948038e253074bfabc077",logout:()=>console.log("Logout called!")},children:r(o,{})}),b={parameters:{storySource:{source:`import React from "react";
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
;Navbar.__docgenInfo={"description":"","methods":[],"displayName":"Navbar"}`,locationsMap:{navbar:{startLoc:{col:22,line:36},endLoc:{col:1,line:40},startBody:{col:22,line:36},endBody:{col:1,line:40}}}}},title:"Design/Navbar",component:n,args:{user:{firstName:"Chidi",lastName:"Anagonye"},organizationName:"Baklava Foundation"},decorators:[s]},i=o=>r(e,{children:r(n,{...o})});i.__docgenInfo={description:"",methods:[],displayName:"Navbar"};const U=["Navbar"];export{i as Navbar,U as __namedExportsOrder,b as default};
//# sourceMappingURL=Navbar.stories.47bd9311.js.map
