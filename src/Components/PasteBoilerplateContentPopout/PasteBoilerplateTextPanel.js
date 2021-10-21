import React, { useContext, useState } from "react";
import Button from "../design/Button/Button";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopoutContext";
import CheckCircle from "@material-ui/icons/CheckCircle";
import "./PasteBoilerplateTextPanel.css";

export default function PasteBoilerplateTextPanel(props) {
  const { boilerplate } = props;
  const { pasteBoilerplate } = useContext(PasteBoilerplateContentPopoutContext);
  const [wasPasted, setWasPasted] = useState(false);

  const handleClickPasteBoilerplate = () => {
    pasteBoilerplate(boilerplate.text);
    setWasPasted(true);
  };

  return (
    <div className="paste-boilerplate-text-panel">
      <div dangerouslySetInnerHTML={{ __html: boilerplate.text }} />
      <div className="paste-boilerplate-text-panel__bottom">
        {wasPasted ? <CheckCircle /> : null}
        <Button onClick={handleClickPasteBoilerplate}>
          {" "}
          Paste Boilerplate
        </Button>
      </div>
    </div>
  );
}
