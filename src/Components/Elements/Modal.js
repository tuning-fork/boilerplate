import React, { Component, useState, useEffect } from "react";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <div>{props.children}</div>
      <div>
        <button
          onClick={() => {
            props.onClose && props.onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
