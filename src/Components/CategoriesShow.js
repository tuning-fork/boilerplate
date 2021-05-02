import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { id } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function CategoriesShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [editableName, setEditableName] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/categories/${props.match.params.category_id}/`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          setId(response.data.id);
          setName(response.data.name);
          setOrganizationId(response.data.organization_id);
          setOrganizationName(response.data.organization.name);
          setEditableName(response.data.name);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/categories/` + id,
        {
          name: editableName,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        setEditableName(response.data.name);
        toggleHidden();
        handleClose();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
    setEditableName(name);
    handleClose();
  };

  const handleCategoryDelete = () => {
    axios
      .delete(`/api/organizations/${currentOrganizationId}/categories/` + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message) {
          history.push(`/organizations/${currentOrganizationId}/categories`);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Card.Body>
          <h3>organization: {organizationName}</h3>
        </Card.Body>
      </Card>
      <br />
      <div>
        <div className="container">
          <Button onClick={toggleHidden}>Update Category</Button>
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
                      value={editableName}
                      name="editableName"
                      placeholder={editableName}
                      onChange={(event) => setEditableName(event.target.value)}
                      required
                    />
                  </Form.Group>
                  <div>
                    <Button
                      variant="outline-success"
                      type="submit"
                      style={{
                        maxWidth: "50%",
                        align: "center",
                        backgroundColor: "#23cb87",
                        color: "#09191b",
                        fontWeight: "bolder",
                      }}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline-success"
                      style={{
                        maxWidth: "50%",
                        align: "center",
                        backgroundColor: "#23cb87",
                        color: "#09191b",
                        fontWeight: "bolder",
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          ) : null}
          <Button onClick={handleCategoryDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
