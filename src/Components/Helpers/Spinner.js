import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <svg className="spinner" viewBox="0 0 50 50" aria-hidden="true">
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  );
}
