import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../Button/Button";
import "../theme.css";

export default {
  title: "Design/Modal",
  component: Modal,
  argTypes: {
    heading: {
      defaultValue: "Hello!",
    },
    show: {
      defaultValue: true,
    },
  },
};

export const ModalRegular = (props) => (
  <Modal {...props}>
    <p>Welcome to the Modal! Enjoy your stay</p>
  </Modal>
);

export const ModalShowing = () => {
  const [showingModal, setShowingModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowingModal(true)}>Open Modal</Button>
      <Modal heading="Hello!" show={showingModal}>
        <p>Welcome to the Modal! Enjoy your stay</p>
        <Button onClick={() => setShowingModal(false)}>Close</Button>
      </Modal>
    </>
  );
};
