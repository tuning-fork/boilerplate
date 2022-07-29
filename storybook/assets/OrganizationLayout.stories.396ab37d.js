import{a as i,j as n,r as c}from"./jsx-runtime.1b84a9c9.js";import{H as p,S as d,R as a,a as m}from"./react-router-dom.ce609d22.js";import{N as g}from"./Navbar.e4bb0241.js";import{S as z}from"./Sidebar.22b862c2.js";import{u as s,d as h}from"./currentUserContext.ab114801.js";import{u,a as l}from"./CurrentOrganizationLink.ad79706a.js";import"./iframe.bc94ed4f.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./Avatar.29f06c04.js";import"./iconBase.5e156030.js";import"./DropdownMenu.9f6fd46c.js";import"./Button.d302035b.js";import"./index.esm.c819f455.js";import"./index.cc47c215.js";function e(t){const{user:r}=s(),{currentOrganization:o}=u();return i("main",{className:"organization-layout",children:[n(g,{organizationName:o.name,user:r}),i("div",{className:"organization-layout__content",children:[n(z,{}),t.children]})]})}e.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const A={parameters:{storySource:{source:`import React, { useEffect } from "react";
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
;OrganizationLayout.__docgenInfo={"description":"","methods":[],"displayName":"OrganizationLayout"}`,locationsMap:{"organization-layout":{startLoc:{col:34,line:14},endLoc:{col:1,line:22},startBody:{col:34,line:14},endBody:{col:1,line:22}}}}},title:"Layouts/Organization Layout",component:e},f=()=>n(h,{children:n(l,{children:n(p,{children:n(O,{})})})}),O=()=>{const{userDispatch:t}=s(),{currentOrganizationDispatch:r,currentOrganization:o}=u();return c.exports.useEffect(()=>{t({type:"SET_CURRENT_USER",payload:{user:{first_name:"Chidi",last_name:"Anagonye"}}}),r({type:"SET_CURRENT_ORGANIZATION",payload:{currentOrganization:{id:"06a7796b-f5f7-4261-9830-3892fb604f24",name:"Baklava Foundation"}}})},[r,t]),o?n(e,{children:i(d,{children:[n(a,{path:"/organizations/:organizationId/dashboard",children:"Dashboard"}),n(a,{path:"/organizations/:organizationId/reports",children:"Reports"}),n(a,{path:"/",children:n(m,{to:"/organizations/2/dashboard"})})]})}):null};f.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const H=["OrganizationLayout"];export{f as OrganizationLayout,H as __namedExportsOrder,A as default};
//# sourceMappingURL=OrganizationLayout.stories.396ab37d.js.map
