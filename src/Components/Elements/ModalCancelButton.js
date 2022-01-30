import React from "react";
import Button from "../design/Button/Button";
import { MdCancel } from "react-icons/md";

export default function ModalCancelButton(props) {
  return (
    <div className="modal-cancel-button">
      <Button variant="text" {...props}>
        <MdCancel />
      </Button>
    </div>
  );
}
