import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { createFundingOrg } from "../../Services/Organizations/FundingOrgsService";
import "./FundingOrgsNew.css";

export default function FundingOrgsNew(props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  // const [errors, setErrors] = useState([]);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFundingOrg = {
      name: name,
      website: website,
      organization_id: currentOrganizationId,
    };
    if (currentOrganizationId) {
      createFundingOrg(organizationClient, newFundingOrg)
        .then((fundingOrg) => {
          props.onClose(fundingOrg.id);
        })
        .catch((error) => {
          console.log("funding org creation error", error);
        });
    }
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Funding Organization"
      className="funding-orgs-new"
    >
      <form onSubmit={handleSubmit}>
        <TextBox labelText="Name" />
        <TextBox labelText="Website" />
        <div className="funding-orgs-new__button-group">
          <Button variant="outlined" onClick={props.onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}

{
  /* <Card className="card-dashboard">
  <Card.Header>Add Funding Org</Card.Header>
  <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Funding Organization Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          required
        />
      </Form.Group>
      <div>
        <Button
          type="submit"
          style={{
            maxWidth: "50%",
            align: "center",
          }}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          style={{
            maxWidth: "50%",
            align: "center",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Form>
    <br />
  </Card.Body>
</Card>; */
}
