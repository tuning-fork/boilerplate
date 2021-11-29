import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ReportFinalizeEditForm(props) {
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
          onChange={(event) => setNewSubmitted(event.target.value)}
        />
      </Form.Group>
      <div className="text-center">
        <Button type="submit" className="btn-lg">
          Submit
        </Button>
        <Button onClick={onCancel} className="btn-lg">
          Close
        </Button>
      </div>
    </Form>
  );
}
