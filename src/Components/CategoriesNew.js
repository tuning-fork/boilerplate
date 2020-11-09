import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class CategoriesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      organization_id: "",
      organizations: [],
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      name: "",
      organization_id: ""
    });
  };

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newCategory = this.state;
    axios
      .post('/api/categories', newCategory, {headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then((response) => {
        if (response.data) {
          this.props.updateCategories(response.data);
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
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
                Add New Category
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CategoriesNew;