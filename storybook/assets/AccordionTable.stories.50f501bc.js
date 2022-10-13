import{a as c,j as e}from"./jsx-runtime.b35027c6.js";import{p as s}from"./index.9ab846ab.js";import{c as d}from"./clsx.m.c5ef2623.js";import{A as y}from"./Accordion.7b2d0c09.js";import{A as g,a as b,b as C}from"./AccordionItemPanel.4ca6f1bb.js";import"./iframe.6fb498a2.js";import"./module.fb0d0bc0.js";import"./index.esm.67a3a5eb.js";import"./iconBase.fe14f2cb.js";import"./Button.531711e8.js";function n(r){const{columns:l,data:m,className:p}=r;return c(y,{as:"ol",className:d(p,"accordion-table"),children:[e("li",{children:c("div",{className:"accordion-table__row-header accordion-table__row-header--first",children:[e("div",{className:"accordion-table__cell"}),l.map((o,a)=>{var t;const i=typeof((t=m[0])==null?void 0:t[o.accessor])=="number";return e("div",{className:d("accordion-table__cell",i&&"accordion-table__cell--number"),children:o.Header},a)})]})}),m.map((o,a)=>c(g,{as:"li",children:[e(b,{heading:"h6",buttonClassName:"accordion-table__row-header",children:l.map((i,t)=>{const u=o[i.accessor];return e("div",{className:d("accordion-table__cell",typeof u=="number"&&"accordion-table__cell--number"),children:u},t)})}),e(C,{className:"accordion-table__row-panel",children:o._expandableContent})]},a))]})}n.propTypes={className:s.exports.string,columns:s.exports.array.isRequired,data:s.exports.array.isRequired};n.defaultProps={};n.__docgenInfo={description:"",methods:[],displayName:"AccordionTable",props:{className:{type:{name:"string"},required:!1,description:""},columns:{type:{name:"array"},required:!0,description:""},data:{type:{name:"array"},required:!0,description:""}}};const M={parameters:{storySource:{source:`import React from "react";
import Component from "./AccordionTable";

export default {
  title: "Design/Accordion/Accordion Table",
  component: Component,
};

const columns = [
  { Header: "Title", accessor: "title" },
  { Header: "Category", accessor: "category" },
  { Header: "Word Count", accessor: "wordCount" },
];
const data = [
  {
    title: "Mission Statement",
    category: "Info",
    wordCount: 235,
  },
  {
    title: "About Our Team",
    category: "Info",
    wordCount: 235,
  },
  {
    title: "Chidi Anagonye Bio",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Mission Statement",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Education and Family",
    category: "Staff Bios",
    wordCount: 235,
  },
  {
    title: "Community Engagement and Empowerment Programs",
    category: "Family Services",
    wordCount: 235,
    _expandableContent:
      "MIRA provides the resources and structure for Middle Eastern refugees to support one another and welcome new arrivals with what they need to succeed through support groups, community events, and bridge-building activities with the wider Chicago community. In FY18-19 189 MIRA Community Empowerment Clients participated in 645 Empowerment Activities.",
  },
  {
    title: "Current Finances",
    category: "Finance",
    wordCount: 102,
  },
  {
    title: "Budget",
    category: "Finance",
    wordCount: 34,
  },
];

export const AccordionTable = (props) => (
  <Component {...props} columns={columns} data={data} />
);
;AccordionTable.__docgenInfo={"description":"","methods":[],"displayName":"AccordionTable"}`,locationsMap:{"accordion-table":{startLoc:{col:30,line:59},endLoc:{col:1,line:61},startBody:{col:30,line:59},endBody:{col:1,line:61}}}}},title:"Design/Accordion/Accordion Table",component:n},w=[{Header:"Title",accessor:"title"},{Header:"Category",accessor:"category"},{Header:"Word Count",accessor:"wordCount"}],f=[{title:"Mission Statement",category:"Info",wordCount:235},{title:"About Our Team",category:"Info",wordCount:235},{title:"Chidi Anagonye Bio",category:"Staff Bios",wordCount:235},{title:"Mission Statement",category:"Staff Bios",wordCount:235},{title:"Education and Family",category:"Staff Bios",wordCount:235},{title:"Community Engagement and Empowerment Programs",category:"Family Services",wordCount:235,_expandableContent:"MIRA provides the resources and structure for Middle Eastern refugees to support one another and welcome new arrivals with what they need to succeed through support groups, community events, and bridge-building activities with the wider Chicago community. In FY18-19 189 MIRA Community Empowerment Clients participated in 645 Empowerment Activities."},{title:"Current Finances",category:"Finance",wordCount:102},{title:"Budget",category:"Finance",wordCount:34}],h=r=>e(n,{...r,columns:w,data:f});h.__docgenInfo={description:"",methods:[],displayName:"AccordionTable"};const H=["AccordionTable"];export{h as AccordionTable,H as __namedExportsOrder,M as default};
//# sourceMappingURL=AccordionTable.stories.50f501bc.js.map
