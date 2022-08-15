import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  copyGrant,
  getGrant,
} from "../../services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../services/Organizations/FundingOrgsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import GrantForm from "./GrantForm";
import "./GrantCopy.css";

export default function GrantCopy() {
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(buildOrganizationsLink(`/grants/${grantId}`));
  };

  const handleSubmit = (newGrantFields) => {
    copyGrant(organizationClient, grantId, newGrantFields)
      .then((copiedGrant) => {
        alert("Grant copied!");
        history.push(buildOrganizationsLink(`/grants/${copiedGrant.id}`));
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Eek! Something went wrong when copying the grant. Try again soon."
        );
      });
  };

  const { data: grant } = useQuery("grant", () =>
    getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("fundingOrgs", () =>
    getAllFundingOrgs(organizationClient)
  );

  return (
    <div className="grant-copy">
      <Container as="section" centered>
        <h1 className="grant-copy__header">Copy Grant</h1>
        <GrantForm
          grant={{ ...grant, title: `${grant.title} copy` }}
          fundingOrgs={fundingOrgs}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
