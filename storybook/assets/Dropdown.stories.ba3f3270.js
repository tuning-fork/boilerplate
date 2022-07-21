import{r as s,j as n,a as p,F as M}from"./jsx-runtime.2d63e2ec.js";import{p as o}from"./index.9ab846ab.js";import{c as A}from"./clsx.m.c5ef2623.js";import{u as k}from"./module.ef134bd7.js";import{M as T}from"./index.esm.3167a360.js";import{B as _}from"./Button.eeacf784.js";import{D as E,a as q,o as O}from"./DropdownMenu.e1af052b.js";import"./iframe.bfd22f3a.js";import"./iconBase.8f390e64.js";function i(u){const{className:d,onChange:c,options:a,placeholder:y,value:S,labelText:w,altLabel:f,onClickAltLabel:b}=u,v=s.exports.useRef(null),h=k(),[r,t]=s.exports.useState(!1),[D,g]=s.exports.useState(a[0]),m=a.find(e=>e.value===S)||null,C={focusedOption:D,isMenuOpen:r,labelId:h,options:a,selectedOption:m,setFocusedOption:g,setIsMenuOpen:t,setSelectedOption:c};return s.exports.useEffect(()=>{const e=l=>{var x;!((x=v.current)!=null&&x.contains(l.target))&&r&&t(!1)};return document.addEventListener("click",e,!1),()=>{document.removeEventListener("click",e,!1)}},[r]),n(E.Provider,{value:C,children:p("div",{className:A(d,"dropdown"),ref:v,onKeyDown:e=>{e.key==="Escape"&&t(!1)},children:[p("span",{id:h,className:"dropdown__label",children:[n("div",{onClick:()=>t(!0),children:w}),f&&n(_,{className:"dropdown__alt-label",variant:"none",onClick:b,children:f})]}),p(_,{variant:"none",className:"dropdown__input","aria-haspopup":"listbox",onMouseDown:e=>{e.stopPropagation(),e.preventDefault(),t(l=>!l)},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&t(l=>!l)},children:[m?n("span",{children:m.label}):n("span",{className:"dropdown__placeholder",children:y}),n(T,{})]}),n(q,{"aria-expanded":r,hidden:!r,options:a})]})})}i.propTypes={className:o.exports.string,labelText:o.exports.string.isRequired,onChange:o.exports.func.isRequired,options:o.exports.arrayOf(O).isRequired,placeholder:o.exports.string,required:o.exports.bool,value:o.exports.string};i.defaultProps={required:!1};i.__docgenInfo={description:"",methods:[],displayName:"Dropdown",props:{required:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},labelText:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!0,description:""},options:{type:{name:"arrayOf",value:{name:"custom",raw:"optionPropType"}},required:!0,description:""},placeholder:{type:{name:"string"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""}}};const j={parameters:{storySource:{source:`import React, { useState } from "react";
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
;Dropdown.__docgenInfo={"description":"","methods":[],"displayName":"Dropdown"}`,locationsMap:{dropdown:{startLoc:{col:24,line:25},endLoc:{col:1,line:38},startBody:{col:24,line:25},endBody:{col:1,line:38}}}}},title:"Design/Dropdown",component:i,argTypes:{labelText:{defaultValue:"Further Actions"},placeholder:{defaultValue:"Pick One"},options:{defaultValue:[{value:"MARK_AS_SUBMITTED",label:"Mark as Submitted"},{value:"MARK_AS_SUCCESSFUL",label:"Mark as Successful"},{value:"MARK_AS_COPY",label:"Mark as Copy"},{value:"ARCHIVE",label:"Archive"}]}}},R=u=>{const[d,c]=s.exports.useState(null);return p(M,{children:[n(i,{...u,value:d,onChange:a=>c(a.value)}),p("p",{children:["Selected value: ",d]})]})};R.__docgenInfo={description:"",methods:[],displayName:"Dropdown"};const H=["Dropdown"];export{R as Dropdown,H as __namedExportsOrder,j as default};
//# sourceMappingURL=Dropdown.stories.ba3f3270.js.map
