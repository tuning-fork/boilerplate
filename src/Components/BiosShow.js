import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import BioEditForm from "./Bios/BioEditForm";
import countWords from "../Helpers/countWords";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function BiosShow(props) {
  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organization, setOrganization] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [newQuillText, setNewQuillText] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganizationInfo &&
    currentOrganizationStore.currentOrganizationInfo.id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/bios/${props.match.params.bio_id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          setId(response.data.id);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setTitle(response.data.title);
          setQuillText(response.data.text);
          setOrganizationId(response.data.organization_id);
          setOrganization(response.data.organization);
          setWordCount(response.data.wordcount);
          setLoading(false);
          setNewQuillText(response.data.text);
          setNewFirstName(response.data.first_name);
          setNewLastName(response.data.last_name);
          setNewTitle(response.data.title);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({
    newFirstName,
    newLastName,
    newTitle,
    newQuillText,
  }) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/bios/` + id,
        {
          first_name: newFirstName,
          last_name: newLastName,
          title: newTitle,
          text: newQuillText,
          organization_id: currentOrganizationId,
          wordcount: countWords(newQuillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        console.log(response);
        toggleHidden();
        handleClose();
        setNewQuillText(response.data.text);
        setNewFirstName(response.data.first_name);
        setNewLastName(response.data.last_name);
        setNewTitle(response.data.title);
      })
      .catch((error) => {
        console.log("bio update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleBioDelete = () => {
    axios
      .delete(`/api/organizations/${currentOrganizationId}/bios/` + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message) {
          props.history.push(`/organizations/${currentOrganizationId}/bios`);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
  ];

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
        <Card.Header style={{ backgroundColor: "#09191b" }}>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {firstName} {lastName}
          </h3>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {" "}
            |{" "}
          </h3>
          <h3
            style={{
              color: "#f4f4f4",
              fontWeight: "bold",
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
            onClick={handleBioDelete}
          />
        </Card.Header>
        <Card.Body>
          <h4 dangerouslySetInnerHTML={{ __html: quillText }}></h4>
          <h4>Organization: {organization.name}</h4>
          <h4>Word Count: {countWords(quillText)}</h4>
        </Card.Body>
      </Card>
      <div>
        <Modal show={show} onClose={handleClose}>
          <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
            <Card.Body>
              <BioEditForm
                title={title}
                quillText={quillText}
                firstName={firstName}
                lastName={lastName}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
