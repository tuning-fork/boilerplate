import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ReportEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDeadline, setNewDeadline] = useState(props.deadline);
  const [newSubmitted, setNewSubmitted] = useState(props.submitted);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newTitle,
      newDeadline,
      newSubmitted,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          name="newTitle"
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="datetime"
          value={newDeadline}
          name="newDeadline"
          onChange={(event) => setNewDeadline(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Submitted</Form.Label>
        <Form.Check
          type="checkbox"
          name="newSubmitted"
          checked={newSubmitted}
          onChange={(event) => setNewSubmitted(event.target.checked)}
        />
      </Form.Group>
      <div className="text-center">
        <div>
          <Button
            variant="outline-success"
            type="submit"
            style={{
              maxWidth: "50%",
              align: "center",
              backgroundColor: "#23cb87",
              color: "#09191b",
              fontWeight: "bolder",
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <Button
            variant="outline-success"
            style={{
              maxWidth: "50%",
              align: "center",
              backgroundColor: "#23cb87",
              color: "#09191b",
              fontWeight: "bolder",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}
