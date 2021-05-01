import React, { useState, useEffect } from "react";
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
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [editableQuillText, setEditableQuillText] = useState("");
  const [editableFirstName, setEditableFirstName] = useState("");
  const [editableLastName, setEditableLastName] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

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
          setEditableQuillText(response.data.text);
          setEditableFirstName(response.data.first_name);
          setEditableLastName(response.data.last_name);
          setEditableTitle(response.data.title);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/bios/` + id,
        {
          first_name: editableFirstName,
          last_name: editableLastName,
          title: editableTitle,
          text: editableQuillText,
          organization_id: currentOrganizationId,
          wordcount: countWords(editableQuillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        console.log(response);
        toggleHidden();
        handleClose();
        setEditableQuillText(response.data.text);
        setEditableFirstName(response.data.first_name);
        setEditableLastName(response.data.last_name);
        setEditableTitle(response.data.title);
      })
      .catch((error) => {
        console.log("bio update error", error);
      });
  };

  const handleCancel = (event) => {
    setEditableQuillText(quillText);
    setEditableFirstName(firstName);
    setEditableLastName(lastName);
    setEditableTitle(title);
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
      .delete(`/api/organizations/${currentOrganizationId}/bios/` + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
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
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableFirstName}
                    name="editableFirstName"
                    placeholder={editableFirstName}
                    onChange={(event) =>
                      setEditableFirstName(event.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableLastName}
                    name="editableLastName"
                    placeholder={editableLastName}
                    onChange={(event) =>
                      setEditableLastName(event.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableTitle}
                    name="editableTitle"
                    placeholder={editableTitle}
                    onChange={(event) => setEditableTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <ReactQuill
                  name="quillText"
                  modules={modules}
                  format={formats}
                  defaultValue={editableQuillText}
                  style={{ color: "#09191b", backgroundColor: "#fefefe" }}
                  value={editableQuillText}
                  onChange={(value) => setEditableQuillText(value)}
                />
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p style={{ color: "#fefefe" }}>
                    {countWords(editableQuillText)}
                  </p>
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
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline-success"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
