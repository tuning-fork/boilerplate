import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import * as GrantsService from "services/p0/Organizations/GrantsService";
import * as FundingOrgsService from "services/p0/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "components/design/Container/Container";
import GrantForm from "components/forms/GrantForm/GrantForm";
import CurrentOrganizationLink from "components/CurrentOrganizationLink";
import "./GrantsNewPage.css";

export default function GrantsNewPage() {
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const [showingFundingOrgNew, setShowingFundingOrgNew] = useState(false);
  const { data: fundingOrgs, isLoading } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.id}/grants`);
  };

  const { mutate: createGrant } = useMutation(
    (grantFields) => GrantsService.createGrant(organizationClient, grantFields),
    {
      onSuccess: (newGrant) => {
        alert("Grant created!");
        history.push(
          `/organizations/${currentOrganization.id}/grants/${newGrant.id}`
        );
      },
    }
  );

  function handleCreateGrant(newGrantFields) {
    createGrant({
      title: newGrantFields.title,
      fundingOrgId: newGrantFields.fundingOrgId,
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
