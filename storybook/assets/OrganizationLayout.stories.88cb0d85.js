import{r as d,a as i,j as n}from"./jsx-runtime.2d63e2ec.js";import{b as g,H as z,S as h,R as a,a as l}from"./react-router-dom.feb326cf.js";import{N as f}from"./Navbar.cb7f216d.js";import{S as O}from"./Sidebar.64e8ec18.js";import{u as p,d as C}from"./currentUserContext.6b995cee.js";import{u as m,a as y}from"./CurrentOrganizationLink.9f961061.js";import"./iframe.bfd22f3a.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./iconBase.8f390e64.js";import"./DropdownMenu.e1af052b.js";import"./Button.eeacf784.js";import"./index.esm.3167a360.js";function e(r){const{user:o}=p(),{currentOrganization:t,isLoadingOrganization:s,fetchCurrentOrganization:u}=m(),{organizationId:c}=g();return d.exports.useEffect(()=>{!t&&!s&&u(c)},[t,s,u,c]),t?i("main",{className:"organization-layout",children:[n(f,{organizationName:t.name,user:o}),i("div",{className:"organization-layout__content",children:[n(O,{}),r.children]})]}):"Loading org..."}e.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const w={parameters:{storySource:{source:`import React, { useEffect } from "react";
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
;OrganizationLayout.__docgenInfo={"description":"","methods":[],"displayName":"OrganizationLayout"}`,locationsMap:{"organization-layout":{startLoc:{col:34,line:14},endLoc:{col:1,line:22},startBody:{col:34,line:14},endBody:{col:1,line:22}}}}},title:"Layouts/Organization Layout",component:e},R=()=>n(C,{children:n(y,{children:n(z,{children:n(_,{})})})}),_=()=>{const{userDispatch:r}=p(),{currentOrganizationDispatch:o,currentOrganization:t}=m();return d.exports.useEffect(()=>{r({type:"SET_CURRENT_USER",payload:{user:{first_name:"Chidi",last_name:"Anagonye"}}}),o({type:"SET_CURRENT_ORGANIZATION",payload:{currentOrganization:{id:"06a7796b-f5f7-4261-9830-3892fb604f24",name:"Baklava Foundation"}}})},[o,r]),t?n(e,{children:i(h,{children:[n(a,{path:"/organizations/:organizationId/dashboard",children:"Dashboard"}),n(a,{path:"/organizations/:organizationId/reports",children:"Reports"}),n(a,{path:"/",children:n(l,{to:"/organizations/2/dashboard"})})]})}):null};R.__docgenInfo={description:"",methods:[],displayName:"OrganizationLayout"};const B=["OrganizationLayout"];export{R as OrganizationLayout,B as __namedExportsOrder,w as default};
//# sourceMappingURL=OrganizationLayout.stories.88cb0d85.js.map
