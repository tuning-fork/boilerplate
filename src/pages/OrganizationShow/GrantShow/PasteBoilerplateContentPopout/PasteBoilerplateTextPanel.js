import React, { useContext, useState } from "react";
import Button from "components/design/Button/Button";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopoutContext";
import { MdCheckCircle } from "react-icons/md";
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
        {wasPasted ? <MdCheckCircle /> : null}
        <Button onClick={handleClickPasteBoilerplate}>
          {" "}
          Paste Boilerplate
        </Button>
      </div>
    </div>
  );
}
