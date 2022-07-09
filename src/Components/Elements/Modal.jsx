import React from "react";
import "./Modal.css";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal-popup">
      <div>{props.children}</div>
    </div>
  );
}
