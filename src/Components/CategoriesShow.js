import React, { Component } from 'react';
import axios from 'axios';

class CategoriesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      organization_id: "",
      organizations: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/categories/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          organization_id: response.data.organization_id,
          loading: false,
        });
      })
      .then((response) => {
        this.showEditAbility();
      })
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
    const { name, organization_id } = this.state;
    axios
      .patch(
        '/api/categories/' + this.state.id,
        {
          name: name,
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

  handleCategoryDelete() {
    axios
      .delete('/api/categories/' + this.state.id)
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/categories');
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
      <div className="container">
        <h3>Name: {this.state.name}</h3>
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
        <button onClick={this.handleCategoryDelete}>Delete</button>
      </div>
    );
  }
}

export default CategoriesShow;
