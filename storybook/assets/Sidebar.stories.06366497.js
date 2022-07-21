import{j as o,a}from"./jsx-runtime.2d63e2ec.js";import{H as r,S as e,R as n,a as s}from"./react-router-dom.feb326cf.js";import{S as t}from"./Sidebar.64e8ec18.js";import"./iframe.bfd22f3a.js";import"./index.9ab846ab.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./clsx.m.c5ef2623.js";import"./index.esm.3167a360.js";import"./iconBase.8f390e64.js";import"./CurrentOrganizationLink.9f961061.js";import"./currentUserContext.6b995cee.js";const S={parameters:{storySource:{source:`import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Component from "./Sidebar";

export default {
  title: "Design/Sidebar",
  component: Component,
};

export const Sidebar = (props) => (
  <HashRouter>
    <div style={{ display: "flex", height: "100%" }}>
      <Component {...props} />
      <div style={{ backgroundColor: "#f5f7f9", padding: "20px", flex: "1" }}>
        <Switch>
          <Route path="/organizations/:organizationId/dashboard">
            Dashboard
          </Route>
          <Route path="/organizations/:organizationId/reports">Reports</Route>
          <Route path="/organizations/:organizationId/grants">Grants</Route>
          <Route path="/organizations/:organizationId/boilerplates">
            Boilerplates
          </Route>
          <Route path="/organizations/:organizationId/funding_orgs">
            Funding Organizations
          </Route>
          <Route path="/organizations/:organizationId/categories">
            Categories
          </Route>
          <Route path="/organizations/:organizationId/users">Users</Route>
          <Route path="/">
            <Redirect to="/organizations/77c48824-3904-449a-9966-e0d8af2f9f64/dashboard" />
          </Route>
        </Switch>
      </div>
    </div>
  </HashRouter>
);
;Sidebar.__docgenInfo={"description":"","methods":[],"displayName":"Sidebar"}`,locationsMap:{sidebar:{startLoc:{col:23,line:10},endLoc:{col:1,line:38},startBody:{col:23,line:10},endBody:{col:1,line:38}}}}},title:"Design/Sidebar",component:t},d=i=>o(r,{children:a("div",{style:{display:"flex",height:"100%"},children:[o(t,{...i}),o("div",{style:{backgroundColor:"#f5f7f9",padding:"20px",flex:"1"},children:a(e,{children:[o(n,{path:"/organizations/:organizationId/dashboard",children:"Dashboard"}),o(n,{path:"/organizations/:organizationId/reports",children:"Reports"}),o(n,{path:"/organizations/:organizationId/grants",children:"Grants"}),o(n,{path:"/organizations/:organizationId/boilerplates",children:"Boilerplates"}),o(n,{path:"/organizations/:organizationId/funding_orgs",children:"Funding Organizations"}),o(n,{path:"/organizations/:organizationId/categories",children:"Categories"}),o(n,{path:"/organizations/:organizationId/users",children:"Users"}),o(n,{path:"/",children:o(s,{to:"/organizations/77c48824-3904-449a-9966-e0d8af2f9f64/dashboard"})})]})})]})});d.__docgenInfo={description:"",methods:[],displayName:"Sidebar"};const I=["Sidebar"];export{d as Sidebar,I as __namedExportsOrder,S as default};
//# sourceMappingURL=Sidebar.stories.06366497.js.map