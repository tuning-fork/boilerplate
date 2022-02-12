import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReportSectionsNew from "../ReportSections/ReportSectionsNew";
import ReportSectionsShow from "../ReportSections/ReportSectionsShow";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import ReportEditForm from "../Reports/ReportEditForm";
import {
  getGrantReport,
  updateGrantReport,
  deleteGrantReport,
} from "../../Services/Organizations/Grants/GrantReportsService";
import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faEdit);

export default function ReportsShow(props) {
  const [id, setId] = useState(props.match.params.report_id);
  const [grantId, setGrantId] = useState(props.match.params.grant_id);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [_boilerplates, setBoilerplates] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isGrantHidden, setIsGrantHidden] = useState(true);
  const [grantTitle, _setGrantTitle] = useState("");
  const [grantSections, setGrantSections] = useState([]);
  const [reportSections, setReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const [_newTitle, setNewTitle] = useState("");
  const [_newDeadline, setNewDeadline] = useState("");
  const [_newSubmitted, setNewSubmitted] = useState("");

  const [_show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (currentOrganization.id) {
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
          setGrantSections(report.grant.grant_sections);
          setLoading(false);
          setNewTitle(report.title);
          setNewDeadline(report.deadline);
          setNewSubmitted(report.submitted);
        })
        .catch((error) => {
          console.error(error);
        });
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [
    currentOrganization.id,
    id,
    organizationClient,
    props.match.params.grant_id,
  ]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleHiddenGrant = () => {
    setIsGrantHidden(!isGrantHidden);
  };

  const handleSubmit = ({ newTitle, newDeadline, newSubmitted }) => {
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    updateGrantReport(
      organizationClient,
      grantId,
      reportId,
      {
        grant_id: grantId,
        title: newTitle,
        deadline: newDeadline,
        submitted: newSubmitted,
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((report) => {
        toggleHidden();
        setNewTitle(report.title);
        setNewDeadline(report.deadline);
        setNewSubmitted(report.submitted);
      })
      .catch((error) => {
        console.error("report update error", error);
      });
  };

  const handleCancel = () => {
    setNewTitle(title);
    setNewDeadline(deadline);
    setNewSubmitted(submitted);
    handleClose();
  };

  const updateReportSections = (newReportSection) => {
    let newReportSections = [...reportSections, newReportSection];
    setReportSections(newReportSections);
  };

  const editReportSections = (editedReportSection) => {
    const newReportSections = reportSections.map((reportSection) => {
      if (reportSection.id === editedReportSection.id) {
        reportSection = editedReportSection;
      }
      return reportSection;
    });
    setReportSections(newReportSections);
  };

  const deleteReportSections = (deletedReportSection) => {
    let newReportSections = [...reportSections];
    let newArr = [];
    newReportSections.forEach((newReportSection) => {
      if (newReportSection.id !== deletedReportSection.id) {
        newArr.push(newReportSection);
      }
    });
    setReportSections(newArr);
  };

  const handleReportDelete = () => {
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    deleteGrantReport(organizationClient, grantId, reportId)
      .then((report) => {
        if (report.message) {
          history.push("/grants/" + grantId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderedSections = grantSections.map((grant_section) => {
    return (
      <div key={grant_section.id}>
        <h3>{grant_section.title}</h3>
        <h3 dangerouslySetInnerHTML={{ __html: grant_section.text }}></h3>
        <h3>{grant_section.wordcount}</h3>
      </div>
    );
  });

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="component container">
      <h1>Report Show - Build Draft Report Sections</h1>
      <Card>
        <Card.Header>
          <h2>{title}</h2>
        </Card.Header>
        <Card.Body>
          <h3>Deadline: {deadline}</h3>
          <h3>Submitted: {submitted ? "yes" : "not yet"}</h3>
        </Card.Body>
      </Card>

      {/* Associated grant */}

      <Button onClick={toggleHiddenGrant}>Show Associated Grant</Button>
      <Button onClick={toggleHidden}>Update Report</Button>

      {!isGrantHidden ? (
        <Card>
          <Card.Header>
            <h1>Associated Grant</h1>
            <h2>{grantTitle}</h2>
          </Card.Header>

          <Card.Body>{renderedSections}</Card.Body>
        </Card>
      ) : null}

      {/* beginning of report update */}

      <div className="container">
        <br />
        <br />
        {!isHidden ? (
          <Card>
            <Card.Body>
              <ReportEditForm
                title={title}
                deadline={deadline}
                submitted={submitted}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        ) : null}
      </div>

      {/* New report section */}

      <ReportSectionsNew
        report_id={id}
        grant_id={props.grant_id}
        sort_number={reportSections.length}
        updateReportSections={updateReportSections}
      />
      <br />

      {/* Report sections */}

      <Card>
        <Card.Header>
          <h3>Report Sections:</h3>
        </Card.Header>
        <Card.Body>
          {reportSections?.length ? (
            reportSections.map((reportSection) => {
              return (
                <div key={reportSection.id}>
                  <ReportSectionsShow
                    report_id={id}
                    grant_id={props.grant_id}
                    report_section_id={reportSection.id}
                    editReportSections={editReportSections}
                    deleteReportSections={deleteReportSections}
                  />
                </div>
              );
            })
          ) : (
            <h4>There are no report sections yet.</h4>
          )}
        </Card.Body>
      </Card>
      <br />

      <Link
        to={`/organizations/${currentOrganization.id}/grants/${grantId}/reports-finalize/${id}`}
      >
        <Button>Report Finalize</Button>
      </Link>

      <Button variant="danger" onClick={handleReportDelete}>
        Delete Report
      </Button>
    </div>
  );
}
