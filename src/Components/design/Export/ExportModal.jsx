/* eslint-disable no-unused-vars */
import React, { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "@mantine/core";
import Modal from "../Modal/Modal";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
// import * as quillToWord from "quill-to-word";
import { saveAs } from "file-saver";
import "./ExportModal.css";
import {
  Document,
  Packer,
  Paragraph,
  Tab,
  TextRun,
  patchDocument,
  PatchType,
} from "docx";
import * as fs from "fs";

export default function ExportModal({ exportData, open, setOpen }) {
  const quillEl = useRef(null);
  const [includeTitle, setIncludeTitle] = useState(false);

  const handleDocxExport = async () => {
    // const quillDelta = quillEl.current.getEditor().getContents();
    console.log(quillEl.current.getEditor().getContents());
    console.log(quillEl.current.getEditor());
    const quillDelta = quillEl.current.getEditor().getContents();
    console.log("quillDelta", quillDelta);
    console.log(quillDelta.ops[0].insert);
    console.log(
      quillDelta.ops.map((op) => {
        return [op.insert, op.attributes];
      })
    );
    console.log(quillDelta.ops.map((op) => op.attributes));
    const quillDeltas = quillDelta.ops.map(
      (op) =>
        new TextRun({
          children: [op.insert],
          ...op.attributes,
        })
    );

    // const blob = quillDelta.ops[0].insert;
    // // const blob = await quillToWord.generateWord(quillDelta, {
    // //   exportAs: "blob",
    // //   // paragraphStyles: {},
    // //   // customLevels: {},
    // //   // customBulletLevels: {},
    // // });
    // // console.log(blob);
    // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
    // This simple example will only contain one section
    console.log("split", quillDelta.ops[0].insert.split("\n"));
    // const paragraphChildren = quillDelta.ops.map((op, index) => {
    //     new TextRun({
    //       children: [new Tab(), quillDelta.ops[index].insert],
    //     });
    // })
    // ]
    const doc = new Document({
      // type: PatchType.DOCUMENT,
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: quillDeltas,
              // new TextRun(quillDelta.ops[0].insert.split("\n")),
              // new TextRun({
              //   text: "Foo Bar",
              //   bold: true,
              //   size: 40,
              // }),
              // new TextRun({
              //   children: [new Tab(), quillDelta.ops[0].insert],
              // }),
            }),
          ],
        },
      ],
    });
    console.log("doc", doc);
    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((buffer) => {
      saveAs(buffer, `word-export-${new Date().getTime()}.docx`);
      // fs.writeFileSync("My Document.docx", buffer);
    });

    // saveAs(blob, `word-export-${new Date().getTime()}.docx`);
  };

  //   const styles = {
  //     paragraphStyles: {
  //         normal?: {  // this is the name of the text type that you'd like to style
  //             paragraph?: {
  //                 spacing?: {
  //                     line?: number;
  //                     before?: number;
  //                     after?: number;
  //                 },
  //                 alignment?: AlignmentType // from docx package
  //                 indent?: {
  //                     left?: number;
  //                     hanging?: number;
  //                     right?: number;
  //                 }
  //             },
  //             run?: {
  //                 font?: string;
  //                 size?: number;
  //                 bold?: boolean;
  //                 color?: string; // as hex value e.g., ffaaff
  //                 underline?: {
  //                     type?: UnderlineType; // from docx package
  //                     color?: string // just use 'auto'
  //                 }
  //                 italics?: boolean;
  //                 highlight?: string; // must be named values accepted by Word, like 'yellow'
  //             }
  //         }
  //     }
  // }

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
