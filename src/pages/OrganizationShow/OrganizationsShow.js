import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import { useHistory } from "react-router-dom";
import OrganizationEditForm from "../../components/Organizations/OrganizationEditForm";
// import Modal from "../../components/Elements/Modal";

export default function OrganizationsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  // const history = useHistory();
  const [_newName, setNewName] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`/api/organizations/${props.match.params.org_id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setLoading(false);
        setNewName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.match.params.org_id]);

  const handleSubmit = ({ newName }) => {
    axios
      .patch(
        "/api/organizations/" + id,
        {
          name: newName,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        handleClose();
        setName(response.data.name);
      })
      .catch((error) => {
        console.error("organization update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  // const handleOrganizationDelete = () => {
  //   axios
  //     .delete("/api/organizations/" + id, {
  //       headers: { Authorization: `Bearer ${localStorage.token}` },
  //     })
  //     .then((response) => {
  //       if (response.data.message) {
  //         history.push("/organizations");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  const Header = (
    <Card.Header style={{ backgroundColor: "#09191b" }}>
      <h3
        style={{
          color: "#23cb87",
          fontWeight: "bolder",
          display: "inline",
        }}
      >
        Name: {name}
      </h3>
      {/* <FontAwesomeIcon
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
      /> */}
    </Card.Header>
  );

  return (
    <div className="container">
      <Card>{Header}</Card>
      {/* <Modal show={show} onClose={handleClose}> */}
        <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
          <Card.Body>
            <OrganizationEditForm
              name={name}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Card.Body>
        </Card>
      {/* </Modal> */}
    </div>
  );
}
