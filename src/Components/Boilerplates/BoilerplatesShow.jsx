import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import Container from "../design/Container/Container";
import BoilerplateHero from "../design/Hero/BoilerplateHero";
import BoilerplateForm from "./BoilerplateForm";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import countWords from "../../Helpers/countWords";
import "./BoilerplatesShow.css";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";

export default function BoilerplatesShow() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { boilerplateId } = useParams();
  const history = useHistory();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { data: boilerplate } = useQuery("getBoilerplate", () =>
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
  const { mutate: deleteBoilerplate } = useMutation(
    () =>
      BoilerplatesService.deleteBoilerplate(organizationClient, boilerplateId),
    {
      onSuccess() {
        history.push(buildOrganizationsLink(`/boilerplates`));
        alert("Boilerplate deleted!");
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

  const handleDeleteBoilerplate = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this boilerplate?`)) {
      deleteBoilerplate();
    }
  };

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
              onDelete={handleDeleteBoilerplate}
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
