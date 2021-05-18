import React from "react";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal-popup">
      <div>
        <button
          onClick={() => {
            props.onClose && props.onClose();
          }}
        >
          Close
        </button>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
