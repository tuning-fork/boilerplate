import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

class GrantsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: "",
      organizations: [],
      funding_orgs: [],
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: ""
    });
  };

  componentDidMount() {
    axios
      .get('/api/organizations')
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/funding_orgs')
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
          loading: false,
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newGrant = this.state;
    axios
      .post('/api/grants', newGrant, {
      })
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
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
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
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Submitted</Form.Label>
              <Form.Control
                name="submitted"
                value={this.state.submitted}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Successful</Form.Label>
              <Form.Control
                name="successful"
                value={this.state.successful}
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
                  <option key={organization.id} value={organization.id} onChange={this.handleChange}>{organization.name}</option>
                  );
              })}
              </Form.Control>
              </Form.Group>
            <Form.Group>
            <Form.Label>Funding Organization</Form.Label>

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
            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Grant
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default GrantsNew;