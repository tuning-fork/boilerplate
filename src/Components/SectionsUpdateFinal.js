import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import Container from "react-bootstrap/Container";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function SectionsUpdateFinal(props) {
  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [boilerplateId, setBoilerplateId] = useState("");
  const [bioId, setBioId] = useState("");
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [bios, setBios] = useState([]);
  const [grantId, setGrantId] = useState("");
  const [errors, setErrors] = useState([]);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/sections/${props.section_id}`,
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
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSelect = (event) => {
    quillText += ` ${event.target.value}`;
    setQuillText(quillText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        "/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/sections/" +
          props.section_id,
        {
          title: title,
          text: quillText,
          sort_order: sortOrder,
          wordcount: countWords(quillText),
          grant_id: grantId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          toggleHidden();
          props.updateSections(response.data);
        }
      })
      .catch((error) => {
        console.log("section update error", error);
      });
  };

  const handleSectionDelete = () => {
    axios
      .delete(
        "/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/sections/" +
          props.section_id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  return (
    <div className="container">
      {props.isUnzipped === false ? (
        <Container className="whatever" onClick={toggleHidden}>
          <h5>{title}</h5>
          <h1 onClick={() => props.toggleUnzipped(props.section_id, true)}>
            +
          </h1>
        </Container>
      ) : (
        <Container className="whatever" onClick={toggleHidden}>
          <h5>{title}</h5>
          <h1 onClick={() => props.toggleUnzipped(props.section_id, false)}>
            -
          </h1>
          <h5 dangerouslySetInnerHTML={{ __html: quillText }}></h5>
        </Container>
      )}
      <br />
      {!isHidden ? (
        <div>
          <Card>
            <Button onClick={toggleHidden}>Close</Button>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    onChange={(event) => setTitle(event.target.value)}
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
                            setBoilerplateId(event.target.value)
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
                          onChange={(event) => setBioId(event.target.value)}
                        >
                          {`${bio.first_name} ${bio.last_name}`}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <ReactQuill
                  value={quillText}
                  onChange={(value) => setQuillText(value)}
                />
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p>{countWords(quillText)}</p>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                  <Button variant="danger" onClick={handleSectionDelete}>
                    Delete
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <br />
        </div>
      ) : null}
    </div>
  );
}
