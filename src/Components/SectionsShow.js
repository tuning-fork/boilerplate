import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SectionToBoilerplateNew from "./SectionToBoilerplateNew";
import Modal from "./Elements/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function SectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isBoilerplateHidden, setIsBoilerplateHidden] = useState(true);
  const [isUnzipped, setIsUnzipped] = useState(false);
  const [wordcount, setWordcount] = useState("");
  const [grantId, setGrantId] = useState("");
  const [errors, setErrors] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [editableQuillText, setEditableQuillText] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const [editableSortOrder, setEditableSortOrder] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/grants/${props.grant_id}/sections/${props.section_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setTitle(response.data.title);
        setQuillText(response.data.text);
        setWordcount(response.data.wordcount);
        setSortOrder(response.data.sort_order);
        setGrantId(response.data.grant_id);
        setEditableQuillText(response.data.text);
        setEditableTitle(response.data.title);
        setEditableSortOrder(response.data.sort_order);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped);
  };

  const toggleBoilerplateHidden = () => {
    setIsBoilerplateHidden(!isBoilerplateHidden);
  };

  const handleSelect = (event) => {
    let editableQuillTextClone = editableQuillText;
    editableQuillTextClone += ` ${event.target.value}`;
    setEditableQuillText(editableQuillTextClone);
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/grants/${props.grant_id}/sections/${props.section_id}`,
        {
          title: editableTitle,
          text: editableQuillText,
          sort_order: editableSortOrder,
          wordcount: countWords(editableQuillText),
          grant_id: grantId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateSections(response.data);
          handleClose();
          setEditableQuillText(response.data.text);
          setEditableTitle(response.data.title);
          setEditableSortOrder(response.data.sort_order);
        }
      })
      .catch((error) => {
        console.log("grant section update error", error);
      });
    event.preventDefault();
  };

  const handleCancel = (event) => {
    setEditableQuillText(quillText);
    setEditableTitle(title);
    setEditableSortOrder(sortOrder);
    handleClose();
  };

  const handleSectionDelete = () => {
    axios
      .delete("/api/sections/" + props.section_id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message === "Section successfully destroyed") {
          props.updateSections(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      {isUnzipped === false ? (
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <h1 onClick={toggleUnzipped}>+</h1>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "black",
                fontSize: "1.5rem",
              }}
              onClick={handleShow}
            />
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <h1 onClick={toggleUnzipped}>-</h1>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "black",
                fontSize: "1.5rem",
              }}
              onClick={handleShow}
            />
            <h5 dangerouslySetInnerHTML={{ __html: quillText }}></h5>
            <h5>wordcount: {countWords(quillText)}</h5>
          </Card.Body>
          <div className="container">
            {isHidden ? (
              <Button onClick={toggleHidden}>Update Section</Button>
            ) : (
              <Button onClick={toggleHidden} variant="warning">
                Close Update Section
              </Button>
            )}
            {isBoilerplateHidden ? (
              <Button onClick={toggleBoilerplateHidden}>
                Save Section as Boilerplate
              </Button>
            ) : (
              <Button onClick={toggleBoilerplateHidden}>Close</Button>
            )}
            {!isBoilerplateHidden ? (
              <SectionToBoilerplateNew
                toggleBoilerplateHidden={toggleBoilerplateHidden}
                organization_id={props.organization_id}
                title={title}
                text={quillText}
              />
            ) : null}

            {/* Beginning of section update form */}
            <div></div>
          </div>
        </Card>
      )}
      <div>
        <Modal onClose={handleClose} show={show}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableTitle}
                    name="editableTitle"
                    onChange={(event) => setEditableTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add Boilerplate to text field below</Form.Label>
                  <Form.Control
                    as="select"
                    name="currentBoilerplate"
                    value={currentBoilerplate}
                    onChange={handleSelect}
                  >
                    <option value="" disabled>
                      Select Boilerplate
                    </option>
                    {props.boilerplates.map((boilerplate) => {
                      return (
                        <option
                          key={boilerplate.id}
                          value={boilerplate.text}
                          onChange={(event) =>
                            setCurrentBoilerplate(event.target.value)
                          }
                        >
                          {boilerplate.title}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Add Bio Text to text field below</Form.Label>
                  <Form.Control
                    as="select"
                    name="currentBoilerplate"
                    value={currentBoilerplate}
                    onChange={handleSelect}
                  >
                    <option value="" disabled>
                      Select Bio
                    </option>
                    {props.bios.map((bio) => {
                      return (
                        <option
                          key={bio.id}
                          value={`${bio.first_name} ${bio.last_name}: ${bio.text}`}
                          onChange={(event) =>
                            setCurrentBoilerplate(event.target.value)
                          }
                        >
                          {`${bio.first_name} ${bio.last_name}`}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <ReactQuill
                  value={editableQuillText}
                  onChange={(value) => setEditableQuillText(value)}
                />
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p>{countWords(editableQuillText)}</p>
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
                    <Button
                      variant="outline-danger"
                      style={{
                        maxWidth: "50%",
                        align: "center",
                        backgroundColor: "#23cb87",
                        color: "#09191b",
                        fontWeight: "bolder",
                      }}
                      onClick={handleSectionDelete}
                    ></Button>
                    Delete Section
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal>
      </div>
      <br />
    </div>
  );
}
