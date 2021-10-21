import React, { useState, useEffect } from "react";
import FundingOrgsNew from "../FundingOrgs/FundingOrgsNew";
import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { createGrant } from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";
import LeftArrowIcon from "@material-ui/icons/KeyboardArrowLeft";
import Container from "../design/Container/Container";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import Dropdown from "../design/Dropdown/Dropdown";
import "./GrantsNew.css";

export default function GrantsNew(props) {
  const [newGrant, setNewGrant] = useState({
    title: "",
    rfp_url: "",
    deadline: "",
    purpose: "",
    funding_org_id: null,
  });
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const history = useHistory();
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const [showingFundingOrgsNew, setShowingFundingOrgsNew] = useState(false);

  useEffect(() => {
    getAllFundingOrgs(organizationClient)
      .then((fundingOrgs) => {
        setFundingOrgs(fundingOrgs);
      })
      .catch((error) => console.log(error));
  }, [organizationClient]);

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganizationId}/grants`);
  };

  const handleCloseFundingOrgsNew = (fundingOrgId) => {
    setShowingFundingOrgsNew(false);
    if (fundingOrgId) {
      getAllFundingOrgs(organizationClient)
        .then((fundingOrgs) => {
          setFundingOrgs(fundingOrgs);
        })
        .catch((error) => console.log(error));
      setNewGrant({ ...newGrant, funding_org_id: fundingOrgId });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGrant(organizationClient, {
      ...newGrant,
      organization_id: currentOrganizationStore.currentOrganization.id,
    })
      .then((grant) => {
        history.push(
          `/organizations/${currentOrganizationId}/grants/${grant.id}`
        );
      })
      .catch((error) => {
        console.log("grant creation error", error);
      });
  };

  return (
    <Container as="section" centered className="grants-new">
      <Link
        className="grants-new__back-button"
        to={`/organizations/${currentOrganizationId}/grants/`}
      >
        <LeftArrowIcon />
        Back to All Grants
      </Link>
      <h1>Add New Grant</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Dropdown
            altLabel="Add Funding Organization"
            onClickAltLabel={() => {
              setShowingFundingOrgsNew(true);
            }}
            labelText="Funding Organization"
            placeholder="Select a Funding Organization"
            value={newGrant.funding_org_id}
            options={fundingOrgs.map((fundingOrg) => ({
              value: fundingOrg.id,
              label: fundingOrg.name,
            }))}
            onChange={(option) =>
              setNewGrant({ ...newGrant, funding_org_id: option.value })
            }
          />
          <TextBox
            labelText="Title"
            onChange={(event) =>
              setNewGrant({ ...newGrant, title: event.target.value })
            }
            required
          />
          <TextBox
            labelText="RFP URL"
            onChange={(event) =>
              setNewGrant({ ...newGrant, rfp_url: event.target.value })
            }
            type="url"
            required
          />
          <TextBox
            labelText="Deadline"
            type="datetime-local"
            onChange={(event) =>
              setNewGrant({ ...newGrant, deadline: event.target.value })
            }
            className="grants-new__deadline"
            required
          />
          <TextBox
            labelText="Purpose"
            onChange={(event) =>
              setNewGrant({ ...newGrant, purpose: event.target.value })
            }
            required
          />
          <div className="grants-new__button-group">
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
        <FundingOrgsNew
          show={showingFundingOrgsNew}
          onClose={handleCloseFundingOrgsNew}
        />
      </div>
    </Container>
  );
}
