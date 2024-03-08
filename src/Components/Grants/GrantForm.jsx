import React, { useState } from "react";
import { Button, TextInput, Select, Stack, Flex } from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import FundingOrgNew from "../FundingOrgs/FundingOrgNew";
import "./GrantForm.css";

export default function GrantForm(props) {
  const form = useForm({
    initialValues: {
      title: props.grant?.title || "",
      rfpUrl: props.grant?.rfpUrl || "",
      deadline: props.grant?.deadline || "",
      purpose: props.grant?.purpose || "",
      fundingOrgId: props.grant?.fundingOrgId || null,
    },
    validate: {
      title: hasLength({ min: 2 }, "Title must be at least two characters"),
    },
  });
  const [showingAddFundingOrgModal, setShowingAddFundingOrgModal] =
    useState(false);

  const handleCloseFundingOrgModal = (fundingOrgId) => {
    setShowingAddFundingOrgModal(false);
    if (fundingOrgId) {
      form.setFieldValue("fundingOrgId", fundingOrgId);
    }
  };

  const handleSubmit = (grant) => {
    props.onSubmit(grant);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)} className="grant-form">
        <Stack>
          {/* TODO: can we pass required attr? */}
          <Flex gap="md" align="flex-end">
            <Select
              style={{ flex: 1 }}
              label="Funding Organization"
              placeholder="Select a Funding Organization"
              data={props.fundingOrgs.map((fundingOrg) => ({
                value: fundingOrg.id,
                label: fundingOrg.name,
              }))}
              searchable
              nothingFound="No funding organizations found"
              clearable
              {...form.getInputProps("fundingOrgId")}
            />
            <Button onClick={() => setShowingAddFundingOrgModal(true)}>
              Add Funding Organization
            </Button>
          </Flex>
          <TextInput label="Title" {...form.getInputProps("title")} />
          <TextInput
            label="RFP URL"
            type="url"
            {...form.getInputProps("rfpUrl")}
          />
          <DateTimePicker
            label="Deadline"
            {...form.getInputProps("deadline")}
          />
          <TextInput label="Purpose" {...form.getInputProps("purpose")} />
          <div className="grant-form__actions">
            <Button variant="subtle" onClick={props.onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Stack>
      </form>
      <FundingOrgNew
        show={showingAddFundingOrgModal}
        onClose={handleCloseFundingOrgModal}
      />
    </>
  );
}
