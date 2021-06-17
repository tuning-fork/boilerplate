import React from "react";
import Modal from "./Modal";
import "../theme.css";

export default {
  title: "Design/Modal",
  component: Modal,
  argTypes: {
    show: {
      defaultValue: true,
    },
  },
};

export const ModalRegular = (props) => (
  <Modal {...props}>
    <h1>Hello!</h1>
    <p>Welcome to the Modal! Enjoy your stay</p>
  </Modal>
);
