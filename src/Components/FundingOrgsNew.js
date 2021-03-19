import React, { Component } from 'react';
import axios from 'axios';
import OrganizationsNew from './OrganizationsNew';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class FundingOrgsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      website: '',
      organization_id: '',
      organizations: [],
      errors: []
    };
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
      })
      .catch((error) => console.log(error));
  }

  updateOrganizations = (newOrganization) => {
		const organizations = this.state.organizations;
		organizations.push(newOrganization);
		this.setState({
			organizations: organizations,
    });
    // console.log("updated organizations");
  }

  clearForm = () => {
    this.setState({
      name: '',
      website: '',
      organization_id: ''
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const newFundingOrg = this.state;
    axios
      .post('/api/funding_orgs', newFundingOrg, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then((response) => {
        if (response.data) {
          this.props.updateFundingOrgs(response.data);
          // this.props.toggleHiddenFundingOrgsNew();
          this.clearForm();
        }
      })
      .catch((error) => {
        console.log('funding org creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Card className="card-dashboard">
      <Card.Header>Add Funding Org</Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Funding Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={this.state.website}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control 
                as="select"
                name="organization_id"
                value={this.state.organization_id}
                onChange={this.handleChange}
                required
              >
                <option value="" disabled>Select Organization</option>
                {this.state.organizations.map(organization => {
                  return(
                    <option 
                      key={organization.id} 
                      value={organization.id} 
                      onChange={this.handleChange}
                    >
                      {organization.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            
            <div className="text-center">
              <Button type="submit">
                Add New Funding Org
              </Button>
            </div>
          </Form>
          <br />
          <OrganizationsNew 
            updateOrganizations={this.updateOrganizations}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default FundingOrgsNew;
