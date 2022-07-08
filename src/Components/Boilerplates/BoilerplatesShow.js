import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Container from "../design/Container/Container";
import BoilerplateHero from "../design/Hero/BoilerplateHero";
import BoilerplateForm from "./BoilerplateForm";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import countWords from "../../Helpers/countWords";
import "./BoilerplatesShow.css";

export default function BoilerplatesShow() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { boilerplateUuid } = useParams();
  const {
    data: boilerplate,
    isError,
    isLoading,
    error,
  } = useQuery("getBoilerplate", () =>
    BoilerplatesService.getBoilerplate(organizationClient, boilerplateUuid)
  );
  const [editingBoilerplate, setEditingBoilerplate] = useState(false);

  const { mutate: updateBoilerplate } = useMutation(
    (newBoilerplateFields) =>
      BoilerplatesService.updateBoilerplate(
        organizationClient,
        newBoilerplateFields.uuid,
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
          breadCrumbLink={`/organizations/${currentOrganization.uuid}/boilerplates/`}
          editLink={`/boilerplates/${boilerplate.uuid}/edit/`}
          // copyLink={`/boilerplates/${boilerplate.uuid}/copy/`}
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
