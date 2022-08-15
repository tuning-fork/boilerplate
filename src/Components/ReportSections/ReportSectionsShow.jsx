import React, { useState, useEffect } from "react";
import Button from "../design/Button/Button";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import ReportSectionEditForm from "./ReportSectionEditForm";
import countWords from "../../Helpers/countWords";
import {
  getReportSection,
  updateReportSection,
  // deleteReportSection,
} from "../../services/Organizations/Grants/Reports/ReportSectionsService";

export default function ReportSectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [_text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [_wordcount, setWordcount] = useState("");
  const [_reportId, setReportId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [_newQuillText, setNewQuillText] = useState("");
  const [_newTitle, setNewTitle] = useState("");
  const [_newSortOrder, setNewSortOrder] = useState("");

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const [_show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (currentOrganization.id) {
      const grantId = props.grantId;
      const reportId = props.reportId;
      const reportSectionId = props.reportSectionId;
      getReportSection(organizationClient, grantId, reportId, reportSectionId)
        .then((reportSection) => {
          setId(reportSection.id);
          setTitle(reportSection.title);
          setText(reportSection.text);
          setQuillText(reportSection.text);
          setSortOrder(reportSection.sort_order);
          setWordcount(reportSection.wordcount);
          setReportId(reportSection.reportId);
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
    currentOrganization.id,
    organizationClient,
    props.grantId,
    props.reportId,
    props.reportSectionId,
  ]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({ newTitle, newQuillText, newSortOrder }) => {
    const grantId = props.grantId;
    const reportId = props.reportId;
    const reportSectionId = props.reportSectionId;
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
        reportId: reportId,
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
      <div>
        <div>
          <h5>{title}</h5>
          <p dangerouslySetInnerHTML={{ __html: quillText }}></p>
          <p>wordcount: {countWords(quillText)}</p>
          <p>sort order: {sortOrder}</p>
        </div>
      </div>
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
            <div>
              <div>
                <ReportSectionEditForm
                  title={title}
                  quillText={quillText}
                  sortOrder={sortOrder}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
