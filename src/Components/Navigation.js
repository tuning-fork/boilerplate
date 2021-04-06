import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentUserContext } from "../Contexts/currentUserContext";

function Navigation(props) {
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    props.history.push("/landing_page");
  };

  const history = useHistory();
  const [state, dispatch] = useCurrentUserContext();

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
              <Nav.Item>
                <Nav.Link>{state?.currentUserInfo?.first_name}</Nav.Link>
              </Nav.Item>
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
