import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import {
  deleteGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import "./GrantEdit.css";
import GrantEditForm from "./GrantEditForm";
import * as GrantsService from "../../Services/Organizations/GrantsService";

export default function GrantEdit(props) {
  const [grant, setGrant] = useState(props.grant);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
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

  const handleSubmitGrantEdit = ({
    newTitle,
    newRfpUrl,
    newDeadline,
    newSubmitted,
    newSuccessful,
    newPurpose,
  }) => {
    GrantsService.updateGrant(organizationClient, grantId, {
      title: newTitle,
      rfp_url: newRfpUrl,
      deadline: newDeadline,
      submitted: newSubmitted,
      successful: newSuccessful,
      purpose: newPurpose,
      organization_id: grant.organizationId,
      funding_org_id: grant.fundingOrgId,
    })
      .then((updatedGrant) => {
        props.onSubmit();
        setGrant(updatedGrant);
      })
      .catch((error) => {
        console.error("grant update error", error);
      });
  };

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getGrant(organizationClient, grantId).then((grant) => {
      setGrant(grant);
    });

    getAllFundingOrgs(organizationClient).then((fundingOrgs) => {
      setFundingOrgs(fundingOrgs);
    });
  }, [grantId, organizationClient]);

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

  return (
    <Container className="GrantEdit" as="section">
      <header className="GrantEdit__Header">
        <h1>Edit Grant</h1>
        <Button variant="outline-dark" onClick={handleDelete}>
          Delete Grant
        </Button>
      </header>
      <GrantEditForm
        onSubmit={handleSubmitGrantEdit}
        onCancel={props.onCancel}
        updateFundingOrgs={updateFundingOrgs}
        fundingOrgs={fundingOrgs}
        grant={grant}
      />
    </Container>
  );
}
