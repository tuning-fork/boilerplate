import React, { useState } from "react";
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
