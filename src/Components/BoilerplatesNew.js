import React, { Component } from 'react';
import axios from 'axios';

class BoilerplatesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      organization_id: "",
      category_id: "",
      wordcount: "",
      organizations: [],
      categories: [],
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: "",
      text: "",
      organization_id: "",
      category_id: "",
      wordcount: "",
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
      .get('/api/categories')
      .then((response) => {
        this.setState({
          categories: response.data,
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
    const {
      title, text, organization_id, category_id
    } = this.state;
    axios
      .post('/api/boilerplates', {
        title: title,
        text: text,
        organization_id: organization_id,
        category_id: category_id,
        wordcount: this.countWords(this.state.text)
      })
      .then((response) => {
        if (response.data) {
          this.props.updateBoilerplates(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('boilerplate creation error', error);
      });
    event.preventDefault();
  }

  countWords(string) { 
    if (string) {
      return (string.split(" ").length);
      } else {
        return 0; 
      }
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
              <label>Text</label>
              <input
                type="text"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Word Count</label>
              <p>{this.countWords(this.state.text)}</p>
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
            <label>Category</label>

            <select name="category_id"
            value={this.state.category_id}
            onChange={this.handleChange}
            required
            >
            <option value="" disabled>Select Category</option>
            {this.state.categories.map(category => {
              return(
                <option key={category.id} value={category.id} onChange={this.handleChange}>{category.name}</option>
                );
            })}
            </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Boilerplate
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BoilerplatesNew;