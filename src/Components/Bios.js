import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BiosNew from "./BiosNew";
import OrganizationsNew from "./OrganizationsNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function Bios(props) {
  const [loading, setLoading] = useState(true);
  const [bios, setBios] = useState([]);
  // const [organizations, setOrganizations] = useState([]);
  const [isHiddenOrganizationsNew, setIsHiddenOrganizationsNew] = useState(
    true
  );
  const [errors, setErrors] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [filteredBios, setFilteredBios] = useState([]);

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/bios`,
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
        // {withCredentials: true}
      )
      .then((response) => {
        const zippyBios = createUnzipped(response.data);
        console.log(zippyBios);
        setBios(response.data);
        setFilteredBios(zippyBios);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    setLoading(false);
  }, [currentOrganizationStore.currentOrganizationInfo.id]);

  const toggleOpenIndex = () => {
    setOpenIndex(!openIndex);
  };

  const toggleOpenNew = () => {
    setOpenNew(openNew);
  };

  const createUnzipped = (data) => {
    return data.map((filteredBio) => {
      filteredBio.isUnzipped = false;
      return filteredBio;
    });
  };

  const toggleUnzipped = (id, bool) => {
    const alteredBios = filteredBios.map((bioKey) => {
      if (id === bioKey.id) {
        bioKey.isUnzipped = bool;
      }
      console.log(bioKey);
      return bioKey;
    });
    setFilteredBios(alteredBios);
  };

  const updateBios = (newBio) => {
    const newBios = [...bios];
    newBios.push(newBio);
    setBios(newBios);
  };

  // const updateOrganizations = (newOrganization) => {
  //   const newOrganizations = organizations;
  //   newOrganizations.push(newOrganization);
  //   setOrganizations(organizations);
  // };

  // const toggleHiddenOrganizationsNew = () => {
  //   setIsHiddenOrganizationsNew(!isHiddenOrganizationsNew);
  // };

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
          <BiosNew
            updateBios={updateBios}
            // organizations={organizations}
            // isHiddenOrganizationsNew={isHiddenOrganizationsNew}
            // toggleHiddenOrganizationsNew={toggleHiddenOrganizationsNew}
          />
        </Modal>
      </div>
      <div>
        {/* <OrganizationsNew
          updateOrganizations={updateOrganizations}
          toggleHiddenOrganizationsNew={toggleHiddenOrganizationsNew}
        /> */}

        {bios.map((bio) => {
          console.log(bio);
          return (
            <div key={bio.id}>
              <ListGroup>
                <ListGroup.Item>
                  <Link
                    to={`/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/bios/${bio.id}`}
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
