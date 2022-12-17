import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Container from "../design/Container/Container";
import BoilerplateHero from "../design/Hero/BoilerplateHero";
import BoilerplateForm from "./BoilerplateForm";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import countWords from "../../Helpers/countWords";
import { useHistory } from "react-router-dom";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";

import "./BoilerplatesShow.css";

export default function BoilerplatesShow() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { boilerplateId } = useParams();
  const history = useHistory();
  const buildOrganizationsLink = useBuildOrganizationsLink();

  const {
    data: boilerplate,
    isError,
    isLoading,
    error,
  } = useQuery("getBoilerplate", () =>
    BoilerplatesService.getBoilerplate(organizationClient, boilerplateId)
  );
  const [editingBoilerplate, setEditingBoilerplate] = useState(false);
  const [deletedBoilerplate, setDeletedBoilerplate] = useState(false);

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

  const handleDeleteBoilerplate = (organizationClient, boilerplateId) => {
    BoilerplatesService.deleteBoilerplate(organizationClient, boilerplateId);
    setDeletedBoilerplate(true);
    alert("Boilerplate deleted!");
    if (deletedBoilerplate) {
      history.push(buildOrganizationsLink(`/boilerplates`));
    }
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
              onDelete={() =>
                handleDeleteBoilerplate(organizationClient, boilerplate.id)
              }
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
