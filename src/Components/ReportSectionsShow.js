import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ReportSectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [reportId, setReportId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableQuillText, setEditableQuillText] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const [editableSortOrder, setEditableSortOrder] = useState("");

  const [currentOrganizationStore] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/reports/${props.report_id}/report_sections/${props.report_section_id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          setId(response.data.id);
          setTitle(response.data.title);
          setText(response.data.text);
          setQuillText(response.data.text);
          setSortOrder(response.data.sort_order);
          setWordcount(response.data.wordcount);
          setReportId(response.data.report_id);
          setLoading(false);
          setEditableTitle(response.data.title);
          setEditableQuillText(response.data.text);
          setEditableSortOrder(response.data.sort_order);
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
        `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/reports/${props.report_id}/report_sections/${props.report_section_id}`,
        {
          title: editableTitle,
          text: editableQuillText,
          sort_order: editableSortOrder,
          wordcount: countWords(editableQuillText),
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

  const handleCancel = (event) => {
    setEditableTitle(title);
    setEditableQuillText(text);
    setEditableSortOrder(sortOrder);
    handleClose();
  };

  const handleReportSectionDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/reports/${props.report_id}/report_sections/${props.report_section_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
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
                      value={editableTitle}
                      name="editableTitle"
                      onChange={(event) => setEditableTitle(event.target.value)}
                      required
                    />
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
                    </Button>
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
