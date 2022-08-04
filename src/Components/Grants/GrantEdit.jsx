import React from "react";
import { useQuery } from "react-query";
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
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();

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

  const { data: grant } = useQuery("grant", () =>
    getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("fundingOrgs", () =>
    getAllFundingOrgs(organizationClient)
  );

  const goToGrant = () =>
    history.push(buildOrganizationsLink(`/grants/${grantId}`));

  const handleSubmit = (grantFields) => {
    GrantsService.updateGrant(organizationClient, grantId, {
      ...grantFields,
      organizationId: grant.organizationId,
      fundingOrgId: grant.fundingOrgId,
    })
      .then(goToGrant)
      .catch((error) => {
        console.error("grant update error", error);
      });
  };

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
          onSubmit={handleSubmit}
          onCancel={goToGrant}
        />
      </Container>
    </div>
  );
}
