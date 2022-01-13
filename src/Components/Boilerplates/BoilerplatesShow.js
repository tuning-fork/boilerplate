import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import BoilerplateHero from "../design/Hero/BoilerplateHero";
import BoilerplateForm from "./BoilerplateForm";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import countWords from "../../Helpers/countWords";
import "./BoilerplatesShow.css";

export default function BoilerplatesShow() {
  const [boilerplate, setBoilerplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const [wordcount, setWordcount] = useState(null);
  const [editingBoilerplate, setEditingBoilerplate] = useState(false);

  const { boilerplate_id: boilerplateId } = useParams();
  console.log("boilerplateId", boilerplateId);

  const getBoilerplate = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    BoilerplatesService.getBoilerplate(organizationClient, boilerplateId)
      .then((boilerplate) => {
        console.log("boilerplate", boilerplate);
        setBoilerplate(boilerplate);
        setWordcount(countWords(boilerplate.text));
      })
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, boilerplateId]);

  useEffect(() => {
    getBoilerplate();
  }, [getBoilerplate]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  const handleEditBoilerplate = (newBoilerplateFields) => {
    BoilerplatesService.updateBoilerplate(
      organizationClient,
      boilerplateId,
      newBoilerplateFields.id,
      {
        title: newBoilerplateFields.title,
        text: newBoilerplateFields.html,
        category: newBoilerplateFields.category_id,
        wordcount: countWords(newBoilerplateFields.text),
      }
    ).then(() => {
      alert("Boilerplate edited!");
      setEditingBoilerplate(null);
      return getBoilerplate();
    });
  };

  return (
    <div className="boilerplates-show">
      <div className="boilerplates-show__content">
        <BoilerplateHero
          headerText={boilerplate.title}
          wordcount={wordcount}
          categoryText={boilerplate.categoryName}
          breadCrumbLink={`/organizations/${currentOrganization.id}/boilerplates/`}
          editLink={`/boilerplates/${boilerplate.id}/edit/`}
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
