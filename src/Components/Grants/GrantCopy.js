import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
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
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
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

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    Promise.all([
      getGrant(organizationClient, grantId).then(setGrant),
      getAllFundingOrgs(organizationClient).then(setFundingOrgs),
    ]).finally(() => setIsLoading(false));
  }, [grantId, organizationClient]);

  if (isLoading) {
    return "Loading...";
  }

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
