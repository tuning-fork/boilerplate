import"./index.9b1aa413.js";import{P as c}from"./index.0b0c857d.js";import{c as s}from"./clsx.m.c5ef2623.js";import{A as y}from"./Accordion.36a3292c.js";import{a as d,j as e}from"./jsx-runtime.0ecfbf7b.js";import{A as g,a as b,b as C}from"./AccordionItemPanel.ee6c843c.js";import"./module.6c69adea.js";import"./index.esm.6fd964df.js";import"./iconBase.c4e65c7e.js";import"./Button.bc43666e.js";function n(r){const{columns:l,data:m,className:p}=r;return d(y,{as:"ol",className:s(p,"accordion-table"),children:[e("li",{children:d("div",{className:"accordion-table__row-header accordion-table__row-header--first",children:[e("div",{className:"accordion-table__cell"}),l.map((o,a)=>{var t;const i=typeof((t=m[0])==null?void 0:t[o.accessor])=="number";return e("div",{className:s("accordion-table__cell",i&&"accordion-table__cell--number"),children:o.Header},a)})]})}),m.map((o,a)=>d(g,{as:"li",children:[e(b,{heading:"h6",buttonClassName:"accordion-table__row-header",children:l.map((i,t)=>{const u=o[i.accessor];return e("div",{className:s("accordion-table__cell",typeof u=="number"&&"accordion-table__cell--number"),children:u},t)})}),e(C,{className:"accordion-table__row-panel",children:o._expandableContent})]},a))]})}n.propTypes={className:c.string,columns:c.array.isRequired,data:c.array.isRequired};n.defaultProps={};n.__docgenInfo={description:"",methods:[],displayName:"AccordionTable",props:{className:{type:{name:"string"},required:!1,description:""},columns:{type:{name:"array"},required:!0,description:""},data:{type:{name:"array"},required:!0,description:""}}};var x={parameters:{storySource:{source:`import React from "react";
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
;AccordionTable.__docgenInfo={"description":"","methods":[],"displayName":"AccordionTable"}`,locationsMap:{"accordion-table":{startLoc:{col:30,line:59},endLoc:{col:1,line:61},startBody:{col:30,line:59},endBody:{col:1,line:61}}}}},title:"Design/Accordion/Accordion Table",component:n};const w=[{Header:"Title",accessor:"title"},{Header:"Category",accessor:"category"},{Header:"Word Count",accessor:"wordCount"}],f=[{title:"Mission Statement",category:"Info",wordCount:235},{title:"About Our Team",category:"Info",wordCount:235},{title:"Chidi Anagonye Bio",category:"Staff Bios",wordCount:235},{title:"Mission Statement",category:"Staff Bios",wordCount:235},{title:"Education and Family",category:"Staff Bios",wordCount:235},{title:"Community Engagement and Empowerment Programs",category:"Family Services",wordCount:235,_expandableContent:"MIRA provides the resources and structure for Middle Eastern refugees to support one another and welcome new arrivals with what they need to succeed through support groups, community events, and bridge-building activities with the wider Chicago community. In FY18-19 189 MIRA Community Empowerment Clients participated in 645 Empowerment Activities."},{title:"Current Finances",category:"Finance",wordCount:102},{title:"Budget",category:"Finance",wordCount:34}],h=r=>e(n,{...r,columns:w,data:f});h.__docgenInfo={description:"",methods:[],displayName:"AccordionTable"};const H=["AccordionTable"];export{h as AccordionTable,H as __namedExportsOrder,x as default};
//# sourceMappingURL=AccordionTable.stories.4412d113.js.map
