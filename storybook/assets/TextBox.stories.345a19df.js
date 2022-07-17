import"./index.9b1aa413.js";import{b as l}from"./index.esm.6fd964df.js";import{P as e}from"./index.0b0c857d.js";import{c as h}from"./clsx.m.c5ef2623.js";import{a,j as t}from"./jsx-runtime.0ecfbf7b.js";/* empty css               */import"./iconBase.c4e65c7e.js";function o(n){const{labelText:s,placeholderText:x,onChange:p,className:d,prefix:i,suffix:r,align:c,required:f,type:m,search:u,value:T,...g}=n;return a("label",{className:h(d,"text-box",`text-box--align-${c}`),children:[t("span",{className:"text-box__label",children:s}),a("span",{className:"text-box__container",children:[i&&t("span",{className:"text-box__prefix",children:i}),u?t(l,{className:"text-box__search_icon"}):null,t("input",{className:"text-box__input",type:m,value:T,onChange:p,placeholder:x,required:f,...g}),r&&t("span",{className:"text-box__suffix",children:r})]})]})}o.propTypes={align:e.oneOf(["left","right"]),className:e.string,labelText:e.string,placeholderText:e.string,onChange:e.func,prefix:e.node,required:e.bool,suffix:e.node,type:e.string,value:e.string};o.defaultProps={align:"left",required:!1,type:"text"};o.__docgenInfo={description:"",methods:[],displayName:"TextBox",props:{align:{defaultValue:{value:'"left"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"right"',computed:!1}]},required:!1,description:""},required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},type:{defaultValue:{value:'"text"',computed:!1},type:{name:"string"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!1,description:""},placeholderText:{type:{name:"string"},required:!1,description:""},onChange:{type:{name:"func"},required:!1,description:""},prefix:{type:{name:"node"},required:!1,description:""},suffix:{type:{name:"node"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""}}};var C={parameters:{storySource:{source:`import React from "react";
import { MdSearch } from "react-icons/md";
import Component from "./TextBox";
import "../../design.css";

export default {
  title: "Design/TextBox",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Name",
      control: { type: "text" },
    },
  },
};

export const TextBox = (props) => <Component {...props} />;

export const TextBoxWithPrefixAndSuffix = () => (
  <div style={{ display: "flex", gap: "20px" }}>
    <Component labelText="Amount" prefix="$" />
    <Component labelText="Search" prefix={<MdSearch />} />
    <Component labelText="Amount" suffix="USD" align="right" />
  </div>
);
;TextBox.__docgenInfo={"description":"","methods":[],"displayName":"TextBox"};TextBoxWithPrefixAndSuffix.__docgenInfo={"description":"","methods":[],"displayName":"TextBoxWithPrefixAndSuffix"}`,locationsMap:{"text-box":{startLoc:{col:23,line:17},endLoc:{col:58,line:17},startBody:{col:23,line:17},endBody:{col:58,line:17}},"text-box-with-prefix-and-suffix":{startLoc:{col:42,line:19},endLoc:{col:1,line:25},startBody:{col:42,line:19},endBody:{col:1,line:25}}}}},title:"Design/TextBox",component:o,argTypes:{labelText:{defaultValue:"Name",control:{type:"text"}}}};const y=n=>t(o,{...n}),b=()=>a("div",{style:{display:"flex",gap:"20px"},children:[t(o,{labelText:"Amount",prefix:"$"}),t(o,{labelText:"Search",prefix:t(l,{})}),t(o,{labelText:"Amount",suffix:"USD",align:"right"})]});y.__docgenInfo={description:"",methods:[],displayName:"TextBox"};b.__docgenInfo={description:"",methods:[],displayName:"TextBoxWithPrefixAndSuffix"};const P=["TextBox","TextBoxWithPrefixAndSuffix"];export{y as TextBox,b as TextBoxWithPrefixAndSuffix,P as __namedExportsOrder,C as default};
//# sourceMappingURL=TextBox.stories.345a19df.js.map
