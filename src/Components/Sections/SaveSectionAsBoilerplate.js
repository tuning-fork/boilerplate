import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { countWords } from "../../Services/infofunctions";
import { createBoilerplate } from "../../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";

export default function SaveSectionAsBoilerplate(props) {
  const quillEl = useRef(null);
  const [categories, setCategories] = useState([]);
  const [newBoilerplateFields, setNewBoilerplateFields] = useState({
    title: props.section.title,
    text: props.section.text,
    category_id: "",
    wordcount: "",
  });
  const { organizationClient } = useCurrentOrganizationContext();
  const handleChangeField = (field) => (event) => {
    event.preventDefault();

    const newValue = event.target.value;

    setNewBoilerplateFields((fields) => ({
      ...fields,
      [field]: newValue,
    }));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    props.onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBoilerplate(organizationClient, {
      ...newBoilerplateFields,
      wordcount: countWords(quillEl.current.getEditor().getText()),
    })
      .then((boilerplate) => {
        if (boilerplate) {
          alert("Section saved as boilerplate!");
          props.onClose();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Oh no! Something went wrong when you were trying to save the section as boilerplate."
        );
      });
  };

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getAllCategories(organizationClient).then((categories) => {
      setCategories(categories);
    });
  }, [organizationClient]);

  return (
    <Form className="SectionForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category_id"
          value={newBoilerplateFields.category_id}
          onChange={handleChangeField("category_id")}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => {
            return (
              <option
                key={category.id}
                value={category.id}
                onChange={(event) => {
                  setNewBoilerplateFields({
                    ...newBoilerplateFields,
                    category_id: event.target.value,
                  });
                }}
              >
                {category.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Boilerplate Title</Form.Label>
        <Form.Control
          type="text"
          value={newBoilerplateFields.title}
          onChange={(event) => {
            setNewBoilerplateFields({
              ...newBoilerplateFields,
              title: event.target.value,
            });
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Boilerplate Text</Form.Label>
        <ReactQuill
          className="SectionForm__ContentEditor"
          ref={quillEl}
          value={newBoilerplateFields.text}
          onChange={(html) => {
            setNewBoilerplateFields({
              ...newBoilerplateFields,
              text: html,
            });
          }}
        />
      </Form.Group>
      <div className="SectionForm__Actions">
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
