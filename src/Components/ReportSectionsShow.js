import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ReportSectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [reportId, setReportId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errors, setErrors] = useState(errors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/report_sections/${this.props.report_section_id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setId(response.data.id);
        setTitle(response.data.title);
        setText(response.data.text);
        setQuillText(response.data.text);
        setSortOrder(response.data.sort_order);
        setWordcount(response.data.wordcount);
        setReportId(response.data.report_id);
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
        "/api/report_sections/" + props.report_section_id,
        {
          title: title,
          text: quillText,
          sort_order: sortOrder,
          wordcount: countWords(quillText),
          report_id: reportId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        props.editReportSections(response.data);
        toggleHidden();
      })
      .catch((error) => {
        console.log("report section update error", error);
      });
  };

  const handleReportSectionDelete = () => {
    axios
      .delete("/api/report_sections/" + props.report_section_id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        toggleHidden();
        props.deleteReportSections(response.data);
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
      <Card>
        <Card.Body>
          <h5>{title}</h5>
          <p dangerouslySetInnerHTML={{ __html: quillText }}></p>
          <p>wordcount: {countWords(quillText)}</p>
          <p>sort order: {sortOrder}</p>
        </Card.Body>
      </Card>
      <br />
      <div>
        <div className="container">
          {isHidden ? (
            <Button onClick={toggleHidden}>Update Report Section</Button>
          ) : (
            <Button onClick={toggleHidden}>Close</Button>
          )}
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
                    value={quillText}
                    onChange={(value) => setQuillText(value)}
                  />
                  <Form.Group>
                    <Form.Label>Word Count</Form.Label>
                    <p>{countWords(quillText)}</p>
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit">Submit</Button>
                    <Button onClick={handleReportSectionDelete}>Delete</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
