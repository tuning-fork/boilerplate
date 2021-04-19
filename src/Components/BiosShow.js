import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "./Elements/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

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
  const [organizations, setOrganizations] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}bios/${props.match.params.bio_id}`,
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}bios/` +
          id,
        {
          first_name: firstName,
          last_name: lastName,
          title: title,
          text: quillText,
          organization_id: organizationId,
          wordcount: countWords(quillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        toggleHidden();
        handleClose();
      })
      .catch((error) => {
        console.log("bio update error", error);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();

    handleClose();
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  const handleBioDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/bios/` +
          id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data.message) {
          props.history.push("/bios");
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    placeholder={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <ReactQuill
                  style={{ backgroundColor: "#fefefe" }}
                  value={quillText}
                  onChange={(value) => setQuillText(value)}
                />
                {/* <Form.Group>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    value={organization.name}
                    name="organizationId"
                    placeholder={organization.name}
                    onChange={(event) => setOrganizationId(event.target.value)}
                    required
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p style={{ color: "#fefefe" }}>{countWords(quillText)}</p>
                </Form.Group>
                <div>
                  <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={{ handleSubmit }}
                  >
                    Save Changes
                  </Button>
                  {/* <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={{ handleCancel }}
                  >
                    Cancel
                  </Button> */}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
