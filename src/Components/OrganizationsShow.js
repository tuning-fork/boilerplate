import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class OrganizationsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrganizationDelete = this.handleOrganizationDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/organizations/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
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
    const { name } = this.state;
    axios
      .patch(
        '/api/organizations/' + this.state.id,
        {
          name: name
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('organization update error', error);
      });
    event.preventDefault();
  }

  handleOrganizationDelete() {
    axios
      .delete('/api/organizations/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/organizations');
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
      </Card>
        <br />

        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Organization
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
                ) : null}
            </div>
        </div>
        <Button onClick={this.handleOrganizationDelete}>Delete</Button>
      </div>
    );
  }
}

export default OrganizationsShow;
