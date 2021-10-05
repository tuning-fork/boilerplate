import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "./SectionForm.css";
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";

export default function SectionForm(props) {
  const { onPasteBoilerplate, unsubscribeBoilerplate, setIsOpen, subscribers } =
    useContext(PasteBoilerplateContentPopoutContext);
  const [sectionFields, setSectionFields] = useState({
    title: "",
    html: "",
  });
  const quillEl = useRef(null);

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...sectionFields,
      text: quillEl.current.getEditor().getText(),
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
    <Form className="SectionForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={sectionFields.title}
          onChange={(event) => {
            const { value } = event.target;
            setSectionFields((previousSectionFields) => ({
              ...previousSectionFields,
              title: value,
            }));
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Section Content</Form.Label>
        <Button
          className="SectionForm__PasteBoilerplateContent"
          onClick={() => setIsOpen(true)}
        >
          Paste Boilerplate Content
        </Button>
        <ReactQuill
          className="SectionForm__ContentEditor"
          ref={quillEl}
          value={sectionFields.html}
          onChange={(html) => {
            setSectionFields((previousSectionFields) => ({
              ...previousSectionFields,
              html,
            }));
          }}
        />
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
    </Form>
  );
}
