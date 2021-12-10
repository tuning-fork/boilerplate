import { useState } from "react";
import Button from "../design/Button/Button";
import Dropdown from "../design/Dropdown/Dropdown";
import TextBox from "../design/TextBox/TextBox";
import FundingOrgsNew from "../FundingOrgs/FundingOrgsNew";

export default function GrantForm(props) {
  const [grantFields, setGrantFields] = useState({
    ...props.grant,
    title: props.grant?.title || "",
    rfpUrl: props.grant?.rfpUrl || "",
    deadline: props.grant?.deadline || "",
    purpose: props.grant?.purpose || "",
  });
  const [showingFundingOrgsNew, setShowingFundingOrgsNew] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(grantFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropdown
          altLabel="Add Funding Organization"
          onClickAltLabel={() => setShowingFundingOrgsNew(true)}
          labelText="Funding Organization"
          placeholder="Select a Funding Organization"
          value={grantFields.funding_org_id}
          options={props.fundingOrgs.map((fundingOrg) => ({
            value: fundingOrg.id,
            label: fundingOrg.name,
          }))}
          onChange={(option) =>
            setGrantFields({ ...grantFields, funding_org_id: option.value })
          }
        />
        <TextBox
          labelText="Title"
          value={grantFields.title}
          onChange={(event) =>
            setGrantFields({ ...grantFields, title: event.target.value })
          }
          value={grantFields.title}
          required
        />
        <TextBox
          labelText="RFP URL"
          value={grantFields.rfpUrl}
          onChange={(event) =>
            setGrantFields({ ...grantFields, rfpUrl: event.target.value })
          }
          value={grantFields.rfp_url}
          type="url"
          required
        />
        <TextBox
          labelText="Deadline"
          type="datetime-local"
          value={grantFields.deadline}
          onChange={(event) =>
            setGrantFields({ ...grantFields, deadline: event.target.value })
          }
          value={grantFields.deadline}
          className="grants-new__deadline"
          required
        />
        <TextBox
          labelText="Purpose"
          value={grantFields.purpose}
          onChange={(event) =>
            setGrantFields({ ...grantFields, purpose: event.target.value })
          }
          value={grantFields.purpose}
          required
        />
        <div className="grants-new__button-group">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <FundingOrgsNew
        show={showingFundingOrgsNew}
        onClose={() => setShowingFundingOrgsNew(false)}
      />
    </>
  );
}
