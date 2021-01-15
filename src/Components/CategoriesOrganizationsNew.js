import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class CategoriesOrganizationsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "",
      organizationName: "",
      organization_id: "",
      isHiddenNew: true,
      errors: []
    };
  }

  clearForm = () => {
    this.setState({
      categoryName: "",
      organizationName: "",
      organization_id: ""
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
          this.props.toggleHiddenCategoriesOrganizationsNew();
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('organization creation error', error);
      });
    event.preventDefault();
  }

  handleSubmitCategory = (event) => {
    const { categoryName, organization_id } = this.state;
    axios
      .post('/api/categories', 
        {
          name: categoryName,
          organization_id: organization_id
        }, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then((response) => {
        if (response.data) {
          this.props.updateCategories(response.data);
          this.props.toggleHiddenCategoriesOrganizationsNew();
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('category creation error', error);
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

          {/* New Category */}

          <Form onSubmit={this.handleSubmitCategory}>
            <Form.Group>
              <Form.Label>New Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={this.state.categoryName}
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
                Add New Category
              </Button>
            </div>
          </Form>
          <br />
          <br />

        </Card.Body>
      </Card>
    );
  }
}

export default CategoriesOrganizationsNew;