import"./index.b8fd3884.js";import{P as o}from"./index.014bc556.js";import{c as i}from"./clsx.m.c5ef2623.js";import{j as t,a}from"./jsx-runtime.0b933dff.js";function n(e){return t(e.as,{className:i(e.className,"container",e.centered&&"container--centered"),children:e.children})}n.propTypes={as:o.string,centered:o.bool,className:o.string};n.defaultProps={as:"div",centered:!1};n.__docgenInfo={description:"",methods:[],displayName:"Container",props:{as:{defaultValue:{value:'"div"',computed:!1},type:{name:"string"},required:!1,description:"Element to use for container."},centered:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""}}};var p={parameters:{storySource:{source:`import React from "react";
import Component from "./Container";

export default {
  title: "Design/Container",
  component: Component,
  argTypes: {
    as: {
      options: ["div", "section", "article"],
      control: { type: "radio" },
    },
  },
};

export const Container = (props) => (
  <Component {...props}>
    <h1>Heading 1</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut
      venenatis tellus in.
    </p>
  </Component>
);
;Container.__docgenInfo={"description":"","methods":[],"displayName":"Container"}`,locationsMap:{container:{startLoc:{col:25,line:15},endLoc:{col:1,line:24},startBody:{col:25,line:15},endBody:{col:1,line:24}}}}},title:"Design/Container",component:n,argTypes:{as:{options:["div","section","article"],control:{type:"radio"}}}};const r=e=>a(n,{...e,children:[t("h1",{children:"Heading 1"}),t("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut venenatis tellus in."})]});r.__docgenInfo={description:"",methods:[],displayName:"Container"};const m=["Container"];export{r as Container,m as __namedExportsOrder,p as default};
//# sourceMappingURL=Container.stories.b00f22fb.js.map
