import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CategoriesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      organization_id: "",
      isHidden: true,
      organizations: [],
      organization_name: "",
      errors: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/categories/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          organization_id: response.data.organization_id,
          organization_name: response.data.organization.name,
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
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

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { name, organization_id } = this.state;
    axios
      .patch(
        '/api/categories/' + this.state.id,
        {
          name: name,
          organization_id: organization_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then((response) => {
        this.updateOrganizationName(response.data.organization.name);
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('category update error', error);
      });
    event.preventDefault();
  }

  handleCategoryDelete = () => {
    axios
      .delete('/api/categories/' + this.state.id,
      {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/categories');
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateOrganizationName = (organizationName) => {
    this.setState({
      organization_name: organizationName,
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <Card>
          <Card.Header>
          <h3>Name: {this.state.name}</h3>
          </Card.Header>
          <Card.Body>
          <h3>organization: {this.state.organization_name}</h3>
          </Card.Body>
        </Card>
        <br />
        <div>
          <div className="container">
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Category
            </Button>
            <br />
            <br />
            {!this.state.isHidden ? (
              <Card>
                <Card.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.name}
                        name="name"
                        placeholder={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
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
                    <div className="text-center">
                      <Button type="submit" className="btn-lg">
                        Submit
                      </Button>
                      <Button
                        onClick={this.toggleHidden.bind(this)}
                        className="btn-lg"
                      >
                        Close
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : null }
            <Button onClick={this.handleCategoryDelete}>Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesShow;
