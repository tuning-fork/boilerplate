import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "./SectionForm.css";

export default function SectionForm(props) {
  const [sectionFields, setSectionFields] = useState({
    title: "",
    text: "",
  });

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(sectionFields);
  };

  return (
    <Form className="SectionForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type="text"
          value={sectionFields.title}
          onChange={(event) =>
            setSectionFields({ ...sectionFields, title: event.target.value })
          }
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Section Content</Form.Label>
        <Button className="SectionForm__PasteBoilerplateContent">
          Paste Boilerplate Content
        </Button>
        <ReactQuill
          className="SectionForm__ContentEditor"
          value={sectionFields.text}
          onChange={(text) =>
            setSectionFields({
              ...sectionFields,
              text,
            })
          }
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
