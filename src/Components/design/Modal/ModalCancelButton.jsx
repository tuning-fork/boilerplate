import React from "react";
import Button from "../Button/Button";
import { MdCancel } from "react-icons/md";
import "./ModalCancelButton.css";

export default function ModalCancelButton(props) {
  return (
    <div>
      <Button variant="modal-cancel-button" {...props} onClick={props.hide}>
        <MdCancel />
      </Button>
    </div>
  );
}
