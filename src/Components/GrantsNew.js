import React, { Component } from 'react';
import axios from 'axios';

class GrantsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: "",
      organizations: [],
      funding_orgs: [],
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: ""
    });
  };

  componentDidMount() {
    axios
      .get('/api/organizations')
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/funding_orgs')
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
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
    const newGrant = this.state;
    axios
      .post('/api/grants', newGrant, {
      })
      .then((response) => {
        if (response.data) {
          this.props.updateGrants(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('grant creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>RFP URL</label>
              <input
                name="rfp_url"
                value={this.state.rfp_url}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Submitted</label>
              <input
                name="submitted"
                value={this.state.submitted}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Successful</label>
              <input
                name="successful"
                value={this.state.successful}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <input
                name="purpose"
                value={this.state.purpose}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div>
            <label>Organization</label>

            <select name="organization_id"
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
            <div>
            <label>Funding Organization</label>

            <select name="funding_org_id"
            value={this.state.funding_org_id}
            onChange={this.handleChange}
            required
            >
            <option value="" disabled>Select Funding Organization</option>
            {this.state.funding_orgs.map(funding_org => {
              return(
                <option key={funding_org.id} value={funding_org.id} onChange={this.handleChange}>{funding_org.name}</option>
                );
            })}
            </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Grant
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default GrantsNew;