import{j as r}from"./jsx-runtime.b35027c6.js";import{H as n}from"./react-router-dom.b57375c1.js";import{C as e,a}from"./currentUserContext.bb0ab506.js";import{N as t}from"./Navbar.462a8d9b.js";import"./iframe.6fb498a2.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./index.ecc5944c.js";import"./Avatar.0e8637ac.js";import"./iconBase.fe14f2cb.js";import"./DropdownMenu.b29e6e0f.js";import"./Button.531711e8.js";const s=o=>r(e.Provider,{value:{status:a.SUCCESS,error:null,user:{firstName:"Chidi",lastName:"Anagonye"},jwt:"2906e7695a1948038e253074bfabc077",logout:()=>console.log("Logout called!")},children:r(o,{})}),h={parameters:{storySource:{source:`import React from "react";
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
//# sourceMappingURL=Navbar.stories.1e10e682.js.map
