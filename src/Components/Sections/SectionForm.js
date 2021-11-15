import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import ReactQuill from "react-quill";
import Label from "../design/Label/Label";
import "./SectionForm.css";
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import countWords from "../../Helpers/countWords";

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

      <div>
        <div class="SectionForm__ContentEditorHeader">
          <Label for="text-editor">Section Content</Label>
          <b>WORD COUNT: {wordCount}</b>
        </div>
        <RichTextEditor
          id="text-editor"
          className="SectionForm__ContentEditor"
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
      </div>

      <Form.Group>
        <Button
          className="SectionForm__PasteBoilerplateContent"
          onClick={() => setIsOpen(true)}
        >
          Paste Boilerplate Content
        </Button>
      </Form.Group>
      <div className="SectionForm__Actions">
        <Link>Store Section as Boilerplate</Link>
        <Button variant="outline-dark" size="lg" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="dark" size="lg" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
