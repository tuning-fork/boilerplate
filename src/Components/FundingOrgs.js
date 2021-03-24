import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FundingOrgsNew from "./FundingOrgsNew";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function FundingOrgs() {
  const [loading, setLoading] = useState(true);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/funding_orgs", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setFundingOrgs(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setOrganizations(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    console.log("it worked!");
    window.scrollTo(0, 0);
  }, [loading]);

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

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
                <Card.Body key={fundingOrg.id}>
                  <Link to={`/funding_orgs/${fundingOrg.id}`}>
                    {fundingOrg.name}
                  </Link>
                </Card.Body>
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
