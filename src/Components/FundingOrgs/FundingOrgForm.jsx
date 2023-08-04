import React, { useState } from "react";
import { Button } from "@mantine/core";
import TextBox from "../design/TextBox/TextBox";
import "./FundingOrgForm.css";

export default function FundingOrgForm(props) {
  const [fundingOrgFields, setFundingOrgFields] = useState({
    ...props.fundingOrg,
    name: props.fundingOrg?.name || "",
    website: props.fundingOrg?.website || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ ...fundingOrgFields });
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
          <Button variant="subtle" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
