import{a as i,j as n,r as c}from"./jsx-runtime.b35027c6.js";import{H as p,S as d,R as a,a as m}from"./react-router-dom.b57375c1.js";import{N as g}from"./Navbar.462a8d9b.js";import{u as s,S as z,C as h}from"./Sidebar.823df86c.js";import{u,d as l}from"./currentUserContext.bb0ab506.js";import"./iframe.6fb498a2.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./Avatar.0e8637ac.js";import"./iconBase.fe14f2cb.js";import"./DropdownMenu.b29e6e0f.js";import"./Button.531711e8.js";import"./index.esm.67a3a5eb.js";import"./index.ecc5944c.js";function e(t){const{user:r}=u(),{currentOrganization:o}=s();return i("main",{className:"organization-layout",children:[n(g,{organizationName:o.name,user:r}),i("div",{className:"organization-layout__content",children:[n(z,{}),t.children]})]})}e.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const P={parameters:{storySource:{source:`import React, { useEffect } from "react";
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
;OrganizationLayout.__docgenInfo={"description":"","methods":[],"displayName":"OrganizationLayout"}`,locationsMap:{"organization-layout":{startLoc:{col:34,line:14},endLoc:{col:1,line:22},startBody:{col:34,line:14},endBody:{col:1,line:22}}}}},title:"Layouts/Organization Layout",component:e},O=()=>n(l,{children:n(h,{children:n(p,{children:n(f,{})})})}),f=()=>{const{userDispatch:t}=u(),{currentOrganizationDispatch:r,currentOrganization:o}=s();return c.exports.useEffect(()=>{t({type:"SET_CURRENT_USER",payload:{user:{first_name:"Chidi",last_name:"Anagonye"}}}),r({type:"SET_CURRENT_ORGANIZATION",payload:{currentOrganization:{id:"06a7796b-f5f7-4261-9830-3892fb604f24",name:"Baklava Foundation"}}})},[r,t]),o?n(e,{children:i(d,{children:[n(a,{path:"/organizations/:organizationId/dashboard",children:"Dashboard"}),n(a,{path:"/organizations/:organizationId/reports",children:"Reports"}),n(a,{path:"/",children:n(m,{to:"/organizations/2/dashboard"})})]})}):null};O.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const A=["OrganizationLayout"];export{O as OrganizationLayout,A as __namedExportsOrder,P as default};
//# sourceMappingURL=OrganizationLayout.stories.95ac5005.js.map
