import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createGrantReport } from "../../Services/Organizations/Grants/GrantReportsService";

export default function ReportsNew(props) {
  const [deadline, setDeadline] = useState("");
  const [submitted, _setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [title, setTitle] = useState(`Report for ${props.grant_title}`);

  const { organizationClient } = useCurrentOrganization();

  const clearForm = () => {
    setDeadline("");
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReport = {
      grantUuid: props.grantUuid,
      title: title,
      deadline: deadline,
      submitted: submitted,
    };
    createGrantReport(organizationClient, props.grantUuid, newReport)
      .then((report) => {
        if (report) {
          toggleHidden();
          props.updateReports(report);
          clearForm();
        }
      })
      .catch((error) => {
        console.error("report creation error", error);
      });
  };

  return (
    <div>
      {isHidden ? (
        <Button onClick={toggleHidden}>Add Report</Button>
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
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="deadline"
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit">Submit New Report</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}
