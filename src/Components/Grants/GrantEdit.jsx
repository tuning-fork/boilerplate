import React from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantEdit.css";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import GrantForm from "./GrantForm";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";

export default function GrantEdit(props) {
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();
  const { data: grant } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const handleDelete = () => {
    // if (confirm(`Are you sure you want to delete this grant?`)) {
    //   GrantsService.deleteGrant(organizationClient, props.grant.id)
    //     .then(() => {
    //       alert("Grant deleted!");
    //       props.onClose();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert(
    //         "Eek! Something went wrong when deleting the grant. Try again soon."
    //       );
    //     });
    // }
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this grant?`)) {
      handleEditGrant({ archived: true })
        .then(() => {
          alert("Grant deleted!");
          props.onClose();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Eek! Something went wrong when deleting the grant. Try again soon."
          );
        });
    }
  };

  const { mutate: updateGrant } = useMutation(
    (newGrantFields) =>
      GrantsService.updateGrant(organizationClient, grant.id, newGrantFields),
    {
      onSuccess: () => {
        alert("Grant edited!");
        props.onClose();
      },
    }
  );

  const handleEditGrant = (newGrantFields) => {
    updateGrant({
      ...newGrantFields,
      name: newGrantFields.name,
    });
  };

  const goToGrant = () =>
    history.push(buildOrganizationsLink(`/grants/${grantId}`));

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
          onSubmit={handleEditGrant}
          onCancel={goToGrant}
        />
      </Container>
    </div>
  );
}
