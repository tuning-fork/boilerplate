import React, { Component } from 'react';
import axios from 'axios';

class FundingOrgsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      website: '',
      organization_id: '',
      organizations: [],
      waffle: this.props.waffle
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
          loading: false,
        });
      // console.log(response.data);
      console.log(this.props.waffle)
      })
      .catch((error) => console.log(error));
  }

  clearForm = () => {
    this.setState({
      name: '',
      website: '',
      organization_id: ''
    });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newFundingOrg = this.state;

    axios
      .post('/api/funding_orgs', newFundingOrg, {
      })
      .then((response) => {
        if (response.data) {
          this.props.updateFundingOrgs(response.data);
          this.clearForm();
        }
      })
      .catch((error) => {
        console.log('funding org creation error', error);
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

            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={this.state.website}
                onChange={this.handleChange}
                required
              />
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
            
            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Funding Org
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FundingOrgsNew;
