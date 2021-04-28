import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function OrganizationsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log(props.match);
    axios
      .get(`/api/organizations/${props.match.params.org_id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        "/api/organizations/" + id,
        {
          name: name,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        toggleHidden();
      })
      .catch((error) => {
        console.log("organization update error", error);
      });
    event.preventDefault();
  };

  const handleOrganizationDelete = () => {
    axios
      .delete("/api/organizations/" + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message) {
          history.push("/organizations");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h3>Name: {name}</h3>
        </Card.Header>
      </Card>
      <br />

      <div>
        <div className="container">
          <Button onClick={toggleHidden}>Update Organization</Button>
          <Button variant="danger" onClick={handleOrganizationDelete}>
            Delete Organization
          </Button>
          <br />
          <br />
          {!isHidden ? (
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      name="name"
                      placeholder={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit" className="btn-lg">
                      Submit
                    </Button>
                    <Button onClick={toggleHidden} className="btn-lg">
                      Close
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
