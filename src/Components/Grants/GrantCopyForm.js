import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function GrantEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [copyTitle, setCopyTitle] = useState(props.grant.title);
  const [copyRfpUrl, setCopyRfpUrl] = useState(props.grant.rfp_url);
  const [copyDeadline, setCopyDeadline] = useState("");
  const [copyPurpose, setCopyPurpose] = useState(props.grant.purpose);

  const handleCopyGrant = (event) => {
    event.preventDefault();
    onSubmit({
      copyTitle,
      copyRfpUrl,
      copyDeadline,
      copyPurpose,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleCopyGrant}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="copyTitle"
          value={copyTitle}
          onChange={(event) => setCopyTitle(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>RFP URL</Form.Label>
        <Form.Control
          name="copyRfpUrl"
          value={copyRfpUrl}
          onChange={(event) => setCopyRfpUrl(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="datetime-local"
          name="copyDeadline"
          value={copyDeadline}
          onChange={(event) => setCopyDeadline(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Purpose</Form.Label>
        <Form.Control
          name="copyPurpose"
          value={copyPurpose}
          onChange={(event) => setCopyPurpose(event.target.value)}
          required
        />
      </Form.Group>
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
        onClick={handleCopyGrant}
      >
        Copy Grant
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
    </Form>
  );
}
