import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function CurrentUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/users/` +
          localStorage.user_id,
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
        // {withCredentials: true}
      )
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setOrganizationUsers(response.data.organization_users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const updateOrganizationUsers = (newOrganizationUser) => {
    const newOrganizationUsers = [...organizationUsers];
    newOrganizationUsers.push(newOrganizationUser);
    setOrganizationUsers(organizationUsers);
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/users/` +
          localStorage.user_id,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => toggleHidden())
      .catch((error) => {
        console.log("user update error", error);
      });
    event.preventDefault();
  };

  return (
    <div>
      <Card className="card-dashboard">
        <Card.Header>Welcome, {firstName}!</Card.Header>
        <Card.Body>
          <div>
            {isHidden ? (
              <Button onClick={toggleHidden}>Update Account Info</Button>
            ) : (
              <Button onClick={toggleHidden}>Close</Button>
            )}
            <br />
            <br />
            {!isHidden ? (
              <div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      name="firstName"
                      placeholder={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      name="lastName"
                      placeholder={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      name="email"
                      placeholder={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
                <br />
              </div>
            ) : null}
          </div>
          {/* Here are your current organizations:
            {organization_users.map((organization_user) => {
              return (
                <div key={organization_user.organization_id}>
                  <h4>{organization_user.organization_name}</h4>
                </div>
              );
            })}
            <br />
            <OrganizationUser
              updateOrganizationUsers={updateOrganizationUsers}
            /> */}
        </Card.Body>
      </Card>
    </div>
  );
}
