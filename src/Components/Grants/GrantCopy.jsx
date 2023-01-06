import React from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import GrantForm from "./GrantForm";
import "./GrantCopy.css";

export default function GrantCopy() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(buildOrganizationsLink(`/grants/${grantId}`));
  };

  const { mutate: copyGrant } = useMutation(
    (grantFields) =>
      GrantsService.copyGrant(organizationClient, grantId, grantFields),
    {
      onSuccess: (copyRes) => {
        alert("Grant created!");
        history.push(
          `/organizations/${currentOrganization.id}/grants/${copyRes.id}`
        );
      },
    }
  );

  const { data: grant } = useQuery("grant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("fundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  function handleCopyGrant(copyGrantFields) {
    copyGrant({
      ...copyGrantFields,
      sections: grant.sections,
    });
  }

  return (
    <div className="grant-copy">
      <Container as="section" centered>
        <h1 className="grant-copy__header">Copy Grant</h1>
        <GrantForm
          grant={{ ...grant, title: `${grant.title} copy` }}
          fundingOrgs={fundingOrgs}
          onSubmit={handleCopyGrant}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
