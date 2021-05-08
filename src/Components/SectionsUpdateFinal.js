import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import Container from "react-bootstrap/Container";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import {
  getGrantSection,
  updateGrantSection,
  deleteGrantSection,
} from "../Services/Organizations/Grants/GrantSectionsService";

export default function SectionsShow(props) {
  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [wordcount, setWordcount] = useState("");

  const [boilerplateId, setBoilerplateId] = useState("");
  const [bioId, setBioId] = useState("");
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [grantId, setGrantId] = useState("");
  const [errors, setErrors] = useState([]);

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getGrantSection(organizationClient, props.grant_id, props.section_id)
        .then((section) => {
          setTitle(section.title);
          setQuillText(section.text);
          setWordcount(section.wordcount);
          setSortOrder(section.sort_order);
          setGrantId(section.grant_id);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSelect = (event) => {
    quillText += ` ${event.target.value}`;
    setQuillText(quillText);
  };

  const handleSubmit = ({
    newTitle,
    newText,
    newSortOrder,
    newWordCount,
    grantId,
  }) => {
    updateGrantSection(organizationClient, id, {
      title: newTitle,
      text: newQuillText,
      sort_order: newSortOrder,
      wordcount: countWords(newQuillText),
      grant_id: grantId,
    })
      .then((updatedGrantSection) => {
        if (updatedGrantSection) {
          toggleHidden();
          props.updateSections(updatedGrantSection);
        }
      })
      .catch((error) => {
        console.log("section update error", error);
      });
  };

  const handleSectionDelete = () => {
    deleteGrantSection(organizationClient, grantId, sectionId)
      .then((section) => {
        console.log(section);
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
      <Container className="whatever" onClick={toggleHidden}></Container>
      <Container className="whatever" onClick={toggleHidden}>
        <h5>{title}</h5>
        <h5 dangerouslySetInnerHTML={{ __html: quillText }}></h5>
      </Container>
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
