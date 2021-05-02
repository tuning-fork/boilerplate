import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import OrganizationEditForm from "./Organizations/OrganizationEditForm";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function OrganizationsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
        setName(response.data.name);
      })
      .catch((error) => {
        console.log("organization update error", error);
      });
    event.preventDefault();
  };

  const handleCancel = (event) => {
    handleClose();
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
            onClick={handleOrganizationDelete}
          />
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
          <Card>
            <Card.Body>
              <OrganizationEditForm
                name={name}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
