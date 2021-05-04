import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

export default function FundingOrgsEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newName, setNewName] = useState(props.name);
  const [newWebsite, setNewWebsite] = useState(props.website);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newName,
      newWebsite,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={newName}
          name="newName"
          placeholder={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          value={newWebsite}
          name="newWebsite"
          placeholder={newWebsite}
          onChange={(event) => setNewWebsite(event.target.value)}
          required
        />
      </Form.Group>
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
    </Form>
  );
}
