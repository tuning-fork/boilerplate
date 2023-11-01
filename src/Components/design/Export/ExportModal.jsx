import React, { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mantine/core";
import Modal from "../Modal/Modal";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import * as quillToWord from "quill-to-word";
import { saveAs } from "file-saver";
import "./ExportModal.css";

export default function ExportModal({ exportData, open, setOpen }) {
  const quillEl = useRef(null);
  const [includeTitle, setIncludeTitle] = useState(false);

  const handleDocxExport = async () => {
    // const quillDelta = quillEl.current.getEditor().getContents();
    console.log(quillEl.current.getEditor().getContents());
    const quillDelta = quillEl.current.getEditor().getContents();
    const blob = await quillToWord.generateWord(quillDelta, {
      exportAs: "blob",
    });
    saveAs(blob, "word-export.docx");
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
          <Button onClick={handleDocxExport}>Export As Docx</Button>
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
