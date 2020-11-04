import React, { Component } from 'react';
import axios from 'axios';
import OrganizationUser from './OrganizationUser';
import Form from 'react-bootstrap/Form';

class CurrentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      isHidden: false,
      organization_users: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/users/' + localStorage.user_id)
      .then((response) => {
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          organization_users: response.data.organization_users
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateOrganizationUsers = (newOrganizationUser) => {
		const organization_users = this.state.organization_users;
		organization_users.push(newOrganizationUser);
		this.setState({
			organization_users: organization_users
		});
	};

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
    const { first_name, last_name, email } = this.state;
    axios
      .patch(
        '/api/users/' + localStorage.user_id,
        {
          first_name: first_name,
          last_name: last_name,
          email: email
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => this.toggleHidden())
      .catch((error) => {
        console.log('user update error', error);
      });
    event.preventDefault();
  }

  render() {
    console.log(this.state.organization_users)
    return (
      <div>
        <h1>Welcome to your Dashboard {this.state.first_name}</h1>
        <br />
        <div>
        <h2>Here are your current organizations: </h2>
        {this.state.organization_users.map((organization_user) => {
        return (
        <h3>{organization_user.organization_name}</h3>
        );
        })}
        </div>
        <div>
          <button onClick={this.toggleHidden.bind(this)} className="btn-lg">
            Update Account Info
          </button>
          <br />
          <br />
          {this.state.isHidden ? (
            <div >
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.first_name}
                      name="first_name"
                      placeholder={this.state.first_name}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.last_name}
                      name="last_name"
                      placeholder={this.state.last_name}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.email}
                      name="email"
                      placeholder={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <button type="submit" className="btn-lg">
                      Submit
                    </button>
                    <button
                      onClick={this.toggleHidden.bind(this)}
                      className="btn-lg"
                    >
                      Close
                    </button>
                  </div>
                </Form>
                <br />
                {/* <button
                  onClick={() => this.handleUserDelete()}
                  className="btn btn-danger">
                  Delete Account
                </button> */}
              </div>
            
          ) : null}
        </div>

        <br />
        <h3>Add Your Organizations</h3>
        <OrganizationUser 
          updateOrganizationUsers={this.updateOrganizationUsers} 
        />
      </div>
    );
  }
}

export default CurrentUser;
