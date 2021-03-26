import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import CategoriesOrganizationsNew from "./CategoriesOrganizationsNew";
import "react-quill/dist/quill.snow.css";

export default function BoilerplatesNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [categories, setCategories] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [
    isHiddenCategoriesOrganizationsNew,
    setIsHiddenCategoriesOrganizationsNew,
  ] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateCategories = (newCategory) => {
    const newCategories = categories;
    newCategories.push(newCategory);
    setCategories(categories);
  };

  const updateOrganizations = (newOrganization) => {
    const newOrganizations = organizations;
    organizations.push(newOrganization);
    setOrganizations(organizations);
  };

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setOrganizationId("");
    setCategoryId("");
    setWordcount("");
  };

  const toggleHiddenCategoriesOrganizationsNew = () => {
    setIsHiddenCategoriesOrganizationsNew(!isHiddenCategoriesOrganizationsNew);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/boilerplates",
        {
          title: title,
          text: quillText,
          organization_id: organizationId,
          category_id: categoryId,
          wordcount: countWords(quillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateBoilerplates(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("boilerplate creation error", error);
      });
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

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
    <div className="container">
      {!isHiddenCategoriesOrganizationsNew ? (
        <CategoriesOrganizationsNew
          categories={categories}
          organizations={organizations}
          updateCategories={updateCategories}
          updateOrganizations={updateOrganizations}
          toggleHiddenCategoriesOrganizationsNew={
            toggleHiddenCategoriesOrganizationsNew
          }
        />
      ) : null}
      <Card>
        <Card.Header>
          <h3>Add Boilerplate</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control
                as="select"
                name="organizationId"
                value={organizationId}
                onChange={(event) => setOrganizationId(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select Organization
                </option>
                {organizations.map((organization) => {
                  return (
                    <option
                      key={organization.id}
                      value={organization.id}
                      onChange={(event) =>
                        setOrganizationId(event.target.value)
                      }
                    >
                      {organization.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {/* {categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      {category.name}
                    </option>
                  );
                })} */}
              </Form.Control>
              {isHiddenCategoriesOrganizationsNew ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={toggleHiddenCategoriesOrganizationsNew}
                >
                  Add New Category and/or Organization
                </Button>
              ) : (
                <Button
                  variant="warning"
                  size="sm"
                  onClick={toggleHiddenCategoriesOrganizationsNew}
                >
                  Close Category and/or Organization
                </Button>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Label>Boilerplate Text</Form.Label>
            <ReactQuill
              // name="quill_text"
              modules={modules}
              format={formats}
              value={quillText}
              onChange={(value) => setQuillText(value)}
            />
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{countWords(quillText)}</p>
            </Form.Group>

            <div className="text-center">
              <Button type="submit">Add New Boilerplate</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
