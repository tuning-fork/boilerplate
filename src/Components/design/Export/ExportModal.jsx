import React, { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mantine/core";
import Modal from "../Modal/Modal";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { saveAs } from "file-saver";
import "./ExportModal.css";
import { generateWord } from "./Export.util";

export default function ExportModal({ exportData, open, setOpen }) {
  const quillEl = useRef(null);
  const [includeTitle, setIncludeTitle] = useState();
  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section

  const newExport = async () => {
    const quillDelta = quillEl.current.getEditor().getContents();
    const doc = await generateWord(quillDelta, { exportAs: "blob" });
    saveAs(doc, `example.docx`);
  };

  const exportText = useMemo(() => {
    // TODO: make this generic and also add a flag to access title or some other property
    const newText = [];
    exportData.forEach((item) => {
      includeTitle && newText.push(item.title);
      newText.push(item.text);
    });
    return newText.join("</br></br>");
  }, [includeTitle, exportData]);

  return (
    <Modal
      show={open}
      heading="Export Draft Preview"
      includeTitle={includeTitle}
      setIncludeTitle={setIncludeTitle}
    >
      <div>
        This pane displays a preview of all sections in the grant draft. Click
        the 'Export' button to export the draft in docx format.
      </div>
      <RichTextEditor
        id="export-text-editor"
        className="export-editor"
        ref={quillEl}
        readOnly={true}
        value={exportText}
      />
      <div className="export-editor-buttons">
        <Button onClick={() => setIncludeTitle(!includeTitle)}>
          {includeTitle ? "Exclude Title" : "Include Title"}
        </Button>
        <div>
          <Button
            onClick={() => setOpen(!open)}
            className="export-close-button"
          >
            Close
          </Button>
          <Button onClick={newExport}>Export As Docx</Button>
        </div>
      </div>
    </Modal>
  );
}

ExportModal.propTypes = {
  exportData: PropTypes.array,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.bool.isRequired,
};

ExportModal.defaultProps = {
  exportData: [],
};
