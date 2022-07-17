import{r as h}from"./index.9b1aa413.js";import{r as m}from"./index.120cef2a.js";import{P as n}from"./index.0b0c857d.js";import{c as r}from"./clsx.m.c5ef2623.js";import{B as t}from"./Button.bc43666e.js";import{d as u}from"./index.esm.6fd964df.js";import{j as e,a as l,F as s}from"./jsx-runtime.0ecfbf7b.js";import"./iconBase.c4e65c7e.js";function i(o){return e("div",{children:e(t,{variant:"modal-cancel-button",...o,onClick:o.hide,children:e(u,{})})})}i.__docgenInfo={description:"",methods:[],displayName:"ModalCancelButton"};function a(o){return o.show?m.exports.createPortal(l(s,{children:[l("dialog",{className:r(o.className,"modal"),"aria-labelledby":"modal-heading","aria-modal":!0,open:!0,children:[o.hide&&e("div",{className:"modal-cancel-button",children:e(i,{hide:o.hide})}),e("div",{className:o.splashpageForm?"modal-header__splashpageForm":"modal-header",children:e("h1",{id:"modal-heading",className:r(o.headingClassName,"modal__heading"),children:o.heading})}),o.children]}),e("div",{className:"modal-overlay"})]}),document.body):null}a.propTypes={show:n.bool,heading:n.string.isRequired,headingClassName:n.string,className:n.string,splashpageForm:n.bool};a.defaultProps={show:!1};var x={parameters:{storySource:{source:`import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../Button/Button";

export default {
  title: "Design/Modal",
  component: Modal,
  argTypes: {
    heading: {
      defaultValue: "Hello!",
      control: {
        type: "text",
      },
    },
    headingClassName: {
      control: {
        type: "text",
      },
    },
    show: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
};

export const ModalRegular = (props) => (
  <Modal {...props}>
    <p>Welcome to the Modal! Enjoy your stay</p>
  </Modal>
);

export const ModalShowing = (props) => {
  const [showingModal, setShowingModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowingModal(true)}>Open Modal</Button>
      <Modal heading="Hello!" show={showingModal} {...props}>
        <p>Welcome to the Modal! Enjoy your stay</p>
        <Button onClick={() => setShowingModal(false)}>Close</Button>
      </Modal>
    </>
  );
};
;ModalRegular.__docgenInfo={"description":"","methods":[],"displayName":"ModalRegular"};ModalShowing.__docgenInfo={"description":"","methods":[],"displayName":"ModalShowing"}`,locationsMap:{"modal-regular":{startLoc:{col:28,line:29},endLoc:{col:1,line:33},startBody:{col:28,line:29},endBody:{col:1,line:33}},"modal-showing":{startLoc:{col:28,line:35},endLoc:{col:1,line:47},startBody:{col:28,line:35},endBody:{col:1,line:47}}}}},title:"Design/Modal",component:a,argTypes:{heading:{defaultValue:"Hello!",control:{type:"text"}},headingClassName:{control:{type:"text"}},show:{defaultValue:!0,control:{type:"boolean"}}}};const p=o=>e(a,{...o,children:e("p",{children:"Welcome to the Modal! Enjoy your stay"})}),g=o=>{const[c,d]=h.exports.useState(!1);return l(s,{children:[e(t,{onClick:()=>d(!0),children:"Open Modal"}),l(a,{heading:"Hello!",show:c,...o,children:[e("p",{children:"Welcome to the Modal! Enjoy your stay"}),e(t,{onClick:()=>d(!1),children:"Close"})]})]})};p.__docgenInfo={description:"",methods:[],displayName:"ModalRegular"};g.__docgenInfo={description:"",methods:[],displayName:"ModalShowing"};const S=["ModalRegular","ModalShowing"];export{p as ModalRegular,g as ModalShowing,S as __namedExportsOrder,x as default};
//# sourceMappingURL=Modal.stories.58e89bbe.js.map
