import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class FundingOrgsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      website: "",
      organization_id: "",
      organizations: [],
      organization_name: "",
      isHidden: true,
      errors: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/funding_orgs/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          website: response.data.website,
          organization_id: response.data.organization_id,
          organization_name: response.data.organization.name,
          loading: false,
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
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
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
    const { name, website, organization_id } = this.state;
    axios
      .patch(
        '/api/funding_orgs/' + this.state.id,
        {
          name: name,
          website: website,
          organization_id: organization_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.updateOrganizationName(response.data.organization.name);
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('category update error', error);
      });
    event.preventDefault();
  }

  handleFundingOrgDelete = () => {
    axios
      .delete('/api/funding_orgs/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/funding_orgs');
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
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <Card>
          <Card.Header>
            <h3>Name: {this.state.name}</h3>
          </Card.Header>
          <Card.Body>
            <h3>Website: {this.state.website}</h3>
            <h3>Organization Name: {this.state.organization_name}</h3>
          </Card.Body>
        </Card>
        <br />
        <div className="container">
          <Button onClick={this.toggleHidden.bind(this)}>
            Update Category
          </Button>
          <Button variant="danger" onClick={this.handleFundingOrgDelete}>
            Delete Funding Org
          </Button>
          <br />
          <br />
          {!this.state.isHidden ? (
            <div className="card">
              <div className="card-body">
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
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.website}
                      name="website"
                      placeholder={this.state.website}
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
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default FundingOrgsShow;
