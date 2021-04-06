import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "./Elements/Modal";
import { id } from "date-fns/locale";
import { useHistory } from "react-router-dom";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function CategoriesShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [isHidden, setIsHidden] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`/api/categories/${props.match.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setOrganizationId(response.data.organization_id);
        setOrganizationName(response.data.organization.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setOrganizations(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        "/api/categories/" + id,
        {
          name: name,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        updateOrganizationName(response.data.organization.name);
        toggleHidden();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCategoryDelete = () => {
    axios
      .delete("/api/categories/" + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message) {
          history.push("/categories");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOrganizationName = (organizationName) => {
    setOrganizationName(organizationName);
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className="component">
      <Card>
        <Card.Header>
          <h3>Name: {name}</h3>
        </Card.Header>
        <FontAwesomeIcon
          icon={faEdit}
          style={{
            color: "#fefefe",
            fontSize: "1.5rem",
            marginLeft: "160px",
          }}
          onClick={handleShow}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{
            color: "#fefefe",
            fontSize: "1.5rem",
            marginLeft: "10px",
          }}
          onClick={handleCategoryDelete}
        />
        <Card.Body>
          <h3>organization: {organizationName}</h3>
        </Card.Body>
      </Card>
      {/* <br /> */}
      <div>
        <div className="container">
          {/* <Button onClick={toggleHidden}>Update Category</Button> */}
          {/* {!isHidden ? ( */}
          <Modal show={show} onClose={handleClose}>
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
                  <Form.Control
                    as="select"
                    name="organizationId"
                    value={organizationId}
                    onChange={(event) => setOrganizationId(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Organization
                    </option>
                    {organizations.map((organization) => {
                      return (
                        <option
                          key={organization.id}
                          value={organization.id}
                          onChange={(event) =>
                            setOrganizationId(event.target.value)
                          }
                        >
                          {organization.name}
                        </option>
                      );
                    })}
                  </Form.Control>
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
          </Modal>
          {/* ) : null} */}
          <Button onClick={handleCategoryDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
