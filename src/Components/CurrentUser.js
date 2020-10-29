import React, { Component } from 'react';
import axios from 'axios';

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
        {this.state.organization_users.map((organization_user) => {
        return (
        <h2>Here are your current organizations: {organization_user.organization_name}</h2>
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
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={this.state.first_name}
                      name="first_name"
                      placeholder={this.state.first_name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={this.state.last_name}
                      name="last_name"
                      placeholder={this.state.last_name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      value={this.state.email}
                      name="email"
                      placeholder={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
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
                </form>
                <br />
                {/* <button
                  onClick={() => this.handleUserDelete()}
                  className="btn btn-danger">
                  Delete Account
                </button> */}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default CurrentUser;
