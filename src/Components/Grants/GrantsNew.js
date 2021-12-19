import React, { useState, useEffect } from "react";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createGrant } from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "../design/Container/Container";
import "./GrantsNew.css";
import GrantForm from "./GrantForm";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function GrantsNew() {
  const [isLoading, setIsLoading] = useState(true);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const history = useHistory();
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getAllFundingOrgs(organizationClient)
      .then(setFundingOrgs)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [organizationClient]);

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganization.id}/grants`);
  };

  const handleSubmit = (grantFields) => {
    createGrant(organizationClient, {
      ...grantFields,
      organizationId: currentOrganization.id,
    })
      .then((grant) => {
        history.push(
          `/organizations/${currentOrganization.id}/grants/${grant.id}`
        );
      })
      .catch((error) => {
        console.error("grant creation error", error);
      });
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="grants-new">
      <Container as="section" centered>
        <CurrentOrganizationLink
          className="grants-new__back-button"
          to="/grants"
        >
          <MdChevronLeft />
          Back to All Grants
        </CurrentOrganizationLink>
        <h1 className="grants-new__header">Add New Grant</h1>
        <GrantForm
          fundingOrgs={fundingOrgs}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}
