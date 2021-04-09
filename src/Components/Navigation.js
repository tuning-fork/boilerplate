import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

function Navigation(props) {
  const [currentUserStore, currentUserDispatch] = useCurrentUserContext();
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    props.history.push("/landing_page");
  };

  const history = useHistory();

  const handleChange = (event) => {
    const selectedOrgInfo = currentOrganizationStore.allUserOrganizations.filter(
      (userOrganization) => event.target.value == userOrganization.id
    );
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION_INFO",
      payload: selectedOrgInfo[0],
    });
  };

  return (
    <Navbar
      bg="black"
      variant="dark"
      expand="lg"
      sticky="top"
      style={{
        paddingTop: "1rem",
        marginBottom: "0px",
        align: "right",
        backgroundColor: "#0e272a",
      }}
    >
      <ul>
        {localStorage.token && localStorage.user_id ? (
          <div>
            <Nav className="mr-auto">
              <Nav.Item className="active">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="/grants">Grants</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleLogoutClick} to="/logout">
                  Logout
                </Nav.Link>
              </Nav.Item>
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
            </Nav>
          </div>
        ) : (
          <div>
            <Button
              href="/signup"
              variant="outline-light"
              style={{
                textColor: "#23cb87",
                fontWeight: "bold",
                display: "inline",
                margin: "1rem",
              }}
            >
              Sign Up
            </Button>
            <Button
              href="/login"
              variant="outline-light"
              style={{
                textColor: "#23cb87",
                fontWeight: "bold",
                display: "inline",
                margin: "1rem",
              }}
            >
              Log In
            </Button>
          </div>
        )}
      </ul>
    </Navbar>
  );
}

export default withRouter(Navigation);

{
  /* <Nav.Item className="active">
                  <Nav.Link href="/bios">Bios</Nav.Link>
                </Nav.Item>
                <Nav.Item className="active">
                  <Nav.Link href="/boilerplates">Boilerplates</Nav.Link>
                </Nav.Item>
                <Nav.Item className="active">
                  <Nav.Link href="/categories">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item className="active">
                  <Nav.Link href="/organizations">Organizations</Nav.Link>
                </Nav.Item>
                <Nav.Item className="active">
                  <Nav.Link href="/funding_orgs">Funding Orgs</Nav.Link>
                </Nav.Item> */
}
{
  /* <Nav>
                <Nav.Item className="active">
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item className="active">
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
                </Nav> */
}

// {currentOrganization: "pancake 3.0", currentOrganizationInfo: Array(3)}
// currentOrganization: "pancake 3.0"
// currentOrganizationInfo: Array(3)
// 0: {id: 1, name: "org1"}
// 1: {id: 2, name: "org2"}
// 2: {id: 3, name: "org3"}
// length: 3
// __proto__: Array(0)
// __proto__: Object
