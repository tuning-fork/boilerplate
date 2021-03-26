import React, { Component, useState, useEffect } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SectionToBoilerplateNew from "./SectionToBoilerplateNew";

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

  useEffect(() => {
    axios
      .get("/api/sections/" + props.section_id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
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

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped);
  };

  const toggleBoilerplateHidden = () => {
    setIsBoilerplateHidden(!isBoilerplateHidden);
  };

  const handleSelect = (event) => {
    let quillText = quillText;
    quillText += ` ${event}`;
    setQuillText(quillText);
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
        "/api/sections/" + props.section_id,
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
          props.updateSections(response.data);
          toggleHidden();
        }
      })
      .catch((error) => {
        console.log("grant section update error", error);
      });
    event.preventDefault();
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
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <h5>{title}</h5>
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
                organization_id={props.organizationId}
                title={title}
                text={quillText}
              />
            ) : null}

            {/* Beginning of section update form */}

            {!isHidden ? (
              <Card>
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
                      <Form.Label>
                        Add Boilerplate to text field below
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="currentBoilerplate"
                        value={currentBoilerplate}
                        onChange={(event) =>
                          setCurrentBoilerplate(event.target.value)
                        }
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
                        onChange={(event) => setCurrentBoilerplate(event)}
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
                      value={quillText}
                      onChange={(value) => setQuillText(value)}
                    />
                    <Form.Group>
                      <Form.Label>Word Count</Form.Label>
                      <p>{countWords(quillText)}</p>
                    </Form.Group>
                    <div className="text-center">
                      <Button type="submit">Submit Updated Section</Button>
                      <Button variant="danger" onClick={handleSectionDelete}>
                        Delete Section
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : null}
          </div>
        </Card>
      )}
      <br />
    </div>
  );
}
