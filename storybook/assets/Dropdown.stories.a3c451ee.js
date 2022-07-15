import{r as s}from"./index.b8fd3884.js";import{P as o}from"./index.014bc556.js";import{c as M}from"./clsx.m.c5ef2623.js";import{u as A}from"./module.0fed81b8.js";import{M as k}from"./index.esm.cb7dc16e.js";import{B as y}from"./Button.4d99bcbe.js";import{D as T,a as E,o as q}from"./DropdownMenu.41902008.js";import{j as n,a as i,F as O}from"./jsx-runtime.0b933dff.js";import"./iconBase.b42efa6b.js";function p(u){const{className:d,onChange:c,options:a,placeholder:S,value:w,labelText:b,altLabel:f,onClickAltLabel:D}=u,v=s.exports.useRef(null),h=A(),[t,r]=s.exports.useState(!1),[g,C]=s.exports.useState(a[0]),m=a.find(e=>e.value===w)||null,x={focusedOption:g,isMenuOpen:t,labelId:h,options:a,selectedOption:m,setFocusedOption:C,setIsMenuOpen:r,setSelectedOption:c};return s.exports.useEffect(()=>{const e=l=>{var _;!((_=v.current)!=null&&_.contains(l.target))&&t&&r(!1)};return document.addEventListener("click",e,!1),()=>{document.removeEventListener("click",e,!1)}},[t]),n(T.Provider,{value:x,children:i("div",{className:M(d,"dropdown"),ref:v,onKeyDown:e=>{e.key==="Escape"&&r(!1)},children:[i("span",{id:h,className:"dropdown__label",children:[n("div",{onClick:()=>r(!0),children:b}),f&&n(y,{className:"dropdown__alt-label",variant:"none",onClick:D,children:f})]}),i(y,{variant:"none",className:"dropdown__input","aria-haspopup":"listbox",onMouseDown:e=>{e.stopPropagation(),e.preventDefault(),r(l=>!l)},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&r(l=>!l)},children:[m?n("span",{children:m.label}):n("span",{className:"dropdown__placeholder",children:S}),n(k,{})]}),n(E,{"aria-expanded":t,hidden:!t,options:a})]})})}p.propTypes={className:o.string,labelText:o.string.isRequired,onChange:o.func.isRequired,options:o.arrayOf(q).isRequired,placeholder:o.string,required:o.bool,value:o.string};p.defaultProps={required:!1};p.__docgenInfo={description:"",methods:[],displayName:"Dropdown",props:{required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!0,description:""},options:{type:{name:"arrayOf",value:{name:"custom",raw:"optionPropType"}},required:!0,description:""},placeholder:{type:{name:"string"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""}}};var j={parameters:{storySource:{source:`import React, { useState } from "react";
import Component from "./Dropdown";

export default {
  title: "Design/Dropdown",
  component: Component,
  argTypes: {
    labelText: {
      defaultValue: "Further Actions",
    },
    placeholder: {
      defaultValue: "Pick One",
    },
    options: {
      defaultValue: [
        { value: "MARK_AS_SUBMITTED", label: "Mark as Submitted" },
        { value: "MARK_AS_SUCCESSFUL", label: "Mark as Successful" },
        { value: "MARK_AS_COPY", label: "Mark as Copy" },
        { value: "ARCHIVE", label: "Archive" },
      ],
    },
  },
};

export const Dropdown = (props) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Component
        {...props}
        value={value}
        onChange={(option) => setValue(option.value)}
      />
      <p>Selected value: {value}</p>
    </>
  );
};
;Dropdown.__docgenInfo={"description":"","methods":[],"displayName":"Dropdown"}`,locationsMap:{dropdown:{startLoc:{col:24,line:25},endLoc:{col:1,line:38},startBody:{col:24,line:25},endBody:{col:1,line:38}}}}},title:"Design/Dropdown",component:p,argTypes:{labelText:{defaultValue:"Further Actions"},placeholder:{defaultValue:"Pick One"},options:{defaultValue:[{value:"MARK_AS_SUBMITTED",label:"Mark as Submitted"},{value:"MARK_AS_SUCCESSFUL",label:"Mark as Successful"},{value:"MARK_AS_COPY",label:"Mark as Copy"},{value:"ARCHIVE",label:"Archive"}]}}};const R=u=>{const[d,c]=s.exports.useState(null);return i(O,{children:[n(p,{...u,value:d,onChange:a=>c(a.value)}),i("p",{children:["Selected value: ",d]})]})};R.__docgenInfo={description:"",methods:[],displayName:"Dropdown"};const H=["Dropdown"];export{R as Dropdown,H as __namedExportsOrder,j as default};
//# sourceMappingURL=Dropdown.stories.a3c451ee.js.map
