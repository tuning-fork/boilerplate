import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import { countWords } from "../../Services/infofunctions";
import { createBoilerplate } from "../../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";

export default function SaveSectionAsBoilerplate(props) {
  const quillEl = useRef(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const currentOrganizationId = currentOrganizationStore.currentOrganization?.id;

  const [newBoilerplateFields, setNewBoilerplateFields] = useState({
    title: props.section.title,
    text: props.section.text,
    category_id: "",
    wordcount: "",
  });
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
  const history = useHistory();

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
    props.onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBoilerplate(organizationClient, newBoilerplateFields)
      .then((boilerplate) => {
        if (boilerplate) {
          alert("Section saved as boilerplate!");
          // handle close save as boilerplate modal
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
  ];

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
          onChange={(event) => {
            setNewBoilerplateFields({
              ...newBoilerplateFields,
              text: event.target.value,
              wordcount: countWords(event.target.value),
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
