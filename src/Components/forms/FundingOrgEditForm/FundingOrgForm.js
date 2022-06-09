import { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import "./FundingOrgForm.css";

export default function FundingOrgForm(props) {
  const [fundingOrgFields, setFundingOrgFields] = useState({
    ...props.fundingOrg,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(fundingOrgFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="fundingorg-form">
        <TextBox
          labelText="Name"
          value={fundingOrgFields.name}
          onChange={(event) =>
            setFundingOrgFields({
              ...fundingOrgFields,
              name: event.target.value,
            })
          }
          required
        />
        <TextBox
          labelText="Website"
          value={fundingOrgFields.website}
          onChange={(event) =>
            setFundingOrgFields({
              ...fundingOrgFields,
              website: event.target.value,
            })
          }
          required
        />
        <div className="fundingorg-form__actions">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
        {props.fundingOrg ? (
          <div>
            <Button color="error" onClick={props.onDelete}>
              Delete Funding Org
            </Button>
          </div>
        ) : null}
      </form>
    </>
  );
}
