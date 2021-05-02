import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import ReportSectionEditForm from "./ReportSections/ReportSectionEditForm";
import countWords from "../Helpers/countWords";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

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
  const [newQuillText, setNewQuillText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("");

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
          setNewTitle(response.data.title);
          setNewQuillText(response.data.text);
          setNewSortOrder(response.data.sort_order);
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
          title: newTitle,
          text: newQuillText,
          sort_order: newSortOrder,
          wordcount: countWords(newQuillText),
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
                <ReportSectionEditForm
                  title={title}
                  quillText={quillText}
                  sortOrder={sortOrder}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
