import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import { Title, Stack } from "@mantine/core";
import ErrorAlert from "../ErrorAlert";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import Container from "../design/Container/Container";
import GrantForm from "./GrantForm";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import "./GrantsNew.css";

export default function GrantsNew() {
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const [showingFundingOrgNew, setShowingFundingOrgNew] = useState(false);
  const { data: fundingOrgs, isLoading } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.id}/grants`);
  };

  const { mutate: createGrant, error } = useMutation(
    (grantFields) =>
      GrantsService.createGrant(organizationClient, {
        title: grantFields.title,
        fundingOrgId: grantFields.fundingOrgId,
        rfpUrl: grantFields.rfpUrl,
        purpose: grantFields.purpose,
        deadline: grantFields.deadline,
        totalWordCount: grantFields.totalWordCount,
      }),
    {
      onSuccess: (newGrant) => {
        alert("Grant created!");
        history.push(
          `/organizations/${currentOrganization.id}/grants/${newGrant.id}`
        );
      },
    }
  );

  if (isLoading) {
    return "Loading...";
  }

  const handleFundingOrg = () => {
    setShowingFundingOrgNew(false);
  };

  return (
    <div className="grants-new">
      <Container as="section" centered>
        <CurrentOrganizationLink
          className="grants-new__back-button"
          to="/grants"
        >
          <MdChevronLeft />
          Back to All Grants
        </CurrentOrganizationLink>
        <Stack>
          <Title order={1}>Add New Grant</Title>
          {error && <ErrorAlert error={error} />}
          <GrantForm
            fundingOrgs={fundingOrgs}
            onSubmit={createGrant}
            onCancel={handleCancel}
            handleFundingOrg={handleFundingOrg}
            showingFundingOrgNew={showingFundingOrgNew}
            setShowingFundingOrgNew={setShowingFundingOrgNew}
          />
        </Stack>
      </Container>
    </div>
  );
}
