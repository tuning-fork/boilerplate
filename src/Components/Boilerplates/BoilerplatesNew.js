import React, { useState, useEffect } from "react";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createBoilerplate } from "../../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "../design/Container/Container";
import "./BoilerplatesNew.css";
import BoilerplateForm from "./BoilerplateForm";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import countWords from "../../Helpers/countWords";

export default function BoilerplatesNew() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getAllCategories(organizationClient)
      .then(setCategories)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [organizationClient]);

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.id}/grants`);
  };

  const handleSubmit = (boilerplateFields) => {
    console.log("boilerplateFields", boilerplateFields);
    createBoilerplate(organizationClient, {
      ...boilerplateFields,
      organizationId: currentOrganization.id,
      wordcount: countWords(boilerplateFields.text),
    })
      .then((boilerplate) => {
        history.push(
          `/organizations/${currentOrganization.id}/boilerplates/${boilerplate.id}`
        );
      })
      .catch((error) => {
        console.error("boilerplate creation error", error);
      });
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="boilerplates-new">
      <Container as="section" centered>
        <CurrentOrganizationLink
          className="boilerplates-new__back-button"
          to="/boilerplates"
        >
          <MdChevronLeft />
          Back to All Boilerplates
        </CurrentOrganizationLink>
        <h1 className="boilerplates-new__header">Add New Boilerplate</h1>
        <BoilerplateForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
