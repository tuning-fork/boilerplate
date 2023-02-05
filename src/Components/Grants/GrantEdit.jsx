import React from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantEdit.css";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import GrantForm from "./GrantForm";
import Container from "../design/Container/Container";

export default function GrantEdit() {
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();
  const { data: grant } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const { mutate: updateGrant } = useMutation(
    (newGrantFields) =>
      GrantsService.updateGrant(organizationClient, grant.id, newGrantFields),
    {
      onSuccess: (updateRes) => {
        alert("Grant edited!");
        if (updateRes.archived) {
          history.push(buildOrganizationsLink(`/grants`));
        } else goToGrant();
      },
    }
  );

  const handleEditGrant = (newGrantFields) => {
    updateGrant({
      ...newGrantFields,
      name: newGrantFields.name,
    });
  };

  const goToGrant = () =>
    history.push(buildOrganizationsLink(`/grants/${grantId}`));

  return (
    <div className="grant-edit">
      <Container as="section" centered>
        <header className="grant-edit__header">
          <h1>Edit Grant</h1>
        </header>
        <GrantForm
          grant={grant}
          fundingOrgs={fundingOrgs}
          onSubmit={handleEditGrant}
          onCancel={goToGrant}
        />
      </Container>
    </div>
  );
}
