import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import BoilerplateEditForm from "./Boilerplates/BoilerplateEditForm";
import {
  getBoilerplate,
  updateBoilerplate,
  // deleteBoilerplate,
} from "../Services/Organizations/BoilerplatesService";
import countWords from "../Helpers/countWords";
import { getAllCategories } from "../Services/Organizations/CategoriesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faEdit);

export default function BoilerplatesShow(props) {
  const [boilerplate, setBoilerplate] = useState({});
  const [quillText, setQuillText] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [_newTitle, setNewTitle] = useState("");
  const [_newQuillText, setNewQuillText] = useState("");
  const [_newCategoryId, setNewCategoryId] = useState("");

  const [_show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (currentOrganizationId) {
      const boilerplateId = props.match.params.boilerplate_id;
      getBoilerplate(organizationClient, boilerplateId)
        .then((boilerplate) => {
          setBoilerplate(boilerplate);
          setQuillText(boilerplate.text);
          setNewTitle(boilerplate.title);
          setNewQuillText(boilerplate.text);
          setNewCategoryId(boilerplate.category_id);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [
    currentOrganizationId,
    organizationClient,
    props.match.params.boilerplate_id,
  ]);

  const handleSubmit = ({ newTitle, newQuillText, newCategoryId }) => {
    updateBoilerplate(organizationClient, boilerplate.id, {
      title: newTitle,
      text: newQuillText,
      category_id: newCategoryId,
      wordcount: countWords(newQuillText),
      organization_id: boilerplate.organization.id,
    })
      .then((boilerplate) => {
        handleClose();
        setBoilerplate(boilerplate);
        setNewTitle(boilerplate.title);
        setNewQuillText(boilerplate.text);
        setNewCategoryId(boilerplate.category_id);
      })
      .catch((error) => {
        console.error("boilerplate update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  // const handleBoilerplateDelete = () => {
  //   const boilerplateId = props.match.params.boilerplate_id;
  //   deleteBoilerplate(organizationClient, boilerplateId)
  //     .then((boilerplate) => {
  //       if (boilerplate.message) {
  //         history.push(`/organizations/${currentOrganizationId}/boilerplates`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <Card>
        <Card.Body>
          <BoilerplateEditForm
            title={boilerplate.title}
            quillText={quillText}
            categoryId={boilerplate.category_id}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
