import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../hooks/useBuildOrganizationsLink";
import {
  deleteGrant,
  getGrant,
} from "../../services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../services/Organizations/FundingOrgsService";
import * as GrantsService from "../../services/Organizations/GrantsService";
import GrantForm from "./GrantForm";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";
import "./GrantEditPage.css";

export default function GrantEditPage() {
  const [grant, setGrant] = useState();
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this grant?`)) {
      deleteGrant(organizationClient, grantId)
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
    history.push(buildOrganizationsLink(`/grants/${grantId}`));

  const handleSubmit = (grantFields) => {
    GrantsService.updateGrant(organizationClient, grantId, {
      ...grantFields,
      organizationId: grant.organizationId,
      fundingOrgId: grant.fundingOrgId,
    })
      .then(setGrant)
      .then(goToGrant)
      .catch((error) => {
        console.error("grant update error", error);
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
          setFundingOrgs={setFundingOrgs}
          onSubmit={handleSubmit}
          onCancel={goToGrant}
        />
      </Container>
    </div>
  );
}
