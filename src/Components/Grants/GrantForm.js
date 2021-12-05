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
          onChange={(event) =>
            setGrantFields({ ...grantFields, title: event.target.value })
          }
          required
        />
        <TextBox
          labelText="RFP URL"
          onChange={(event) =>
            setGrantFields({ ...grantFields, rfp_url: event.target.value })
          }
          type="url"
          required
        />
        <TextBox
          labelText="Deadline"
          type="datetime-local"
          onChange={(event) =>
            setGrantFields({ ...grantFields, deadline: event.target.value })
          }
          className="grants-new__deadline"
          required
        />
        <TextBox
          labelText="Purpose"
          onChange={(event) =>
            setGrantFields({ ...grantFields, purpose: event.target.value })
          }
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
