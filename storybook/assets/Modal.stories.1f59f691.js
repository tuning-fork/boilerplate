import{j as e,a as l,F as r,r as h}from"./jsx-runtime.216c1028.js";import{r as m}from"./index.f218e96b.js";import{p as n}from"./index.9ab846ab.js";import{c as s}from"./clsx.m.c5ef2623.js";import{B as t}from"./Button.f16911d3.js";import{d as p}from"./index.esm.781c4d94.js";import"./iframe.89f75709.js";import"./iconBase.f6b91f99.js";function i(o){return e("div",{children:e(t,{variant:"modal-cancel-button",...o,onClick:o.hide,children:e(p,{})})})}i.__docgenInfo={description:"",methods:[],displayName:"ModalCancelButton"};function a(o){return o.show?m.exports.createPortal(l(r,{children:[l("dialog",{className:s(o.className,"modal"),"aria-labelledby":"modal-heading","aria-modal":!0,open:!0,children:[o.hide&&e("div",{className:"modal-cancel-button",children:e(i,{hide:o.hide})}),e("div",{className:o.splashpageForm?"modal-header__splashpageForm":"modal-header",children:e("h1",{id:"modal-heading",className:s(o.headingClassName,"modal__heading"),children:o.heading})}),o.children]}),e("div",{className:"modal-overlay"})]}),document.body):null}a.propTypes={show:n.exports.bool,heading:n.exports.string.isRequired,headingClassName:n.exports.string,className:n.exports.string,splashpageForm:n.exports.bool};a.defaultProps={show:!1};const C={parameters:{storySource:{source:`import React, { useState } from "react";
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
;ModalRegular.__docgenInfo={"description":"","methods":[],"displayName":"ModalRegular"};ModalShowing.__docgenInfo={"description":"","methods":[],"displayName":"ModalShowing"}`,locationsMap:{"modal-regular":{startLoc:{col:28,line:29},endLoc:{col:1,line:33},startBody:{col:28,line:29},endBody:{col:1,line:33}},"modal-showing":{startLoc:{col:28,line:35},endLoc:{col:1,line:47},startBody:{col:28,line:35},endBody:{col:1,line:47}}}}},title:"Design/Modal",component:a,argTypes:{heading:{defaultValue:"Hello!",control:{type:"text"}},headingClassName:{control:{type:"text"}},show:{defaultValue:!0,control:{type:"boolean"}}}},u=o=>e(a,{...o,children:e("p",{children:"Welcome to the Modal! Enjoy your stay"})}),g=o=>{const[c,d]=h.exports.useState(!1);return l(r,{children:[e(t,{onClick:()=>d(!0),children:"Open Modal"}),l(a,{heading:"Hello!",show:c,...o,children:[e("p",{children:"Welcome to the Modal! Enjoy your stay"}),e(t,{onClick:()=>d(!1),children:"Close"})]})]})};u.__docgenInfo={description:"",methods:[],displayName:"ModalRegular"};g.__docgenInfo={description:"",methods:[],displayName:"ModalShowing"};const S=["ModalRegular","ModalShowing"];export{u as ModalRegular,g as ModalShowing,S as __namedExportsOrder,C as default};
//# sourceMappingURL=Modal.stories.1f59f691.js.map
