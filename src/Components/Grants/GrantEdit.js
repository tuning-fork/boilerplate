import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import {
  deleteGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import "./GrantEdit.css";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import GrantForm from "./GrantForm";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";

export default function GrantEdit() {
  const [grant, setGrant] = useState();
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantUuid } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this grant?`)) {
      deleteGrant(organizationClient, grantUuid)
        .then(() => {
          alert("Grant deleted!");
          history.push(buildOrganizationsLink("/grants"));
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Eek! Something went wrong when deleting the grant. Try again soon."
          );
        });
    }
  };

  const goToGrant = () =>
    history.push(buildOrganizationsLink(`/grants/${grantUuid}`));

  const handleSubmit = (grantFields) => {
    GrantsService.updateGrant(organizationClient, grantUuid, {
      ...grantFields,
      organizationUuid: grant.organizationUuid,
      fundingOrgUuid: grant.fundingOrgUuid,
    })
      .then(setGrant)
      .then(goToGrant)
      .catch((error) => {
        console.error("grant update error", error);
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
    <div className="grant-edit">
      <Container as="section" centered>
        <header className="grant-edit__header">
          <h1>Edit Grant</h1>
          <Button color="error" onClick={handleDelete}>
            Delete Grant
          </Button>
        </header>
        <GrantForm
          grant={grant}
          fundingOrgs={fundingOrgs}
          loadFundingOrgs={loadFundingOrgs}
          onSubmit={handleSubmit}
          onCancel={goToGrant}
        />
      </Container>
    </div>
  );
}
