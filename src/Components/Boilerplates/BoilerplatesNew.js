import React from "react";
import { useQuery, useMutation } from "react-query";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "../design/Container/Container";
import "./BoilerplatesNew.css";
import BoilerplateForm from "./BoilerplateForm";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import countWords from "../../Helpers/countWords";

export default function BoilerplatesNew() {
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const {
    data: categories,
    isError,
    isLoading,
    error,
  } = useQuery("getCategories", () =>
    CategoriesService.getAllCategories(organizationClient)
  );

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.uuid}/boilerplates`);
  };

  const { mutate: createBoilerplate } = useMutation(
    (newBoilerplateFields) =>
      BoilerplatesService.createBoilerplate(organizationClient, {
        title: newBoilerplateFields.title,
        text: newBoilerplateFields.html,
        categoryUuid: newBoilerplateFields.categoryUuid,
        wordcount: countWords(newBoilerplateFields.text),
      }),
    {
      onSuccess: (createdBoilerplate) => {
        alert("Boilerplate created!");
        history.push(
          `/organizations/${currentOrganization.uuid}/boilerplates/${createdBoilerplate.uuid}`
        );
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
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
          onSubmit={createBoilerplate}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
