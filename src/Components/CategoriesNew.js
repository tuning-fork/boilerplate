import React, { Component } from 'react';
import axios from 'axios';

class CategoriesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      organization_id: "",
      organizations: [],
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      name: "",
      organization_id: ""
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const newCategory = this.state;
    axios
      .post('/api/categories', newCategory, {
      })
      .then((response) => {
        if (response.data) {
          this.props.updateCategories(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('category creation error', error);
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
                Add New Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CategoriesNew;