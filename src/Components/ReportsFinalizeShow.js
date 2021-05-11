import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportSectionsShow from "./ReportSectionsShow";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import ReportFinalizeEditForm from "./Reports/ReportEditForm";
import {
  getGrantReport,
  updateGrantReport,
  deleteGrantReport,
} from "../Services/Organizations/Grants/GrantReportsService";

export default function ReportsFinalizeShow(props) {
  const [id, setId] = useState("");
  const [grantId, setGrantId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [reportSections, setReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDeadline, setNewDeadline] = useState(props.deadline);
  const [newSubmitted, setNewSubmitted] = useState(props.submitted);

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

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
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

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
        console.log("report update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleGrantReportDelete = () => {
    const grantId = props.match.params.grant_id;
    const reportId = id;
    deleteGrantReport(organizationClient, grantId, reportId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  const Header = (
    <Card.Header>
      <h1>Report Finalize - View and Finalize Report Draft</h1>
      <h5>{title}</h5>
      <h5>{deadline}</h5>
      <h5>Submitted: {submitted ? "yes" : "not yet"}</h5>
    </Card.Header>
  );

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
