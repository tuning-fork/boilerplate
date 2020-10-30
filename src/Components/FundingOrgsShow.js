import React, { Component } from 'react';
import axios from 'axios';

class FundingOrgsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      website: "",
      organization_id: "",
      organizations: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFundingOrgDelete = this.handleFundingOrgDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/funding_orgs/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          website: response.data.website,
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
    const { name, website, organization_id } = this.state;
    axios
      .patch(
        '/api/funding_orgs/' + this.state.id,
        {
          name: name,
          website: website,
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

  handleFundingOrgDelete() {
    axios
      .delete('/api/funding_orgs/' + this.state.id)
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <h3>Name: {this.state.name}</h3>
        <h3>Website: {this.state.website}</h3>
        <h3>organization_id: {this.state.organization_id}</h3>
        <br />

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Category
              </button>
              <br />
              <br />
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          value={this.state.name}
                          name="name"
                          placeholder={this.state.name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Website</label>
                        <input
                          type="text"
                          value={this.state.website}
                          name="website"
                          placeholder={this.state.website}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Organization ID</label>
                        <input
                          type="text"
                          value={this.state.organization_id}
                          name="organization_id"
                          placeholder={this.state.organization_id}
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
                  </div>
                </div>
            </div>
        </div>

        <button onClick={this.handleFundingOrgDelete}>Delete</button>
      </div>
    );
  }
}

export default FundingOrgsShow;
