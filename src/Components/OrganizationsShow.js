import React, { Component } from 'react';
import axios from 'axios';

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
      .get(`/api/organizations/${this.props.match.params.id}`)
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
        }
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
      .delete('/api/organizations/' + this.state.id)
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
        <h3>Name: {this.state.name}</h3>
        <br />

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Organization
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
        <button onClick={this.handleOrganizationDelete}>Delete</button>
      </div>
    );
  }
}

export default OrganizationsShow;
