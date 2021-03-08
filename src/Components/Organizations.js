import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrganizationsNew from './OrganizationsNew';
import Card from 'react-bootstrap/Card';

class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      organizations: [],
      query: '',
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

  componentDidMount() {
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  updateOrganizations = (newOrganization) => {
    const organizations = this.state.organizations;
    organizations.push(newOrganization);
    this.setState({
      organizations: organizations,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div className="container">
      <h1>Organizations Index</h1>
      <h1 onClick={this.toggleOpenIndex}>+</h1>
      {this.state.openIndex ? (
          <div>
        {this.state.organizations.map((organization) => {
          return (
            <Card key={organization.id}>
              <Card.Header> 
                <Link
                    to={`/organizations/${organization.id}`}
                  >
                    {organization.name}
                  </Link>
              </Card.Header>
            </Card>
          );
        })}
        </div>
        ) : null}
        <br />
        <h3>Add An Organization</h3>
        <h1 onClick={this.toggleOpenNew}>+</h1>
      {this.state.openNew ? (
        <OrganizationsNew 
          updateOrganizations={this.updateOrganizations}
        />
        ) : null}
      </div>
    );
  }
}

export default Organizations;