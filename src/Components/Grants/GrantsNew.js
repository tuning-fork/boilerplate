import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "../design/Container/Container";
import "./GrantsNew.css";
import GrantForm from "./GrantForm";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function GrantsNew() {
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const [showingFundingOrgNew, setShowingFundingOrgNew] = useState(false);
  const { data: fundingOrgs, isLoading } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.uuid}/grants`);
  };

  const { mutate: createGrant } = useMutation(
    (grantFields) => GrantsService.createGrant(organizationClient, grantFields),
    {
      onSuccess: (newGrant) => {
        alert("Grant created!");
        history.push(
          `/organizations/${currentOrganization.uuid}/grants/${newGrant.uuid}`
        );
      },
    }
  );

  function handleCreateGrant(newGrantFields) {
    createGrant({
      title: newGrantFields.title,
      fundingOrgUuid: newGrantFields.fundingOrgUuid,
      rfpUrl: newGrantFields.rfpUrl,
      purpose: newGrantFields.purpose,
      deadline: newGrantFields.deadline,
      totalWordCount: newGrantFields.totalWordCount,
    });
  }

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
        <h1 className="grants-new__header">Add New Grant</h1>
        <GrantForm
          fundingOrgs={fundingOrgs}
          onSubmit={handleCreateGrant}
          onCancel={handleCancel}
          handleFundingOrg={handleFundingOrg}
          showingFundingOrgNew={showingFundingOrgNew}
          setShowingFundingOrgNew={setShowingFundingOrgNew}
        />
      </Container>
    </div>
  );
}
