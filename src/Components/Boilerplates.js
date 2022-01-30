import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
import BoilerplatesTable from "./Boilerplates/BoilerplatesTable";
import unique from "../Helpers/unique";

const NO_SELECTED_CATEGORY = "none";

export default function Boilerplates() {
  const [loading, setLoading] = useState(true);
  const [boilerplates, setBoilerplates] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(NO_SELECTED_CATEGORY);
  const [selectedMaxWordCount, setSelectedMaxWordCount] = useState("");
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleChangeSelectedCategory = (event) =>
    setSelectedCategory(event.target.value);
  const handleChangeSelectedMaxWordCount = (event) =>
    setSelectedMaxWordCount(event.target.value);

  const markedBoilerplates = boilerplates.map((boilerplate) => {
    const maxWordCount = Number.parseInt(selectedMaxWordCount);
    const markedOnCategory =
      boilerplate.categoryName.includes(selectedCategory) &&
      selectedCategory !== NO_SELECTED_CATEGORY;
    const markedOnMaxWordCount =
      boilerplate.wordcount <= maxWordCount && Number.isFinite(maxWordCount);

    return { ...boilerplate, markedOnCategory, markedOnMaxWordCount };
  });

  useEffect(() => {
    if (currentOrganization.id) {
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
          setLoading(false);
          console.log(boilerplates);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [organizationClient, currentOrganization.id]);

  if (loading) {
    return <h1 className="container">Loading....</h1>;
  }

  const categories = unique(
    boilerplates.map((boilerplate) => boilerplate.categoryName).sort()
  );

  return (
    <div className="container">
      <h1>Boilerplates</h1>

      <Link to={`/organizations/${currentOrganization.id}/boilerplates-new/`}>
        <Button>Add Boilerplate</Button>
      </Link>

      <Form>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleChangeSelectedCategory}
          >
            <option value={NO_SELECTED_CATEGORY}>Select Category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Max Word Count</Form.Label>
          <Form.Control
            type="text"
            placeholder="10"
            value={selectedMaxWordCount}
            onChange={handleChangeSelectedMaxWordCount}
          />
        </Form.Group>
      </Form>

      <BoilerplatesTable boilerplates={markedBoilerplates} />
    </div>
  );
}
