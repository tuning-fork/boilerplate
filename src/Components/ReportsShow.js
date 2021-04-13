import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReportSectionsNew from "./ReportSectionsNew";
import ReportSectionsShow from "./ReportSectionsShow";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ReportsShow(props) {
  const [id, setId] = useState("");
  const [grantId, setGrantId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isGrantHidden, setIsGrantHidden] = useState(true);
  const [isHiddenNewReportSection, setIsHiddenNewReportSection] = useState(
    true
  );
  const [grantTitle, setGrantTitle] = useState("");
  const [grantSections, setGrantSections] = useState([]);
  const [reportSections, setReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports/${props.match.params.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setId(response.data.id);
        setGrantId(response.data.grant_id);
        setTitle(response.data.title);
        setDeadline(response.data.deadline);
        setSubmitted(response.data.submitted);
        setReportSections(response.data.report_sections);
        setGrantSections(response.data.grant.grant_sections);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleHiddenGrant = () => {
    setIsGrantHidden(!isGrantHidden);
  };

  const toggleHiddenNewReportSection = () => {
    setIsHiddenNewReportSection(!isHiddenNewReportSection);
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports/${id}`,
        {
          grant_id: grantId,
          title: title,
          deadline: deadline,
          submitted: submitted,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        toggleHidden();
      })
      .catch((error) => {
        console.log("report update error", error);
      });
    event.preventDefault();
  };

  const updateReportSections = (newReportSection) => {
    let newReportSections = [...reportSections];
    newReportSections.push(newReportSection);
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
    console.log(newArr);
    setReportSections(newArr);
  };

  const handleReportDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data.message) {
          history.push("/grants/" + grantId);
        }
        console.log(`report delete ${response}`);
      })
      .catch((error) => {
        console.log(error);
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
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="datetime"
                    value={deadline}
                    name="deadline"
                    onChange={(event) => setDeadline(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Submitted</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="submitted"
                    checked={submitted}
                    onChange={(event) => setSubmitted(event.target.value)}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" className="btn-lg">
                    Submit
                  </Button>
                  <Button onClick={toggleHidden} className="btn-lg">
                    Close
                  </Button>
                </div>
              </Form>
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
          {reportSections.length ? (
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
                  {/* <Button onClick={() => this.handleReportSectionDelete(report_section.id)}>Delete</Button> */}
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
        to={`/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/reports-finalize/${id}`}
      >
        <Button>Report Finalize</Button>
      </Link>

      <Button variant="danger" onClick={handleReportDelete}>
        Delete Report
      </Button>
    </div>
  );
}
