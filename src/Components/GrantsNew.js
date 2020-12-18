import React, { Component } from 'react';
import axios from 'axios';
import FundingOrgsOrganizationsNew from './FundingOrgsOrganizationsNew';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class GrantsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: false,
      successful: false,
      purpose: "",
      organization_id: "",
      funding_org_id: "",
      organizations: [],
      funding_orgs: [],
      isHiddenFundingOrgsOrganizationsNew: true,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/funding_orgs',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
          loading: false
        });
      })
      .catch((error) => console.log(error));
  }

  toggleHiddenFundingOrgsOrganizationsNew = () => {
    this.setState({
      isHiddenFundingOrgsOrganizationsNew: !this.state.isHiddenFundingOrgsOrganizationsNew,
    });
  }

  clearForm = () => {
    this.setState({
      title: "",
      rfp_url: "",
      deadline: "",
      purpose: "",
      organization_id: "",
      funding_org_id: ""
    });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateFundingOrgs = (newFundingOrg) => {
		const funding_orgs = this.state.funding_orgs;
		funding_orgs.push(newFundingOrg);
		this.setState({
			funding_orgs: funding_orgs,
		});
  };
  
  updateOrganizations = (newOrganization) => {
    const organizations = this.state.organizations;
    organizations.push(newOrganization);
    this.setState({
      organizations: organizations,
    });
  };

  handleSubmit(event) {
    const newGrant = this.state;
    axios
      .post('/api/grants', newGrant,
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateGrants(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('grant creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Card>
        {!this.state.isHiddenFundingOrgsOrganizationsNew ?
          <FundingOrgsOrganizationsNew 
            organizations={this.state.organizations}
            funding_orgs={this.state.funding_orgs}
            updateOrganizations={this.updateOrganizations}
            updateFundingOrgs={this.updateFundingOrgs}
            toggleHiddenFundingOrgsOrganizationsNew={this.toggleHiddenFundingOrgsOrganizationsNew}
          /> : null
        }
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control as="select"
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
            <Form.Group>
              <Form.Label>Select Funding Organization</Form.Label>
              <Form.Control as="select"
                name="funding_org_id"
                value={this.state.funding_org_id}
                onChange={this.handleChange}
                required
              >
              <option value="" disabled>Select Funding Organization</option>
              {this.state.funding_orgs.map(funding_org => {
                return(
                  <option key={funding_org.id} value={funding_org.id} onChange={this.handleChange}>{funding_org.name}</option>
                  );
              })}
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" size="sm" onClick={this.toggleHiddenFundingOrgsOrganizationsNew}>Add New Funding Organization and/or Organization</Button>
            <br />
            <br />
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RFP URL</Form.Label>
              <Form.Control
                name="rfp_url"
                value={this.state.rfp_url}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Purpose</Form.Label>
              <Form.Control
                name="purpose"
                value={this.state.purpose}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button type="submit">
                Add New Grant
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default GrantsNew;