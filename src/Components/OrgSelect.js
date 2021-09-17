import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function OrgSelect() {
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const { currentOrganizationStore, currentOrganizationDispatch } =
    useCurrentOrganizationContext();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(currentUserStore);
  }, [currentUserStore, currentUserStore.currentUser]);

  const handleChange = (event) => {
    const selectedOrgInfo =
      currentOrganizationStore.allUserOrganizations.filter(
        (userOrganization) => event.target.value == userOrganization.id
      );
    localStorage.setItem("org_id", selectedOrgInfo[0].id);
    console.log({ currentUserStore });
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION",
      payload: {
        currentOrganization: selectedOrgInfo[0],
        jwt: currentUserStore?.jwt,
      },
    });
    history.push(`/organizations/${selectedOrgInfo[0].id}/dashboard`);
  };

  return (
    <div>
      <div className="flex-row row" style={{ paddingBottom: ".5rem" }}>
        <div className="w-100">
          <h1>Welcome, {currentUserStore?.currentUser?.first_name}</h1>
          <h3>
            Please select an organization to continue to your organization
            dashboard:
          </h3>
        </div>
      </div>
      <Form.Group>
        <Form.Label>Organization</Form.Label>
        <Form.Control
          as="select"
          name="organizationId"
          value={
            currentOrganizationStore.currentOrganization == null
              ? "0"
              : currentOrganizationStore.currentOrganization.id
          }
          onChange={handleChange}
          required
        >
          <option value="0" disabled>
            Select Organization
          </option>
          {currentOrganizationStore.allUserOrganizations?.map(
            (userOrganization) => {
              return (
                <option key={userOrganization.id} value={userOrganization.id}>
                  {userOrganization.name}
                </option>
              );
            }
          )}
        </Form.Control>
      </Form.Group>
    </div>
  );
}
