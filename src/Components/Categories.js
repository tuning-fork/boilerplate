import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      query: '',
    };
  }
  componentDidMount() {
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="container">
        
        {this.state.categories.map((category) => {
          return (
            <div className="card bg-light mb-3" key={category.id}>
              <div className="card-header">Name: {category.name}</div>
              <div className="card-body">
              <p>Organization ID: {category.organization_id}</p>
              </div>
              </div>
          );
        })};
      </div>
    );
  }
}

export default Categories;