import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  copyGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import GrantForm from "./GrantForm";
import "./GrantCopy.css";

export default function GrantCopy() {
  const [grant, setGrant] = useState(null);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantUuid } = useParams();
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(buildOrganizationsLink(`/grants/${grantUuid}`));
  };

  const handleSubmit = (newGrantFields) => {
    copyGrant(organizationClient, grantUuid, newGrantFields)
      .then((copiedGrant) => {
        alert("Grant copied!");
        history.push(buildOrganizationsLink(`/grants/${copiedGrant.uuid}`));
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Eek! Something went wrong when copying the grant. Try again soon."
        );
      });
  };

  const loadFundingOrgs = useCallback(() => {
    return getAllFundingOrgs(organizationClient).then(setFundingOrgs);
  }, [organizationClient, setFundingOrgs]);

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    Promise.all([
      getGrant(organizationClient, grantUuid).then(setGrant),
      loadFundingOrgs(),
    ]).finally(() => setIsLoading(false));
  }, [grantUuid, organizationClient, loadFundingOrgs]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="grant-copy">
      <Container as="section" centered>
        <h1 className="grant-copy__header">Copy Grant</h1>
        <GrantForm
          grant={{ ...grant, title: `${grant.title} copy` }}
          loadFundingOrgs={loadFundingOrgs}
          fundingOrgs={fundingOrgs}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
