import React, { useState, useEffect } from "react";
import ReportSectionsShow from "./ReportSectionsShow";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import ReportFinalizeEditForm from "./Reports/ReportEditForm";
import {
  getGrantReport,
  updateGrantReport,
  // deleteGrantReport,
} from "../Services/Organizations/Grants/GrantReportsService";

export default function ReportsFinalizeShow(props) {
  const [id, setId] = useState("");
  const [_grantId, setGrantId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [reportSections, setReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [_newTitle, setNewTitle] = useState(props.title);
  const [_newDeadline, setNewDeadline] = useState(props.deadline);
  const [_newSubmitted, setNewSubmitted] = useState(props.submitted);

  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [_show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (currentOrganizationId) {
      const grantId = props.match.params.grant_id;
      const reportId = id;
      getGrantReport(organizationClient, grantId, reportId)
        .then((report) => {
          setId(report.id);
          setGrantId(report.grant_id);
          setTitle(report.title);
          setDeadline(report.deadline);
          setSubmitted(report.submitted);
          setReportSections(report.report_sections);
          setLoading(false);
          setNewTitle(report.title);
          setNewSubmitted(report.submitted);
          setNewDeadline(report.deadline);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    currentOrganizationId,
    organizationClient,
    props.match.params.grant_id,
    id,
  ]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const updateReportSections = (newReportSection) => {
    let newReportSections = reportSections.map((reportSection) => {
      if (reportSection.id === newReportSection.id) {
        reportSection.title = newReportSection.title;
        reportSection.text = newReportSection.text;
        reportSection.wordcount = newReportSection.wordcount;
      }
      return reportSection;
    });
    setReportSections(newReportSections);
  };

  const handleSubmit = ({ newTitle, newDeadline, newSubmitted }) => {
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    updateGrantReport(
      organizationClient,
      grantId,
      reportId,
      {
        title: newTitle,
        deadline: newDeadline,
        submitted: newSubmitted,
        report_sections: [],
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((report) => {
        toggleHidden();
        handleClose();
        setTitle(report.title);
        setDeadline(report.deadline);
        setSubmitted(report.submitted);
      })
      .catch((error) => {
        console.error("report update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  // const handleGrantReportDelete = () => {
  //   const grantId = props.match.params.grant_id;
  //   const reportId = id;
  //   deleteGrantReport(organizationClient, grantId, reportId)
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Report sections */}
      <div>
        {reportSections?.length ? (
          reportSections.map((reportSection) => {
            return (
              <div key={reportSection.id}>
                <ReportSectionsShow
                  report_id={id}
                  grant_id={props.grant_id}
                  report_section_id={reportSection.id}
                  report_section_title={reportSection.title}
                  report_section_text={reportSection.text}
                  updateReportSections={updateReportSections}
                />
              </div>
            );
          })
        ) : (
          <h4>There are no report sections yet.</h4>
        )}
      </div>

      {/* Report update */}

      <div className="container">
        <Button onClick={toggleHidden}>Update Report</Button>
        <br />
        <br />
        {!isHidden ? (
          <div>
            <div>
              <ReportFinalizeEditForm
                title={title}
                deadline={deadline}
                submitted={submitted}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
