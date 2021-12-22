import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import {
  copyGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import SignUpForm from "./SignUpForm";
import "./SignUp.css";

export default function GrantCopy() {
  const [grant, setGrant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
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
    <div className="signup">
      <Container as="section" centered>
        <h1 className="signup">Copy Grant</h1>
        <SignUpForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </div>
  );
}
