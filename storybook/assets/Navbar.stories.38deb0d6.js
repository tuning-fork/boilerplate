import{j as r}from"./jsx-runtime.216c1028.js";import{H as n}from"./react-router-dom.481cbd2f.js";import{C as e,c as a}from"./currentUserContext.4e2e14fe.js";import{N as t}from"./Navbar.6ff60fb9.js";import"./iframe.89f75709.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./index.f218e96b.js";import"./Avatar.1aa8f261.js";import"./iconBase.f6b91f99.js";import"./DropdownMenu.b3921cce.js";import"./Button.f16911d3.js";const s=o=>r(e.Provider,{value:{status:a.SUCCESS,error:null,user:{firstName:"Chidi",lastName:"Anagonye"},jwt:"2906e7695a1948038e253074bfabc077",logout:()=>console.log("Logout called!")},children:r(o,{})}),h={parameters:{storySource:{source:`import React from "react";
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
;Navbar.__docgenInfo={"description":"","methods":[],"displayName":"Navbar"}`,locationsMap:{navbar:{startLoc:{col:22,line:36},endLoc:{col:1,line:40},startBody:{col:22,line:36},endBody:{col:1,line:40}}}}},title:"Design/Navbar",component:t,args:{user:{firstName:"Chidi",lastName:"Anagonye"},organizationName:"Baklava Foundation"},decorators:[s]},i=o=>r(n,{children:r(t,{...o})});i.__docgenInfo={description:"",methods:[],displayName:"Navbar"};const S=["Navbar"];export{i as Navbar,S as __namedExportsOrder,h as default};
//# sourceMappingURL=Navbar.stories.38deb0d6.js.map
