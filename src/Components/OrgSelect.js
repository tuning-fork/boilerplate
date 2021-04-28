import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function OrgSelect() {
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const history = useHistory();
  console.log(currentUserStore.currentUserInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    // currentUserDispatch(useCurrentUserContext);
    console.log(currentUserStore);
  }, [currentUserStore.currentUserInfo]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    history.push("/login");
  };

  const handleChange = (event) => {
    const selectedOrgInfo = currentOrganizationStore.allUserOrganizations.filter(
      (userOrganization) => event.target.value == userOrganization.id
    );
    localStorage.setItem("org_id", selectedOrgInfo[0].id);
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION_INFO",
      payload: selectedOrgInfo[0],
    });
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="flex-row row" style={{ paddingBottom: ".5rem" }}>
        <div className="w-100">
          <h1>Welcome, {currentUserStore?.currentUserInfo?.first_name}</h1>
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
            currentOrganizationStore.currentOrganizationInfo == null
              ? "0"
              : currentOrganizationStore.currentOrganizationInfo.id
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
                <option
                  key={userOrganization.id}
                  value={userOrganization.id}
                  // onChange={(event) => {
                  //   currentOrganizationDispatch({
                  //     type: "SET_CURRENT_ORGANIZATION_INFO",
                  //     payload: userOrganization,
                  //   });
                  // }}
                >
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
