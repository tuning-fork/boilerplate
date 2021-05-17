import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createReportSection } from "../Services/Organizations/Grants/Reports/ReportSectionsService";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";

export default function ReportSectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [reportId, setReportId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

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
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading, currentOrganizationId]);

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setSortOrder("");
    setWordcount(0);
    setCurrentBoilerplate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReportSection = {
      report_id: props.report_id,
      title: title,
      text: quillText,
      sort_order: props.sort_number + 1,
      wordcount: countWords(quillText),
    };
    createReportSection(
      organizationClient,
      props.grant_id,
      props.report_id,
      newReportSection
    )
      .then((reportSection) => {
        if (reportSection.data) {
          props.updateReportSections(reportSection);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("section creation error", error);
      });
  };

  const handleSelect = (event) => {
    let selectedQuillText = quillText;
    selectedQuillText += ` ${event.target.value}`;
    setQuillText(selectedQuillText);
  };

  const onTextChanged = (event) => {
    const value = event.target.value.toLowerCase();
    let suggestions = [];
    if (value.length > 0) {
      suggestions = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(value) !== -1;
      });
    }
    setSuggestions(suggestions);
    setSearchText(value);
  };

  const suggestionSelected = (value) => {
    let addQuillText = quillText;
    addQuillText += value.text;
    setSearchText("");
    setSuggestions([]);
    setQuillText(addQuillText);
  };

  const renderSuggestions = () => {
    console.log(suggestions);
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => suggestionSelected(boilerplate)}
          >
            {boilerplate.title}, {boilerplate.wordcount} words
          </li>
        ))}
      </div>
    );
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  return (
    <Card>
      <Card.Header>
        <h3>New Report Section:</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Add Boilerplate to Text Area</Form.Label>
            <div>
              <label>Search Boilerplate by title </label>
              <input type="text" value={searchText} onChange={onTextChanged} />
              {renderSuggestions()}
            </div>
            <Form.Control
              as="select"
              name="currentBoilerplate"
              value={currentBoilerplate}
              onChange={handleSelect}
            >
              <option value="" disabled>
                Select Boilerplate
              </option>
              {boilerplates.map((boilerplate) => {
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
          <Form.Label>Report Section Text</Form.Label>
          <ReactQuill
            value={quillText}
            onChange={(value) => setQuillText(value)}
          />
          <Form.Group>
            <Form.Label>Word Count</Form.Label>
            <p>{countWords(quillText)}</p>
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Report Section</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
