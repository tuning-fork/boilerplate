import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import Button from "../design/Button/Button";
import ReactQuill from "react-quill";
import Label from "../design/Label/Label";
import "./SectionForm.css";
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import countWords from "../../Helpers/countWords";
import { MdContentPaste } from "react-icons/md";

export default function SectionForm(props) {
  const { onPasteBoilerplate, unsubscribeBoilerplate, setIsOpen, subscribers } =
    useContext(PasteBoilerplateContentPopoutContext);
  const [sectionFields, setSectionFields] = useState({
    title: "",
    text: "",
    html: "",
  });
  const quillEl = useRef(null);

  const wordCount = useMemo(() => {
    return countWords(sectionFields.text);
  }, [sectionFields.text]);

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...sectionFields,
    });
  };

  useEffect(() => {
    onPasteBoilerplate((boilerplateText) => {
      setSectionFields((previousSectionFields) => ({
        ...previousSectionFields,
        html: previousSectionFields.html + "\n" + boilerplateText,
      }));
    });

    return () => {
      unsubscribeBoilerplate();
    };
  }, [onPasteBoilerplate, unsubscribeBoilerplate, setSectionFields]);

  return (
    <form className="SectionForm" onSubmit={handleSubmit}>
      <TextBox
        value={sectionFields.title}
        onChange={(event) => {
          const { value } = event.target;
          setSectionFields((previousSectionFields) => ({
            ...previousSectionFields,
            title: value,
          }));
        }}
        required
        labelText="Section Title"
      />

      <div className="SectionForm__ContentEditor">
        <div class="SectionForm__ContentEditorHeader">
          <Label for="text-editor">Section Content</Label>
          <b>WORD COUNT: {wordCount}</b>
        </div>
        <RichTextEditor
          id="text-editor"
          className="SectionForm__ContentEditorInput"
          ref={quillEl}
          value={sectionFields.html}
          onChange={(html) => {
            setSectionFields((previousSectionFields) => ({
              ...previousSectionFields,
              text: quillEl.current.getEditor().getText(),
              html,
            }));
          }}
        />
        <Button
          className="SectionForm__PasteBoilerplateContent"
          onClick={() => setIsOpen(true)}
          variant="text"
        >
          <MdContentPaste />
          Paste Boilerplate Content
        </Button>
      </div>
      <div className="SectionForm__Actions">
        <div>
          <Button variant="outlined">Store Section as Boilerplate</Button>
        </div>
        <div className="SectionForm__FormControls">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
