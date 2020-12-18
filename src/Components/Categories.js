import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesNew from './CategoriesNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      organizations: [],
      query: '',
    };
  }

  componentDidMount() {
    axios
      .get('/api/categories',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false
        });
      })
      .catch((error) => console.log(error));  
  }

  updateCategories = (newCategory) => {
    const categories = this.state.categories;
    categories.push(newCategory);
    this.setState({
      categories: categories,
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
        <h1>Categories Index</h1>

        {this.state.categories.map((category) => {
          return (
            <Card key={category.id}>
              <Card.Header>
              <Link
                  to={`/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              </Card.Header>
              </Card>
          );
        })}
        
        <br />
        <h3>Add Category</h3>
        <CategoriesNew />
      </div>
    );
  }
}

export default Categories;