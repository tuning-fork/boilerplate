import React from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import Dropdown from "../design/Dropdown/Dropdown";
import FundingOrgNew from "../FundingOrgs/FundingOrgNew";
import "./GrantForm.css";

export default function GrantForm(props) {
  const form = useForm({
    initialValues: {
      title: props.grant?.title || "",
      rfpUrl: props.grant?.rfpUrl || "",
      deadline: props.grant?.deadline || "",
      purpose: props.grant?.purpose || "",
    },
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });

  // const [grantFields, setGrantFields] = useState({
  //   ...props.grant,
  //   title: props.grant?.title || "",
  //   rfpUrl: props.grant?.rfpUrl || "",
  //   deadline: props.grant?.deadline || "",
  //   purpose: props.grant?.purpose || "",
  // });
  // const [showingAddFundingOrgModal, setShowingAddFundingOrgModal] =
  //   useState(false);

  // const handleCloseFundingOrgModal = (fundingOrgId) => {
  //   setShowingAddFundingOrgModal(false);
  //   if (fundingOrgId) {
  //     setGrantFields({ ...grantFields, fundingOrgId });
  //   }
  // };

  const handleSubmit = (grant) => {
    console.log({ grant });
    props.onSubmit(grant);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)} className="grant-form">
        {/* <Dropdown
          altLabel="Add Funding Organization"
          onClickAltLabel={() => setShowingAddFundingOrgModal(true)}
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
        /> */}
        {/* TODO: can we pass required attr? */}
        <TextInput label="Title" {...form.getInputProps("title")} />
        <TextInput
          label="RFP URL"
          type="url"
          {...form.getInputProps("rfpUrl")}
        />
        <DateTimePicker label="Deadline" {...form.getInputProps("deadline")} />
        <TextInput label="Purpose" {...form.getInputProps("purpose")} />
        <div className="grant-form__actions">
          <Button variant="subtle" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
      {/* <FundingOrgNew
        show={showingAddFundingOrgModal}
        onClose={handleCloseFundingOrgModal}
      /> */}
    </>
  );
}
