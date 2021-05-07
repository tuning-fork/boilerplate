import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FundingOrgsNew from "./FundingOrgsNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllFundingOrgs } from "../Services/Organizations/FundingOrgsService";

export default function FundingOrgs() {
  const [loading, setLoading] = useState(true);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getAllFundingOrgs(organizationClient)
        .then((response) => {
          setFundingOrgs(response.data);
          setLoading(false);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
    window.scrollTo(0, 0);
  }, [loading, currentOrganizationId]);

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

  useEffect(() => {}, [fundingOrgs]);

  if (loading === true) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  } else {
    return (
      <div className="flex-container">
        <div className="flex container col">
          <Card className="card-component">
            <Card.Header className="card-component card-heading">
              Funding Orgs
            </Card.Header>
            {fundingOrgs.map((fundingOrg) => {
              return (
                <Link
                  key={fundingOrg.id}
                  to={`/organizations/${currentOrganizationId}/funding_orgs/${fundingOrg.id}`}
                >
                  {fundingOrg.name}
                </Link>
              );
            })}
          </Card>
        </div>
        <div className="flex container col">
          <FundingOrgsNew updateFundingOrgs={updateFundingOrgs} />
        </div>
      </div>
    );
  }
}
