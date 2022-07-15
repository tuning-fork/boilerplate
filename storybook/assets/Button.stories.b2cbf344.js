import"./index.b8fd3884.js";import{H as a,L as c,S as s,R as r,a as u}from"./react-router-dom.2fcfabae.js";import{b as i}from"./index.esm.cb7dc16e.js";import{B as o}from"./Button.4d99bcbe.js";import{j as n,a as e}from"./jsx-runtime.0b933dff.js";import"./index.014bc556.js";import"./objectWithoutPropertiesLoose.5e7699d1.js";import"./iconBase.b42efa6b.js";import"./clsx.m.c5ef2623.js";var _={parameters:{storySource:{source:`import React from "react";
import { Link, Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Button from "./Button";

export default {
  title: "Design/Button",
  component: Button,
  args: {
    children: "Button",
  },
};

export const ButtonRegular = (props) => (
  <Button {...props}>{props.children}</Button>
);

export const ButtonWithIcon = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "20px",
    }}
  >
    <Button {...props}>
      <MdSearch />
    </Button>
    <Button {...props}>
      <MdSearch />
      {props.children}
    </Button>
    <Button {...props}>
      {props.children}
      <MdSearch />
    </Button>
  </div>
);

export const ButtonLink = (props) => (
  <HashRouter>
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button {...props} as="a" href="https://example.com">
        https://example.com
      </Button>
      <Button {...props} as={Link} to="/route-1">
        Route 1
      </Button>
      <Button {...props} as={Link} to="/route-2">
        Route 2
      </Button>
    </div>
    <Switch>
      <Route path="/route-1">Route 1</Route>
      <Route path="/route-2">Route 2</Route>
      <Route path="/">
        <Redirect to="/route-1" />
      </Route>
    </Switch>
  </HashRouter>
);
;ButtonRegular.__docgenInfo={"description":"","methods":[],"displayName":"ButtonRegular"};ButtonWithIcon.__docgenInfo={"description":"","methods":[],"displayName":"ButtonWithIcon"};ButtonLink.__docgenInfo={"description":"","methods":[],"displayName":"ButtonLink"}`,locationsMap:{"button-regular":{startLoc:{col:29,line:14},endLoc:{col:1,line:16},startBody:{col:29,line:14},endBody:{col:1,line:16}},"button-with-icon":{startLoc:{col:30,line:18},endLoc:{col:1,line:38},startBody:{col:30,line:18},endBody:{col:1,line:38}},"button-link":{startLoc:{col:26,line:40},endLoc:{col:1,line:61},startBody:{col:26,line:40},endBody:{col:1,line:61}}}}},title:"Design/Button",component:o,args:{children:"Button"}};const l=t=>n(o,{...t,children:t.children}),d=t=>e("div",{style:{display:"flex",justifyContent:"space-evenly",marginBottom:"20px"},children:[n(o,{...t,children:n(i,{})}),e(o,{...t,children:[n(i,{}),t.children]}),e(o,{...t,children:[t.children,n(i,{})]})]}),p=t=>e(a,{children:[e("div",{style:{display:"flex",gap:"1rem"},children:[n(o,{...t,as:"a",href:"https://example.com",children:"https://example.com"}),n(o,{...t,as:c,to:"/route-1",children:"Route 1"}),n(o,{...t,as:c,to:"/route-2",children:"Route 2"})]}),e(s,{children:[n(r,{path:"/route-1",children:"Route 1"}),n(r,{path:"/route-2",children:"Route 2"}),n(r,{path:"/",children:n(u,{to:"/route-1"})})]})]});l.__docgenInfo={description:"",methods:[],displayName:"ButtonRegular"};d.__docgenInfo={description:"",methods:[],displayName:"ButtonWithIcon"};p.__docgenInfo={description:"",methods:[],displayName:"ButtonLink"};const I=["ButtonRegular","ButtonWithIcon","ButtonLink"];export{p as ButtonLink,l as ButtonRegular,d as ButtonWithIcon,I as __namedExportsOrder,_ as default};
//# sourceMappingURL=Button.stories.b2cbf344.js.map
