import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "./SectionForm.css";
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";

export default function SectionForm(props) {
  const { onPasteBoilerplate } = useContext(
    PasteBoilerplateContentPopoutContext
  );
  const { unsubscribeBoilerplate } = useContext(
    PasteBoilerplateContentPopoutContext
  );
  const [sectionFields, setSectionFields] = useState({
    title: "",
    html: "",
  });
  const quillEl = useRef(null);

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    unsubscribeBoilerplate();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      ...sectionFields,
      text: quillEl.current.getEditor().getText(),
    });
    unsubscribeBoilerplate();
  };

  const openPasteBoilerplate = (event) => {};

  useEffect(() => {
    onPasteBoilerplate((boilerplate) => {
      console.log(boilerplate);
      // setSectionFields({
      //   ...sectionFields,
      //   text: sectionFields.text + boilerplate,
      // });
    });
  }, [onPasteBoilerplate]);

  return (
    <Form className="SectionForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={sectionFields.title}
          onChange={(event) => {
            setSectionFields({
              ...sectionFields,
              title: event.target.value,
            });
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Section Content</Form.Label>
        <Button
          className="SectionForm__PasteBoilerplateContent"
          // onClick={openPasteBoilerplate}
        >
          Paste Boilerplate Content
        </Button>
        <ReactQuill
          className="SectionForm__ContentEditor"
          ref={quillEl}
          value={sectionFields.html}
          onChange={(html) => {
            setSectionFields({
              ...sectionFields,
              html,
            });
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
