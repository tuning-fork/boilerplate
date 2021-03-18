import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BiosNew from './BiosNew';
import OrganizationsNew from './OrganizationsNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Bios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bios: [],
      organizations: [],
      isHiddenOrganizationsNew: true,
      errors: [],
      openIndex: false,
      openNew: false
    };
  }

  toggleOpenIndex = () => {
    this.setState({
      openIndex: !this.state.openIndex,
    });
  }

  toggleOpenNew = () => {
    this.setState({
      openNew: !this.state.openNew,
    });
  }

  createUnzipped = (data) => {
    return data.map((filteredBio) => {
      filteredBio.isUnzipped = false
      return filteredBio
    })
  }

  toggleUnzipped = (id, bool) => {
    const alteredBios = this.state.filteredBios.map((bioKey) => {
      if (id === bioKey.id) {
        bioKey.isUnzipped = bool
      }
      console.log(bioKey)
      return bioKey
    })
    this.setState({
      filteredBios: alteredBios
    })
  }

  componentDidMount() {
    axios
      .get('/api/bios',
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
        // {withCredentials: true}
        )
      .then((response) => {
        const zippyBios = this.createUnzipped(response.data);
        console.log(zippyBios);
        this.setState({
          bios: response.data,
          filteredBios: zippyBios,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations', 
        // {headers: { Authorization: `Bearer ${localStorage.token}` }}
        {withCredentials: true})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  updateBios = (newBio) => {
    const bios = this.state.bios;
    bios.push(newBio);
    this.setState({
      bios: bios,
    });
  };

  updateOrganizations = (newOrganization) => {
    const organizations = this.state.organizations;
    organizations.push(newOrganization);
    this.setState({
      organizations: organizations,
    });
  };

  toggleHiddenOrganizationsNew = () => {
    this.setState({
      isHiddenOrganizationsNew: !this.state.isHiddenOrganizationsNew,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    };

      return(
        <div className="container">
          <h1>Bios</h1>
          <h1 onClick={this.toggleOpenIndex}>+</h1>
          {this.state.openIndex ? (
          <div>
          {!this.state.isHiddenOrganizationsNew ?
            <OrganizationsNew 
              updateOrganizations={this.updateOrganizations}
              toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
            /> : null
          }

      {this.state.bios.map((bio) => {
        console.log(bio);
        return (
          <div key={bio.id}>
          {(bio.isUnzipped === false) ? (
                <Card>
                  <Card.Header>
                        Name: 
                        <Link
                          to={`/bios/${bio.id}`}
                        >
                          {bio.first_name} {bio.last_name}
                        </Link>
                  </Card.Header>
                </Card>
              ) : (
                  <Card>
                    <Card.Header>
                      Name: 
                      <Link
                        to={`/bios/${bio.id}`}
                      >
                        {bio.first_name} {bio.last_name}
                      </Link>
                    </Card.Header>
                    <Card.Body>
                      <p>Title: {bio.title}</p>
                      <p dangerouslySetInnerHTML={{__html: bio.text}}></p>
                      <p>Organization: {bio.organization_name}</p>
                      <p>Wordcount: {bio.wordcount}</p>
                    </Card.Body>
                  </Card>
            )}
            </div> 
        );
      })
    }
    </div>
        ) : null}
        <div>
    <h3>Add Bio</h3>
    <h1 onClick={this.toggleOpenNew}>+</h1>
      {this.state.openNew ? (
        <BiosNew 
            updateBios={this.updateBios}
            organizations={this.state.organizations}
            isHiddenOrganizationsNew={this.state.isHiddenOrganizationsNew}
            toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
          />
      ) : null}
      </div>
    </div>
  )}
}

export default Bios;