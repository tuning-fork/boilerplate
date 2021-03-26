import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import Container from "react-bootstrap/Container";
import "react-quill/dist/quill.snow.css";

export default function ReportSectionsUpdateFinal(props) {
  const [quillText, setQuillText] = useState(props.report_section_text);
  const [title, setTitle] = useState(props.report_section_title);
  const [isHidden, setIsHidden] = useState(true);
  const [wordcount, setWordcount] = useState("");
  const [reportId, setReportId] = useState("");
  const [grantId, setGrantId] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  // quillChange(value) {
  //   this.setState({ quill_text: value})
  // }

  const handleSubmit = (event) => {
    // const { title, quill_text } = this.state;
    event.preventDefault();
    axios
      .patch(
        "/api/report_sections/" + props.report_section_id,
        {
          title: title,
          text: quillText,
          sort_order: props.section_sort_order,
          wordcount: countWords(quillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          toggleHidden();
          props.updateReportSections(response.data);
        }
      })
      .catch((error) => {
        console.log("section update error", error);
      });
  };

  const handleReportSectionDelete = () => {
    axios
      .delete("/api/report_sections/" + props.section.id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
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

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container">
      <Container className="whatever" onClick={toggleHidden}>
        <h5>{props.report_section_title}</h5>
        <h5
          dangerouslySetInnerHTML={{ __html: props.report_section_text }}
        ></h5>
      </Container>

      <div className="container">
        <br />
        <br />
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
                <ReactQuill
                  // name="quill_text"
                  value={quillText}
                  onChange={(value) => setQuillText(value)}
                />
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p>{countWords(quillText)}</p>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                  <Button onClick={toggleHidden}>Close</Button>
                  <Button onClick={handleReportSectionDelete}>Delete</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
