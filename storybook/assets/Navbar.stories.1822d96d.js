import{j as r}from"./jsx-runtime.1b84a9c9.js";import{H as n}from"./react-router-dom.ce609d22.js";import{C as e,c as a}from"./currentUserContext.ab114801.js";import{N as t}from"./Navbar.e4bb0241.js";import"./iframe.bc94ed4f.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./index.cc47c215.js";import"./Avatar.29f06c04.js";import"./iconBase.5e156030.js";import"./DropdownMenu.9f6fd46c.js";import"./Button.d302035b.js";const s=o=>r(e.Provider,{value:{status:a.SUCCESS,error:null,user:{firstName:"Chidi",lastName:"Anagonye"},jwt:"2906e7695a1948038e253074bfabc077",logout:()=>console.log("Logout called!")},children:r(o,{})}),h={parameters:{storySource:{source:`import React from "react";
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
//# sourceMappingURL=Navbar.stories.1822d96d.js.map
