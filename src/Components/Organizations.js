import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationsNew from "./OrganizationsNew";
import Card from "react-bootstrap/Card";
// import CurrentUser from "./CurrentUser";
import OrganizationUser from "./OrganizationUser";

export default function Organizations() {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
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
  }, []);

  const updateOrganizations = (newOrganization) => {
    const newOrganizations = [...organizations];
    newOrganizations.push(newOrganization);
    setOrganizations(newOrganizations);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <div className="flex container col">
        {/* <Card className="card-component">
          <CurrentUser />
        </Card> */}
      </div>
      <div className="flex container col">
        <Card className="card-component">
          <Card.Header className="card-component card-heading">
            Organizations
          </Card.Header>
          <OrganizationsNew updateOrganizations={updateOrganizations} />
          <div>
            {organizations.map((organization) => {
              return (
                <Link
                  key={organization.id}
                  to={`/organizations/${organization.id}`}
                >
                  {organization.name}
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
