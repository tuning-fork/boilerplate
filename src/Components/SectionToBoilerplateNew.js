import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createBoilerplate } from "../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../Services/Organizations/CategoriesService";
import countWords from "../Helpers/countWords";

export default function SectionToBoilerplateNew(props) {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
        })
        .catch((error) => console.error(error));
    }
  }, [currentOrganizationId, organizationClient]);

  // const updateCategories = (newCategory) => {
  //   const categoriesArray = [...categories, newCategory];
  //   setCategories(categoriesArray);
  // };

  // const clearForm = () => {
  //   setQuillText("");
  //   setTitle("");
  //   setText("");
  //   setOrganizationId("");
  //   setCategoryId("");
  //   setWordcount("");
  // };

  // const toggleHiddenCategoriesOrganizationsNew = () => {
  //   setIsHiddenCategoriesOrganizationsNew(!isHiddenCategoriesOrganizationsNew);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBoilerplate = {
      title: props.title,
      text: props.text,
      organization_id: props.organization_id,
      category_id: categoryId,
      wordcount: countWords(props.text),
    };
    createBoilerplate(organizationClient, newBoilerplate)
      .then((boilerplate) => {
        if (boilerplate) {
          props.toggleBoilerplateHidden();
        }
      })
      .catch((error) => {
        console.error("boilerplate creation error", error);
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
            </Form.Group>
            <p>{props.title}</p>
            <p dangerouslySetInnerHTML={{ __html: props.text }}></p>
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{countWords(props.text)}</p>
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
