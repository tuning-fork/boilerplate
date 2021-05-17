import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BiosNew from "./BiosNew";
import axios from "axios";
import Modal from "../Elements/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getAllBios } from "../../Services/Organizations/BiosService";

export default function Bios(props) {
  const [loading, setLoading] = useState(true);
  const [bios, setBios] = useState([]);
  const [errors, setErrors] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [filteredBios, setFilteredBios] = useState([]);
  const [sortParam, setSortParam] = useState("");

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();

  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      getAllBios(organizationClient)
        .then((bios) => {
          const zippyBios = createUnzipped(bios);
          console.log(zippyBios);
          setBios(bios);
          setFilteredBios(zippyBios);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
    setLoading(false);
  }, [currentOrganizationId]);

  const createUnzipped = (data) => {
    return data.map((filteredBio) => {
      filteredBio.isUnzipped = false;
      return filteredBio;
    });
  };

  const updateBios = (newBio) => {
    const newBios = [...bios, newBio];
    setBios(newBios);
  };

  useEffect(() => {}, [bios]);

  const handleSortParamSelect = (event) => {
    setSortParam(event.target.value);
  };

  const sortBios = (sortParam) => {
    const filteredBiosClone = [...filteredBios];
    filteredBiosClone.sort(function (a, b) {
      return a[sortParam].localeCompare(b[sortParam]);
    });
    setFilteredBios(filteredBiosClone);
  };

  useEffect(() => {
    sortBios(sortParam);
  }, [sortParam]);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Bios</h1>
      <Button onClick={handleShow}>Add Bio</Button>
      <div>
        <Modal onClose={handleClose} show={show}>
          <BiosNew updateBios={updateBios} />
        </Modal>
      </div>
      <div>
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Sort Parameter</Form.Label>
              <Form.Control
                as="select"
                name="sortParam"
                value={sortParam}
                onChange={handleSortParamSelect}
                required
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="last_name">Name</option>
                <option value="title">Title</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>

        {filteredBios.map((bio) => {
          console.log(bio);
          return (
            <div key={bio.id}>
              <ListGroup>
                <ListGroup.Item>
                  <Link
                    to={`/organizations/${currentOrganizationId}/bios/${bio.id}`}
                  >
                    {bio.first_name} {bio.last_name}
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
