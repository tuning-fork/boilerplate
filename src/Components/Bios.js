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
      query: '',
      errors: []
    };
  }
  componentDidMount() {
    axios
      .get('/api/bios',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          bios: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations', 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
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
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component container">
        <h1>Bios Index</h1>
        <h3>Add A Bio</h3>
        {!this.state.isHiddenOrganizationsNew ?
              <OrganizationsNew 
              updateOrganizations={this.updateOrganizations}
              toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
            /> : null
            }
        <br/>
        <BiosNew 
          updateBios={this.updateBios}
          organizations={this.state.organizations}
          toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
        />
        <br />
        {this.state.bios.map((bio) => {
          return (
            <div key={bio.id}>
              <Card>
                <Card.Header>
                  Name: <Link
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
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Bios;