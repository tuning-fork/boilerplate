import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesNew from './CategoriesNew';
import OrganizationsNew from './OrganizationsNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      organizations: [],
      isHiddenCategoriesOrganizationsNew: true,
      query: '',
    };
    this.toggleHiddenCategoriesOrganizationsNew = this.toggleHiddenCategoriesOrganizationsNew.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/categories',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  toggleHiddenCategoriesOrganizationsNew() {
    this.setState({
      isHiddenCategoriesOrganizationsNew: !this.state.isHiddenCategoriesOrganizationsNew,
    });
  }

  updateCategories = (newCategory) => {
    const categories = this.state.categories;
    categories.push(newCategory);
    this.setState({
      categories: categories,
    });
  };

  updateOrganizations = (newOrganization) => {
		const organizations = this.state.organizations;
    organizations.push(newOrganization);
		this.setState({
			organizations: organizations,
    });
    // this.props.toggleHiddenOrganizationsNew()
    this.props.toggleHiddenCategoriesOrganizationsNew()
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
              Name: <Link
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
        <CategoriesNew 
          updateCategories={this.updateCategories}
          organizations={this.organizations}
          toggleHiddenCategoriesOrganizationsNew={this.toggleHiddenCategoriesOrganizationsNew}
        />

        {!this.state.isHiddenCategoriesOrganizationsNew ?
              <OrganizationsNew 
              updateOrganizations={this.updateOrganizations}
              toggleHiddenCategoriesOrganizationsNew={this.toggleHiddenCategoriesOrganizationsNew}
            /> : null
          }
      </div>
    );
  }
}

export default Categories;