import React from "react";
import { useQuery, useMutation } from "react-query";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import * as BoilerplatesService from "services/p0/Organizations/BoilerplatesService";
import * as CategoriesService from "services/p0/Organizations/CategoriesService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "components/design/Container/Container";
import BoilerplateForm from "components/forms/BoilerplateForm/BoilerplateForm";
import CurrentOrganizationLink from "components/CurrentOrganizationLink";
import countWords from "lib/countWords";
import "./BoilerplatesNewPage.css";

export default function BoilerplatesNewPage() {
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
    history.push(`/organizations/${currentOrganization.id}/boilerplates`);
  };

  const { mutate: createBoilerplate } = useMutation(
    (boilerplateFields) =>
      BoilerplatesService.createBoilerplate(
        organizationClient,
        boilerplateFields
      ),
    {
      onSuccess: () => {
        alert("Boilerplate created!");
      },
    }
  );

  function handleCreateBoilerplate(newBoilerplateFields) {
    createBoilerplate({
      title: newBoilerplateFields.title,
      text: newBoilerplateFields.html,
      categoryId: newBoilerplateFields.categoryId,
      wordcount: countWords(newBoilerplateFields.text),
    });
  }

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
          onSubmit={handleCreateBoilerplate}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
