import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import BoilerplateEditForm from "./Boilerplates/BoilerplateEditForm";
import {
  getBoilerplate,
  updateBoilerplate,
  deleteBoilerplate,
} from "../Services/Organizations/BoilerplatesService";
import countWords from "../Helpers/countWords";
import { getAllCategories } from "../Services/Organizations/CategoriesService";
import { getAllBios } from "../Services/Organizations/BiosService";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function BoilerplatesShow(props) {
  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [wordcount, setWordcount] = useState("");

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [newTitle, setNewTitle] = useState("");
  const [newQuillText, setNewQuillText] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      const boilerplateId = props.match.params.boilerplate_id;
      getBoilerplate(organizationClient, boilerplateId)
        .then((response) => {
          setId(response.data.id);
          setTitle(response.data.title);
          setQuillText(response.data.text);
          setWordcount(response.data.wordcount);
          setOrganizationId(response.data.organization_id);
          setCategoryId(response.data.category_id);
          setCategoryName(response.data.category.name);
          setNewTitle(response.data.title);
          setNewQuillText(response.data.text);
          setNewCategoryId(response.data.category_id);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      getAllCategories(organizationClient)
        .then((response) => {
          setCategories(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const handleSubmit = ({ newTitle, newQuillText, newCategoryId }) => {
    updateBoilerplate(organizationClient, id, {
      title: newTitle,
      text: newQuillText,
      category_id: newCategoryId,
      wordcount: countWords(newQuillText),
      organization_id: organizationId,
    })
      .then((response) => {
        handleClose();
        setTitle(response.data.title);
        setQuillText(response.data.text);
        setCategoryId(response.data.category_id);
        setCategoryName(response.data.category.name);
      })
      .catch((error) => {
        console.log("boilerplate update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleBoilerplateDelete = () => {
    const boilerplateId = props.match.params.boilerplate_id;
    deleteBoilerplate(organizationClient, boilerplateId)
      .then((response) => {
        if (response.data.message) {
          history.push(`/organizations/${currentOrganizationId}/boilerplates`);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  const Header = (
    <Card.Header style={{ backgroundColor: "#09191b" }}>
      <h3
        style={{
          color: "#23cb87",
          fontWeight: "bolder",
          display: "inline",
        }}
      >
        {title}
      </h3>
      <FontAwesomeIcon
        icon={faEdit}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "160px",
        }}
        onClick={handleShow}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "10px",
        }}
        onClick={handleBoilerplateDelete}
      />
    </Card.Header>
  );

  return (
    <div className="flex-container">
      <Card>
        {Header}
        <Card.Body>
          <p dangerouslySetInnerHTML={{ __html: quillText }}></p>
          <h4>Category: {categoryName}</h4>
          <h4>Word Count: {countWords(quillText)}</h4>
        </Card.Body>
      </Card>
      <Modal show={show} onClose={handleClose}>
        <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
          <Card.Body>
            <BoilerplateEditForm
              title={title}
              quillText={quillText}
              categoryId={categoryId}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
}
