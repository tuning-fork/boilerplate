import{j as t,a as i}from"./jsx-runtime.b35027c6.js";import{p as o}from"./index.9ab846ab.js";import{c as a}from"./clsx.m.c5ef2623.js";import"./iframe.6fb498a2.js";function n(e){return t(e.as,{className:a(e.className,"container",e.centered&&"container--centered"),children:e.children})}n.propTypes={as:o.exports.string,centered:o.exports.bool,className:o.exports.string};n.defaultProps={as:"div",centered:!1};n.__docgenInfo={description:"",methods:[],displayName:"Container",props:{as:{defaultValue:{value:'"div"',computed:!1},type:{name:"string"},required:!1,description:"Element to use for container."},centered:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""}}};const p={parameters:{storySource:{source:`import React from "react";
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
;Container.__docgenInfo={"description":"","methods":[],"displayName":"Container"}`,locationsMap:{container:{startLoc:{col:25,line:15},endLoc:{col:1,line:24},startBody:{col:25,line:15},endBody:{col:1,line:24}}}}},title:"Design/Container",component:n,argTypes:{as:{options:["div","section","article"],control:{type:"radio"}}}},r=e=>i(n,{...e,children:[t("h1",{children:"Heading 1"}),t("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut venenatis tellus in."})]});r.__docgenInfo={description:"",methods:[],displayName:"Container"};const m=["Container"];export{r as Container,m as __namedExportsOrder,p as default};
//# sourceMappingURL=Container.stories.be38eefc.js.map
