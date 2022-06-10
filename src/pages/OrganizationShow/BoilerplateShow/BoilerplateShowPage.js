import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Container from "components/design/Container/Container";
import BoilerplateHero from "components/design/Hero/BoilerplateHero";
import BoilerplateForm from "components/forms/BoilerplateForm/BoilerplateForm";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import * as BoilerplatesService from "services/p0/Organizations/BoilerplatesService";
import countWords from "lib/countWords";
import "./BoilerplateShowPage.css";

export default function BoilerplateShowPage() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { boilerplate_id: boilerplateId } = useParams();
  const {
    data: boilerplate,
    isError,
    isLoading,
    error,
  } = useQuery("getBoilerplate", () =>
    BoilerplatesService.getBoilerplate(organizationClient, boilerplateId)
  );
  const [editingBoilerplate, setEditingBoilerplate] = useState(false);

  const { mutate: updateBoilerplate } = useMutation(
    (newBoilerplateFields) =>
      BoilerplatesService.updateBoilerplate(
        organizationClient,
        newBoilerplateFields.id,
        newBoilerplateFields
      ),
    {
      onSuccess: () => {
        alert("Boilerplate edited!");
        setEditingBoilerplate(false);
      },
    }
  );

  const handleEditBoilerplate = (newBoilerplateFields) => {
    updateBoilerplate({
      ...newBoilerplateFields,
      text: newBoilerplateFields.html,
      wordcount: countWords(newBoilerplateFields.text),
    });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="boilerplates-show">
      <div className="boilerplates-show__content">
        <BoilerplateHero
          headerText={boilerplate.title}
          wordcount={boilerplate.wordcount}
          categoryText={boilerplate.categoryName}
          breadCrumbLink={`/organizations/${currentOrganization.id}/boilerplates/`}
          editLink={`/boilerplates/${boilerplate.id}/edit/`}
          // copyLink={`/boilerplates/${boilerplate.id}/copy/`}
          setIsOpen={setEditingBoilerplate}
        />
        <Container className="boilerplates-show__text-container" centered>
          {editingBoilerplate ? (
            <BoilerplateForm
              onSubmit={handleEditBoilerplate}
              onCancel={() => setEditingBoilerplate(false)}
              boilerplate={boilerplate}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: boilerplate.text }}></div>
          )}
        </Container>
      </div>
    </div>
  );
}