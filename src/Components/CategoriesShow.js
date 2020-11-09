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
      organizations: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
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
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { name, organization_id } = this.state;
    axios
      .patch(
        '/api/categories/' + this.state.id,
        {
          name: name,
          organization_id: organization_id
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('category update error', error);
      });
    event.preventDefault();
  }

  handleCategoryDelete() {
    axios
      .delete('/api/categories/' + this.state.id)
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
        <h3>organization_id: {this.state.organization_id}</h3>
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
              {this.state.isHidden ? (
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
                      <Form.Group>
                        <Form.Label>Organization ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.organization_id}
                          name="organization_id"
                          placeholder={this.state.organization_id}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
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
