import React from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantEdit.css";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import GrantForm from "./GrantForm";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";

export default function GrantEdit() {
  const { organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grantId } = useParams();
  const history = useHistory();
  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const { data: fundingOrgs } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const handleDelete = () => {
    // console.log("you deleted this grant!");
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
      // GrantsService.updateGrant(organizationClient, props.grant.id, {
      //   archived: true,
      // })
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
      GrantsService.updateGrant(
        organizationClient,
        newGrantFields.id,
        newGrantFields
      ),
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
