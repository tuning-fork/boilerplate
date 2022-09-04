import{a as l,j as e,r as p}from"./jsx-runtime.216c1028.js";import{p as t}from"./index.9ab846ab.js";import{c as d}from"./clsx.m.c5ef2623.js";import{c as i}from"./index.esm.781c4d94.js";import"./iframe.89f75709.js";import"./iconBase.f6b91f99.js";function o(n){const{labelText:c,className:s,checked:a,onChange:r}=n;return l("label",{className:d(s,"checkbox"),children:[e("input",{className:"checkbox__input",type:"checkbox",checked:a,onChange:r}),e(i,{className:"checkbox__check"}),e("div",{className:"checkbox__background"}),e("span",{className:"checkbox__label",children:c})]})}o.propTypes={checked:t.exports.bool,className:t.exports.string,labelText:t.exports.string.isRequired,onChange:t.exports.func};o.defaultProps={checked:!1,indeterminate:!1};o.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{checked:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},indeterminate:{defaultValue:{value:"false",computed:!1},required:!1},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""}}};const C={parameters:{storySource:{source:`import React, { useState } from "react";
import Component from "./Checkbox";

export default {
  title: "Design/Checkbox",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Enabled",
      control: { type: "text" },
    },
  },
};

export const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Component
      {...props}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
};
;Checkbox.__docgenInfo={"description":"","methods":[],"displayName":"Checkbox"}`,locationsMap:{checkbox:{startLoc:{col:24,line:15},endLoc:{col:1,line:25},startBody:{col:24,line:15},endBody:{col:1,line:25}}}}},title:"Design/Checkbox",component:o,argTypes:{labelText:{defaultValue:"Enabled",control:{type:"text"}}}},h=n=>{const[c,s]=p.exports.useState(!1);return e(o,{...n,checked:c,onChange:a=>s(a.target.checked)})};h.__docgenInfo={description:"",methods:[],displayName:"Checkbox"};const g=["Checkbox"];export{h as Checkbox,g as __namedExportsOrder,C as default};
//# sourceMappingURL=Checkbox.stories.7359ea70.js.map
