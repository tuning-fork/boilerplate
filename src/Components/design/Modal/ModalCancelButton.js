import React from "react";
import Button from "../Button/Button";
import { MdCancel } from "react-icons/md";

export default function ModalCancelButton(props) {
  return (
    <div>
      <Button variant="modal-cancel-button" {...props}>
        <MdCancel />
      </Button>
    </div>
  );
}
