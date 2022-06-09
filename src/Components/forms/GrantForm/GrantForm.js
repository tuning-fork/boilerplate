import { useState } from "react";
import Button from "../design/Button/Button";
import Dropdown from "../design/Dropdown/Dropdown";
import TextBox from "../design/TextBox/TextBox";
import FundingOrgNew from "../FundingOrgs/FundingOrgNew";
import parseDateFromInput from "../../lib/parseDateFromInput";
import formatDateForInput from "../../lib/formatDateForInput";
import "./GrantForm.css";

export default function GrantForm(props) {
  const [grantFields, setGrantFields] = useState({
    ...props.grant,
    title: props.grant?.title || "",
    rfpUrl: props.grant?.rfpUrl || "",
    deadline: props.grant?.deadline || "",
    purpose: props.grant?.purpose || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(grantFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grant-form">
        <Dropdown
          altLabel="Add Funding Organization"
          onClickAltLabel={() => props.setShowingFundingOrgNew(true)}
          labelText="Funding Organization"
          placeholder="Select a Funding Organization"
          value={grantFields.fundingOrgId}
          options={props.fundingOrgs.map((fundingOrg) => ({
            value: fundingOrg.id,
            label: fundingOrg.name,
          }))}
          onChange={(option) =>
            setGrantFields({ ...grantFields, fundingOrgId: option.value })
          }
        />
        <TextBox
          labelText="Title"
          value={grantFields.title}
          onChange={(event) =>
            setGrantFields({ ...grantFields, title: event.target.value })
          }
          required
        />
        <TextBox
          labelText="RFP URL"
          value={grantFields.rfpUrl}
          onChange={(event) =>
            setGrantFields({ ...grantFields, rfpUrl: event.target.value })
          }
          type="url"
          required
        />
        <TextBox
          labelText="Deadline"
          type="datetime-local"
          value={formatDateForInput(grantFields.deadline)}
          onChange={(event) =>
            setGrantFields({
              ...grantFields,
              deadline: parseDateFromInput(event.target.value),
            })
          }
          required
        />
        <TextBox
          labelText="Purpose"
          value={grantFields.purpose}
          onChange={(event) =>
            setGrantFields({ ...grantFields, purpose: event.target.value })
          }
          required
        />
        <div className="grant-form__actions">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <FundingOrgNew
        show={props.showingFundingOrgNew}
        onClose={props.handleFundingOrg}
        fundingOrgs={props.fundingOrgs}
        setFundingOrgs={props.setFundingOrgs}
      />
    </>
  );
}
