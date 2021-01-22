import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class OrganizationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.user_id,
      organization_id: "",
      organizations: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      organization_id: ""
    });
  };

  componentDidMount() {
    axios
      .get('/api/organizations',
        {withCredentials: true})
      .then((response) => {
        this.setState({
          organizations: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newOrganizationUser = this.state;
    axios
      .post('/api/organization_users', newOrganizationUser, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateOrganizationUsers(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('organization user creation error', error);
      });
      event.preventDefault();
  }
  
  render () {
    return (
      <Card>
        <Card.Header>
          <h3>Add Your Organizations</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Select An Organization</Form.Label>
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
            <div className="text-center">
              <Button type="submit">
                Add New Organization User
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default OrganizationUser;