import{r as p}from"./index.b8fd3884.js";import{b as g,H as z,S as h,R as a,a as l}from"./react-router-dom.2fcfabae.js";import{N as f}from"./Navbar.4ca2f425.js";import{S as O}from"./Sidebar.99e148e2.js";import{u as d,d as C}from"./currentUserContext.27130f19.js";import{u as m,a as y}from"./CurrentOrganizationLink.15c4752c.js";import{a as i,j as n}from"./jsx-runtime.0b933dff.js";import"./index.014bc556.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./iframe.b8251f0f.js";import"./iconBase.b42efa6b.js";import"./DropdownMenu.41902008.js";import"./Button.4d99bcbe.js";import"./index.esm.cb7dc16e.js";function e(t){const{user:o}=d(),{currentOrganization:r,isLoadingOrganization:s,fetchCurrentOrganization:u}=m(),{organizationId:c}=g();return p.exports.useEffect(()=>{!r&&!s&&u(c)},[r,s,u,c]),r?i("main",{className:"organization-layout",children:[n(f,{organizationName:r.name,user:o}),i("div",{className:"organization-layout__content",children:[n(O,{}),t.children]})]}):"Loading org..."}e.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};var B={parameters:{storySource:{source:`import React, { useEffect } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./OrganizationLayout";
import { CurrentUserProvider } from "../../../Contexts/currentUserContext";
import { CurrentOrganizationProvider } from "../../../Contexts/currentOrganizationContext";
import { useCurrentOrganization } from "../../../Contexts/currentOrganizationContext";
import { useCurrentUser } from "../../../Contexts/currentUserContext";

export default {
  title: "Layouts/Organization Layout",
  component: Component,
};

export const OrganizationLayout = () => (
  <CurrentUserProvider>
    <CurrentOrganizationProvider>
      <HashRouter>
        <ContextWrapper />
      </HashRouter>
    </CurrentOrganizationProvider>
  </CurrentUserProvider>
);

const ContextWrapper = () => {
  const { userDispatch } = useCurrentUser();
  const { currentOrganizationDispatch, currentOrganization } =
    useCurrentOrganization();

  useEffect(() => {
    userDispatch({
      type: "SET_CURRENT_USER",
      payload: { user: { first_name: "Chidi", last_name: "Anagonye" } },
    });
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION",
      payload: {
        currentOrganization: {
          id: "06a7796b-f5f7-4261-9830-3892fb604f24",
          name: "Baklava Foundation",
        },
      },
    });
  }, [currentOrganizationDispatch, userDispatch]);

  if (!currentOrganization) {
    return null;
  }

  return (
    <Component>
      <Switch>
        <Route path="/organizations/:organizationId/dashboard">Dashboard</Route>
        <Route path="/organizations/:organizationId/reports">Reports</Route>
        <Route path="/">
          <Redirect to="/organizations/2/dashboard" />
        </Route>
      </Switch>
    </Component>
  );
};
;OrganizationLayout.__docgenInfo={"description":"","methods":[],"displayName":"OrganizationLayout"}`,locationsMap:{"organization-layout":{startLoc:{col:34,line:14},endLoc:{col:1,line:22},startBody:{col:34,line:14},endBody:{col:1,line:22}}}}},title:"Layouts/Organization Layout",component:e};const R=()=>n(C,{children:n(y,{children:n(z,{children:n(_,{})})})}),_=()=>{const{userDispatch:t}=d(),{currentOrganizationDispatch:o,currentOrganization:r}=m();return p.exports.useEffect(()=>{t({type:"SET_CURRENT_USER",payload:{user:{first_name:"Chidi",last_name:"Anagonye"}}}),o({type:"SET_CURRENT_ORGANIZATION",payload:{currentOrganization:{id:"06a7796b-f5f7-4261-9830-3892fb604f24",name:"Baklava Foundation"}}})},[o,t]),r?n(e,{children:i(h,{children:[n(a,{path:"/organizations/:organizationId/dashboard",children:"Dashboard"}),n(a,{path:"/organizations/:organizationId/reports",children:"Reports"}),n(a,{path:"/",children:n(l,{to:"/organizations/2/dashboard"})})]})}):null};R.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const j=["OrganizationLayout"];export{R as OrganizationLayout,j as __namedExportsOrder,B as default};
//# sourceMappingURL=OrganizationLayout.stories.d50145a6.js.map
