import{r as l}from"./index.9b1aa413.js";import{P as t}from"./index.0b0c857d.js";import{c as d}from"./clsx.m.c5ef2623.js";import{c as i}from"./index.esm.6fd964df.js";import{a as p,j as e}from"./jsx-runtime.0ecfbf7b.js";import"./iconBase.c4e65c7e.js";function o(n){const{labelText:c,className:a,checked:s,onChange:r}=n;return p("label",{className:d(a,"checkbox"),children:[e("input",{className:"checkbox__input",type:"checkbox",checked:s,onChange:r}),e(i,{className:"checkbox__check"}),e("div",{className:"checkbox__background"}),e("span",{className:"checkbox__label",children:c})]})}o.propTypes={checked:t.bool,className:t.string,labelText:t.string.isRequired,onChange:t.func};o.defaultProps={checked:!1,indeterminate:!1};o.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{checked:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},indeterminate:{defaultValue:{value:"false",computed:!1},required:!1},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""}}};var C={parameters:{storySource:{source:`import React, { useState } from "react";
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
;Checkbox.__docgenInfo={"description":"","methods":[],"displayName":"Checkbox"}`,locationsMap:{checkbox:{startLoc:{col:24,line:15},endLoc:{col:1,line:25},startBody:{col:24,line:15},endBody:{col:1,line:25}}}}},title:"Design/Checkbox",component:o,argTypes:{labelText:{defaultValue:"Enabled",control:{type:"text"}}}};const h=n=>{const[c,a]=l.exports.useState(!1);return e(o,{...n,checked:c,onChange:s=>a(s.target.checked)})};h.__docgenInfo={description:"",methods:[],displayName:"Checkbox"};const g=["Checkbox"];export{h as Checkbox,g as __namedExportsOrder,C as default};
//# sourceMappingURL=Checkbox.stories.78707e38.js.map
