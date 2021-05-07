import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import CategoriesNew from "./CategoriesNew";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createBio } from "../../Services/Organizations/BioService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";

export default function BoilerplatesNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [categories, setCategories] = useState([]);
  const [isHiddenCategoriesNew, setIsHiddenCategoriesNew] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationService,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getAllCategories(organizationService)
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
          console.log(categories);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const updateCategories = (newCategory) => {
    const newCategories = [...categories];
    newCategories.push(newCategory);
    setCategories(categories);
  };

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setOrganizationId("");
    setCategoryId("");
    setWordcount("");
  };

  const toggleHiddenCategoriesNew = () => {
    setIsHiddenCategoriesNew(!isHiddenCategoriesNew);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentOrganizationId) {
      createBoilerplate(organizationService, {
          title: title,
          text: quillText,
          organization_id: currentOrganizationId,
          category_id: categoryId,
          wordcount: countWords(quillText),
        })
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
      {!isHiddenCategoriesNew ? (
        <CategoriesNew
          categories={categories}
          updateCategories={updateCategories}
          toggleHiddenCategoriesNew={toggleHiddenCategoriesNew}
        />
      ) : null}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
              modules={modules}
              format={formats}
              value={quillText}
              onChange={(value) => setQuillText(value)}
            />
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{countWords(quillText)}</p>
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
                {categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
              {isHiddenCategoriesNew ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={toggleHiddenCategoriesNew}
                >
                  Add New Category
                </Button>
              ) : (
                <Button
                  variant="warning"
                  size="sm"
                  onClick={toggleHiddenCategoriesNew}
                >
                  Close Category
                </Button>
              )}
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
