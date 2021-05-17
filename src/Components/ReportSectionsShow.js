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
import {
  getReportSection,
  updateReportSection,
  deleteReportSection,
} from "../Services/Organizations/Grants/Reports/ReportSectionsService";

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

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      const grantId = props.grant_id;
      const reportId = props.report_id;
      const reportSectionId = props.report_section_id;
      getReportSection(organizationClient, grantId, reportId, reportSectionId)
        .then((reportSection) => {
          setId(reportSection.id);
          setTitle(reportSection.title);
          setText(reportSection.text);
          setQuillText(reportSection.text);
          setSortOrder(reportSection.sort_order);
          setWordcount(reportSection.wordcount);
          setReportId(reportSection.report_id);
          setLoading(false);
          setNewTitle(reportSection.title);
          setNewQuillText(reportSection.text);
          setNewSortOrder(reportSection.sort_order);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({ newTitle, newQuillText, newSortOrder }) => {
    const grantId = props.grant_id;
    const reportId = props.report_id;
    const reportSectionId = props.report_section_id;
    updateReportSection(
      organizationClient,
      grantId,
      reportId,
      reportSectionId,
      {
        title: newTitle,
        text: newQuillText,
        sort_order: newSortOrder,
        wordcount: countWords(newQuillText),
        report_id: reportId,
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((reportSection) => {
        props.editReportSections(reportSection);
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
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    const reportSectionId = props.match.params.report_section_id;
    deleteReportSection(organizationClient, grantId, reportId, reportSectionId)
      .then((reportSection) => {
        toggleHidden();
        props.deleteReportSections(reportSection);
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
