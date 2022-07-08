import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import ReportSectionEditForm from "./ReportSectionEditForm";
import countWords from "../../Helpers/countWords";
import {
  getReportSection,
  updateReportSection,
  // deleteReportSection,
} from "../../Services/Organizations/Grants/Reports/ReportSectionsService";

export default function ReportSectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [_text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [_wordcount, setWordcount] = useState("");
  const [_reportUuid, setReportUuid] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [_newQuillText, setNewQuillText] = useState("");
  const [_newTitle, setNewTitle] = useState("");
  const [_newSortOrder, setNewSortOrder] = useState("");

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const [_show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (currentOrganization.uuid) {
      const grantUuid = props.grantUuid;
      const reportUuid = props.reportUuid;
      const reportSectionUuid = props.reportSectionUuid;
      getReportSection(
        organizationClient,
        grantUuid,
        reportUuid,
        reportSectionUuid
      )
        .then((reportSection) => {
          setId(reportSection.uuid);
          setTitle(reportSection.title);
          setText(reportSection.text);
          setQuillText(reportSection.text);
          setSortOrder(reportSection.sort_order);
          setWordcount(reportSection.wordcount);
          setReportUuid(reportSection.reportUuid);
          setLoading(false);
          setNewTitle(reportSection.title);
          setNewQuillText(reportSection.text);
          setNewSortOrder(reportSection.sort_order);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    currentOrganization.uuid,
    organizationClient,
    props.grantUuid,
    props.reportUuid,
    props.reportSectionUuid,
  ]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({ newTitle, newQuillText, newSortOrder }) => {
    const grantUuid = props.grantUuid;
    const reportUuid = props.reportUuid;
    const reportSectionUuid = props.reportSectionUuid;
    updateReportSection(
      organizationClient,
      grantUuid,
      reportUuid,
      reportSectionUuid,
      {
        title: newTitle,
        text: newQuillText,
        sort_order: newSortOrder,
        wordcount: countWords(newQuillText),
        reportUuid: reportUuid,
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((reportSection) => {
        props.editReportSections(reportSection);
        toggleHidden();
      })
      .catch((error) => {
        console.error("report section update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
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
