import React from "react";
import Button from "../Button/Button";
import { MdCancel } from "react-icons/md";
import "./PanelCancelButton.css";

export default function PanelCancelButton(props) {
  return (
    <div>
      <Button variant="modal-cancel-button" onClick={props.hide}>
        <MdCancel />
      </Button>
    </div>
  );
}
