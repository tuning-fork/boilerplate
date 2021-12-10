import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import {
  copyGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import GrantForm from "./GrantForm";
import "./GrantCopy.css";

export default function GrantCopy() {
  const [grant, setGrant] = useState(null);
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
    getGrant(organizationClient, grantId).then(setGrant);
  }, [grantId, organizationClient]);

  return (
    <Container className="GrantCopy" as="section">
      <h1>Copy Grant</h1>
      <GrantForm
        fundingOrgs={[]}
        grant={grant}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Container>
  );
}
