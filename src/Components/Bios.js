import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BiosNew from "./BiosNew";
import OrganizationsNew from "./OrganizationsNew";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default function Bios() {
  // constructor(props) {
  //   super(props);

  const [loading, setLoading] = useState(true);
  const [bios, setBios] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isHiddenOrganizationsNew, setIsHiddenOrganizationsNew] = useState(
    true
  );
  const [errors, setErrors] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [filteredBios, setFilteredBios] = useState([]);

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

  useEffect(() => {
    axios
      .get(
        "/api/bios",
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
    axios
      .get(
        "/api/organizations",
        // {headers: { Authorization: `Bearer ${localStorage.token}` }}
        { withCredentials: true }
      )
      .then((response) => {
        setOrganizations(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // componentDidMount() {
  //   axios
  //     .get(
  //       "/api/bios",
  //       { headers: { Authorization: `Bearer ${localStorage.token}` } }
  //       // {withCredentials: true}
  //     )
  //     .then((response) => {
  //       const zippyBios = this.createUnzipped(response.data);
  //       console.log(zippyBios);
  //       this.setState({
  //         bios: response.data,
  //         filteredBios: zippyBios,
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  //   axios
  //     .get(
  //       "/api/organizations",
  //       // {headers: { Authorization: `Bearer ${localStorage.token}` }}
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       this.setState({
  //         organizations: response.data,
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }

  const updateBios = (newBio) => {
    const bios = bios;
    bios.push(newBio);
    setBios(bios);
  };

  const updateOrganizations = (newOrganization) => {
    const organizations = organizations;
    organizations.push(newOrganization);
    setOrganizations(organizations);
  };

  const toggleHiddenOrganizationsNew = () => {
    setIsHiddenOrganizationsNew(!isHiddenOrganizationsNew);
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
      <h1>Bios</h1>
      <div>
        <OrganizationsNew
          updateOrganizations={updateOrganizations}
          toggleHiddenOrganizationsNew={toggleHiddenOrganizationsNew}
        />

        {bios.map((bio) => {
          console.log(bio);
          return (
            <div key={bio.id}>
              {bio.isUnzipped === false ? (
                <Card>
                  <Card.Header>
                    Name:
                    <Link to={`/bios/${bio.id}`}>
                      {bio.first_name} {bio.last_name}
                    </Link>
                  </Card.Header>
                </Card>
              ) : (
                <Card>
                  <Card.Header>
                    Name:
                    <Link to={`/bios/${bio.id}`}>
                      {bio.first_name} {bio.last_name}
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    <p>Title: {bio.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: bio.text }}></p>
                    <p>Organization: {bio.organization_name}</p>
                    <p>Wordcount: {bio.wordcount}</p>
                  </Card.Body>
                </Card>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <h3>Add Bio</h3>
        <BiosNew
          updateBios={updateBios}
          organizations={organizations}
          isHiddenOrganizationsNew={isHiddenOrganizationsNew}
          toggleHiddenOrganizationsNew={toggleHiddenOrganizationsNew}
        />
      </div>
    </div>
  );
}
