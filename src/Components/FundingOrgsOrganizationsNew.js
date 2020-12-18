import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class FundingOrgsOrganizationsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundingOrgName: "",
      website: "",
      organizationName: "",
      organization_id: "",
      isHiddenNew: true,
      errors: []
    };
  }

  clearForm = () => {
    this.setState({
      fundingOrgName: "",
      website: "",
      organizationName: "",
      organization_id: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmitOrganization = (event) => {
    const { organizationName } = this.state;
    axios
      .post('/api/organizations',
        {
          name: organizationName
        }, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateOrganizations(response.data);
          this.props.toggleHiddenFundingOrgsOrganizationsNew();
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('organization creation error', error);
      });
    event.preventDefault();
  }

  handleSubmitFundingOrgs = (event) => {
    const { fundingOrgName, organization_id, website } = this.state;
    axios
      .post('/api/funding_orgs', 
        {
          name: fundingOrgName,
          organization_id: organization_id,
          website: website
        }, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then((response) => {
        if (response.data) {
          this.props.updateFundingOrgs(response.data);
          this.props.toggleHiddenFundingOrgsOrganizationsNew();
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('funding org creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Card>
        <Card.Body>

          {/* New Organization */}
          
          <Form onSubmit={this.handleSubmitOrganization}>
            <Form.Group>
              <Form.Label>New Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                value={this.state.organizationName}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button type="submit">
                Add New Organization
              </Button>
            </div>
          </Form>
          <br />
          <br />

          {/* New FundingOrg */}

          <Form onSubmit={this.handleSubmitFundingOrgs}>
            <Form.Group>
              <Form.Label>New Funding Org Name</Form.Label>
              <Form.Control
                type="text"
                name="fundingOrgName"
                value={this.state.fundingOrgName}
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
                {this.props.organizations.map(organization => {
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
        </Card.Body>
      </Card>
    );
  }
}

export default FundingOrgsOrganizationsNew;