import React, { Component } from 'react';
import axios from 'axios';

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
      .post('/api/organizations', newOrganization, {
      })
      .then((response) => {
        if (response.data) {
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
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Organization
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default OrganizationsNew;