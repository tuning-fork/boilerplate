import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { id } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import CategoryEditForm from "./Categories/CategoryEditForm";
import countWords from "../Helpers/countWords";

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
    currentOrganizationStore.currentOrganizationInfo &&
    currentOrganizationStore.currentOrganizationInfo.id;

  const [newName, setNewName] = useState("");

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
          setNewName(response.data.name);
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

  const handleSubmit = ({ newName }) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/categories/` + id,
        {
          name: newName,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        setName(response.data.name);
        toggleHidden();
        handleClose();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
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
                <CategoryEditForm
                  name={name}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              </Card.Body>
            </Card>
          ) : null}
          <Button onClick={handleCategoryDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
