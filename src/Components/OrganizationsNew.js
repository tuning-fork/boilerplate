import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class OrganizationsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      name: ""
    });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newOrganization = this.state;
    axios
      .post('/api/organizations', newOrganization, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateOrganizations(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('organization creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
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
        </Card.Body>
      </Card>
    );
  }
}

export default OrganizationsNew;