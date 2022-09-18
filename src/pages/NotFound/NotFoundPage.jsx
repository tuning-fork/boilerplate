import React from "react";
import "./NotFoundPage.css";
import { ReactComponent as AlignmentIcon } from "./alignment_icon.svg";
import Button from "../../Components/design/Button/Button";
import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
  const history = useHistory();

  return (
    <div className="not-found-page">
      <div className="not-found-header">
        <div className="not-found-header-text">404</div>
        <AlignmentIcon />
      </div>
      <div className="not-found-message-text">
        You seem to be lost! Let's get you back home.
      </div>
      <Button
        color="secondary"
        variant="text"
        className="not-found-back-button"
        onClick={() => history.goBack()}
      >
        Go Back
      </Button>
    </div>
  );
}
