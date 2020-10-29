import React, { Component } from 'react';
import axios from 'axios';

class OrganizationUser extends Component {
  constructor() {
    super();
    this.state = {
      user_id: localStorage.user_id,
      organization_id: "",
      organizations: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    axios
      .get('/api/organizations')
      .then((response) => {
        this.setState({
          organizations: response.data,
          // loading: false,
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
    const newOrganizationUser = this.state;
    axios
      .post('/api/organization_users', newOrganizationUser, {})
      .then((response) => {
        if (response.data) {
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log('organization user creation error', error);
      });
      event.preventDefault();
  }

  // handleSubmit(event) {
  //   const { organization_id } = this.state;
  //   axios
  //     .post('/api/organization_users', 
  //     {
  //       user_id: localStorage.user_id,
  //       organization_id: organization_id
  //     })
  //     .then((response) => {
  //       if (response.data) {
  //         console.log(response.data.id)
  //         // this.props.updateGrants(response.data);
  //         // this.clearForm();
  //       };
  //     })
  //     .catch((error) => {
  //       console.log('organization creation error', error);
  //     });
  //   event.preventDefault();
  // }
  
  render () {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
        <label>Organization</label>

        <select 
          name="organization_id"
          value={this.state.organization_id}
          onChange={this.handleChange}
          required
        >
        <option value="" disabled>Select Organization</option>
        {this.state.organizations.map(organization => {
          return(
            <option key={organization.id} value={organization.id} onChange={this.handleChange}>{organization.name}</option>
            );
        })}
        </select>
      </div>
      <div className="text-center">
        <button type="submit" className="btn-md">
          Add New Organization User
        </button>
      </div>
      </form>
      </div>
      </div>

    )
  }
}

export default OrganizationUser;