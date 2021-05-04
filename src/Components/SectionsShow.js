import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SectionToBoilerplateNew from "./SectionToBoilerplateNew";
import Modal from "./Elements/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import SectionEditForm from "./Sections/SectionEditForm";
import countWords from "../Helpers/countWords";

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
  const [newQuillText, setNewQuillText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("");
  const [bios, setBios] = useState([]);
  const [boilerplates, setBoilerplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/sections/${props.section_id}`,
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
          setNewQuillText(response.data.text);
          setNewTitle(response.data.title);
          setNewSortOrder(response.data.sort_order);
        });
      axios
        .get(`/api/organizations/${currentOrganizationId}/boilerplates`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          setBoilerplates(response.data);
        });
      axios
        .get(`/api/organizations/${currentOrganizationId}/bios`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          setBios(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped);
  };

  const toggleBoilerplateHidden = () => {
    setIsBoilerplateHidden(!isBoilerplateHidden);
  };

  const handleSubmit = ({ newTitle, newQuillText, newSortOrder }) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/sections/${props.section_id}`,
        {
          title: newTitle,
          text: newQuillText,
          sort_order: newSortOrder,
          wordcount: countWords(newQuillText),
          grant_id: grantId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateSections(response.data);
          handleClose();
          setNewQuillText(response.data.text);
          setNewTitle(response.data.title);
          setNewSortOrder(response.data.sort_order);
        }
      })
      .catch((error) => {
        console.log("grant section update error", error);
      });
  };

  const handleCancel = (event) => {
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
              <SectionEditForm
                title={title}
                quillText={quillText}
                boilerplates={boilerplates}
                bios={bios}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
      <br />
    </div>
  );
}
