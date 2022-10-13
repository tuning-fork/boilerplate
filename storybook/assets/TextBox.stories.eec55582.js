import{a as r,j as t}from"./jsx-runtime.b35027c6.js";import{b as s}from"./index.esm.67a3a5eb.js";import{p as e}from"./index.9ab846ab.js";import{c as g}from"./clsx.m.c5ef2623.js";/* empty css               */import"./iframe.6fb498a2.js";import"./iconBase.fe14f2cb.js";function o(n){const{labelText:l,placeholderText:x,onChange:p,className:d,prefix:i,suffix:a,align:c,required:f,type:m,search:u,value:h,...T}=n;return r("label",{className:g(d,"text-box",`text-box--align-${c}`),children:[t("span",{className:"text-box__label",children:l}),r("span",{className:"text-box__container",children:[i&&t("span",{className:"text-box__prefix",children:i}),u?t(s,{className:"text-box__search_icon"}):null,t("input",{className:"text-box__input",type:m,value:h,onChange:p,placeholder:x,required:f,...T}),a&&t("span",{className:"text-box__suffix",children:a})]})]})}o.propTypes={align:e.exports.oneOf(["left","right"]),className:e.exports.string,labelText:e.exports.string,placeholderText:e.exports.string,onChange:e.exports.func,prefix:e.exports.node,required:e.exports.bool,suffix:e.exports.node,type:e.exports.string,value:e.exports.string,search:e.exports.bool};o.defaultProps={align:"left",required:!1,type:"text"};o.__docgenInfo={description:"",methods:[],displayName:"TextBox",props:{align:{defaultValue:{value:'"left"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"right"',computed:!1}]},required:!1,description:""},required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},type:{defaultValue:{value:'"text"',computed:!1},type:{name:"string"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!1,description:""},placeholderText:{type:{name:"string"},required:!1,description:""},onChange:{type:{name:"func"},required:!1,description:""},prefix:{type:{name:"node"},required:!1,description:""},suffix:{type:{name:"node"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""},search:{type:{name:"bool"},required:!1,description:""}}};const C={parameters:{storySource:{source:`import React from "react";
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
;TextBox.__docgenInfo={"description":"","methods":[],"displayName":"TextBox"};TextBoxWithPrefixAndSuffix.__docgenInfo={"description":"","methods":[],"displayName":"TextBoxWithPrefixAndSuffix"}`,locationsMap:{"text-box":{startLoc:{col:23,line:17},endLoc:{col:58,line:17},startBody:{col:23,line:17},endBody:{col:58,line:17}},"text-box-with-prefix-and-suffix":{startLoc:{col:42,line:19},endLoc:{col:1,line:25},startBody:{col:42,line:19},endBody:{col:1,line:25}}}}},title:"Design/TextBox",component:o,argTypes:{labelText:{defaultValue:"Name",control:{type:"text"}}}},y=n=>t(o,{...n}),b=()=>r("div",{style:{display:"flex",gap:"20px"},children:[t(o,{labelText:"Amount",prefix:"$"}),t(o,{labelText:"Search",prefix:t(s,{})}),t(o,{labelText:"Amount",suffix:"USD",align:"right"})]});y.__docgenInfo={description:"",methods:[],displayName:"TextBox"};b.__docgenInfo={description:"",methods:[],displayName:"TextBoxWithPrefixAndSuffix"};const P=["TextBox","TextBoxWithPrefixAndSuffix"];export{y as TextBox,b as TextBoxWithPrefixAndSuffix,P as __namedExportsOrder,C as default};
//# sourceMappingURL=TextBox.stories.eec55582.js.map
