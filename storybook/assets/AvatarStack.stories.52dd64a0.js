import{r as o,a as s,j as r}from"./jsx-runtime.b35027c6.js";import{A as a}from"./Avatar.0e8637ac.js";import{c as x}from"./clsx.m.c5ef2623.js";import{p}from"./index.9ab846ab.js";import"./iframe.6fb498a2.js";function e(n){const{children:c,className:l,max:t=3,...m}=n,i=o.exports.Children.count(c),d=o.exports.Children.toArray(c).slice(0,t).map((A,h)=>o.exports.cloneElement(A,{style:{transform:`translateX(calc(-1.4ch * ${h}))`}})),v=i>t&&s(a,{className:"avatar-stack__excess-avatar",style:{transform:`translateX(calc(-1.4ch * ${t}))`},children:["+",i-t]});return s("div",{className:x("avatar-stack",l),...m,children:[d,v]})}e.propTypes={children:p.exports.PropTypes.node.isRequired,max:p.exports.PropTypes.number};e.__docgenInfo={description:"",methods:[],displayName:"AvatarStack",props:{children:{type:{name:"node"},required:!0,description:""},max:{type:{name:"number"},required:!1,description:""}}};const g={parameters:{storySource:{source:`import React from "react";
import Avatar from "../Avatar/Avatar";
import Component from "./AvatarStack";

export default {
  title: "Design/AvatarStack",
  component: Component,
  args: {
    max: 3,
  },
};

export const AvatarStack = (props) => (
  <Component {...props}>
    <Avatar>Chidi Anagonye</Avatar>
    <Avatar>Tahani Jamil</Avatar>
    <Avatar>Jason Mendoza</Avatar>
    <Avatar>Elenor Shellstrop</Avatar>
  </Component>
);
;AvatarStack.__docgenInfo={"description":"","methods":[],"displayName":"AvatarStack"}`,locationsMap:{"avatar-stack":{startLoc:{col:27,line:13},endLoc:{col:1,line:20},startBody:{col:27,line:13},endBody:{col:1,line:20}}}}},title:"Design/AvatarStack",component:e,args:{max:3}},y=n=>s(e,{...n,children:[r(a,{children:"Chidi Anagonye"}),r(a,{children:"Tahani Jamil"}),r(a,{children:"Jason Mendoza"}),r(a,{children:"Elenor Shellstrop"})]});y.__docgenInfo={description:"",methods:[],displayName:"AvatarStack"};const C=["AvatarStack"];export{y as AvatarStack,C as __namedExportsOrder,g as default};
//# sourceMappingURL=AvatarStack.stories.52dd64a0.js.map
