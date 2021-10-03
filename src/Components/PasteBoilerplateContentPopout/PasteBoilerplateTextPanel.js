import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../design/Button/Button";

export default function PasteBoilerplateTextPanel(props) {
  const { data, row, handleClickPasteBoilerplate } = props;
  console.log(data);

  return (
    <div>
      {/* {row._expandableContent || "hi"} */}
      {row.text || "hi"}
      <Button onClick={() => handleClickPasteBoilerplate(row)}>
        {" "}
        Paste Boilerplate
      </Button>
    </div>
  );
}
