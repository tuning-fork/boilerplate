import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "./../Elements/Modal";
import formatDateForInput from "../../Helpers/formatDateForInput";
import parseDateFromInput from "../../Helpers/parseDateFromInput";
import FundingOrgsNew from "./../FundingOrgsNew";

export default function GrantEditForm(props) {
  const { onSubmit, onCancel, updateFundingOrgs } = props;
  const [newGrantFields, setNewGrantFields] = useState({
    deadline: new Date(props.grant.deadline),
    funding_org_id: props.grant.funding_org_id,
    purpose: props.grant.purpose,
    rfp_url: props.grant.rfp_url,
    title: props.grant.title,
    submitted: props.grant.submitted,
    successful: props.grant.successful,
  });

  const [showFundingOrgsNew, setShowFundingOrgsNew] = useState(false);
  const handleCloseFundingOrgsNew = () => {
    setShowFundingOrgsNew(false);
  };

  const handleShowFundingOrgsNew = () => setShowFundingOrgsNew(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newGrantFields);
    updateFundingOrgs();
  };

  const handleCancel = (event) => {
    onCancel();
  };

  const handleChangeField = (field) => (event) => {
    const newValue =
      field === "deadline"
        ? parseDateFromInput(event.target.value)
        : event.target.value;

    setNewGrantFields((fields) => ({
      ...fields,
      [field]: newValue,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="GrantEdit__Inputs">
          <Form.Group>
            <Form.Label>Funding Organization</Form.Label>
            <Form.Control
              as="select"
              value={newGrantFields.funding_org_id || ""}
              onChange={handleChangeField("funding_org_id")}
              required
            >
              {props.fundingOrgs.map((fundingOrg) => (
                <option key={fundingOrg.id} value={fundingOrg.id}>
                  {fundingOrg.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            size="sm"
            onClick={handleShowFundingOrgsNew}
          >
            Add New FundingOrg
          </Button>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newGrantFields.title}
              onChange={handleChangeField("title")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RFP URL</Form.Label>
            <Form.Control
              type="url"
              value={newGrantFields.rfp_url}
              onChange={handleChangeField("rfp_url")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                newGrantFields.deadline
                  ? formatDateForInput(newGrantFields.deadline)
                  : ""
              }
              onChange={handleChangeField("deadline")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              type="text"
              value={newGrantFields.purpose}
              onChange={handleChangeField("purpose")}
              required
            />
          </Form.Group>
        </div>
        <div className="GrantEdit__Actions">
          <Button variant="outline-dark" size="lg" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="dark" size="lg" type="submit">
            Finish
          </Button>
        </div>
      </Form>
      <Modal show={showFundingOrgsNew} onClose={handleCloseFundingOrgsNew}>
        <FundingOrgsNew
          handleCloseFundingOrgsNew={handleCloseFundingOrgsNew}
          updateFundingOrgs={updateFundingOrgs}
          setNewGrantFields={setNewGrantFields}
        />
      </Modal>
    </div>
  );
}
