import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReportSectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [reportId, setReportId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [addText, setAddText] = useState("");

  useEffect(() => {
    axios
      .get("/api/boilerplates", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setBoilerplates(response.data);
      });
  }, []);

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
    axios
      .post("/api/report_sections", newReportSection, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data) {
          props.updateReportSections(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("section creation error", error);
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
            <Form.Control
              as="select"
              name="currentBoilerplate"
              value={currentBoilerplate}
              onChange={(event) => setCurrentBoilerplate(event.target.value)}
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
            // name="quill_text"
            value={quillText}
            onChange={(value) => setQuillText(value)}
          />
          <Form.Group>
            <Form.Label>Word Count</Form.Label>
            <p>{countWords(quillText)}</p>
          </Form.Group>
          {/* <p>Sort Order: {this.props.grant_section_number}</p> */}
          <div className="text-center">
            <Button type="submit">Add New Report Section</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
