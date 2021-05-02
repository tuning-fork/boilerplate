import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportSectionsUpdateFinal from "./ReportSectionsUpdateFinal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ReportsFinalizeShow(props) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [reportSections, setReportSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/grants/${props.match.params.grant_id}/reports/${props.match.params.report_id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          setId(response.data.id);
          setTitle(response.data.title);
          setDeadline(response.data.deadline);
          setSubmitted(response.data.submitted);
          setReportSections(response.data.report_sections);
          setLoading(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/grants/${props.grant_id}/reports/` +
          id,
        {
          title: title,
          deadline: deadline,
          submitted: submitted,
          report_sections: [],
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        toggleHidden();
      })
      .catch((error) => {
        console.log("report update error", error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Report Finalize - View and Finalize Report Draft</h1>
      <h5>{title}</h5>
      <h5>{deadline}</h5>
      <h5>Submitted: {submitted ? "yes" : "not yet"}</h5>

      {/* Report sections */}

      <br />
      <div>
        {reportSections.map((reportSection) => {
          return (
            <div key={reportSection.id}>
              <ReportSectionsUpdateFinal
                report_id={id}
                grant_id={props.grant_id}
                report_section_id={reportSection.id}
                report_section_title={reportSection.title}
                report_section_text={reportSection.text}
                updateReportSections={updateReportSections}
              />
            </div>
          );
        })}
      </div>

      {/* Report update */}

      <div className="container">
        <Button onClick={toggleHidden}>Update Report</Button>
        <br />
        <br />
        {!isHidden ? (
          <div>
            <div>
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
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
