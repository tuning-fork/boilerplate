import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ReportsNew(props) {
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const clearForm = () => {
    setDeadline("");
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReport = {
      grant_id: props.grant_id,
      title: `Report for ${props.grant_title}`,
      deadline: deadline,
      submitted: submitted,
    };
    axios
      .post(
        `api/organizations/${currentOrganizationStore.currentOrganization.id}/grants/${props.grant_id}/reports`,
        newReport,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          toggleHidden();
          props.updateNewReports(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("report creation error", error);
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
                  value={`Report for ${props.grant_title}`}
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
