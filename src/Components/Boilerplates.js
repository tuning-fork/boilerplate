import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoilerplatesNew from './BoilerplatesNew';
import CategoriesNew from './CategoriesNew';
import OrganizationsNew from './OrganizationsNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Boilerplates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      organizations: [],
      boilerplates: [],
      isHiddenNew: true,
      isHiddenCategoriesNew: true,
      query: '',
    };
    // this.toggleHiddenOrganizationsNew = this.toggleHiddenOrganizationsNew.bind(this);
    this.toggleHiddenCategoriesNew = this.toggleHiddenCategoriesNew.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          boilerplates: response.data,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
        });
      })
      .catch((error) => console.log(error));
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

  updateBoilerplates = (newBoilerplate) => {
    const boilerplates = this.state.boilerplates;
    boilerplates.push(newBoilerplate);
    this.setState({
      boilerplates: boilerplates,
    });
  };

  toggleHiddenCategoriesNew() {
    this.setState({
      isHiddenCategoriesNew: !this.state.isHiddenCategoriesNew,
    });
  }

  toggleHiddenNew = () => {
    this.setState({
      isHiddenNew: !this.state.isHiddenNew,
    });
  }

  updateOrganizations = (newOrganization) => {
		const organizations = this.state.organizations;
		organizations.push(newOrganization);
		this.setState({
			organizations: organizations,
    });
    console.log("waffle");
  };
  
  updateCategories = (newCategories) => {
    const categories = this.state.categories;
    categories.push(newCategories);
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
        <h1>Boilerplates Index</h1>
        <h3>Add Boilerplate</h3>
        
        {!this.state.isHiddenNew ?
              <OrganizationsNew 
              updateOrganizations={this.updateOrganizations}
              // toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
              toggleHiddenNew={this.toggleHiddenNew}
            /> : null
            }
        <br/>
        {!this.state.isHiddenCategoriesNew ?
              <CategoriesNew 
              updateCategories={this.updateCategories}
              toggleHiddenCategoriesNew={this.toggleHiddenCategoriesNew}
            /> : null
            }
        <br/>
        
        <BoilerplatesNew 
          updateBoilerplates={this.updateBoilerplates}
          organizations={this.state.organizations}
          categories={this.state.categories}
          toggleHiddenNew={this.toggleHiddenNew}
          toggleHiddenCategoriesNew={this.toggleHiddenCategoriesNew}
        />
        <br/>
        {this.state.boilerplates.map((boilerplate) => {
          return (
            <Card key={boilerplate.id}>
              <Card.Header>
                Title: <Link
                    to={`/boilerplates/${boilerplate.id}`}
                >
                  {boilerplate.title}
                </Link>
              </Card.Header>
              <Card.Body>
                <p dangerouslySetInnerHTML={{__html: boilerplate.text}}></p>
                {/* <div dangerouslySetInnerHTML={{__html: this.state.text}}></div> */}
                <p>Organization: {boilerplate.organization_name}</p>
                <p>Category: {boilerplate.category_name}</p>
                <p>Wordcount: {boilerplate.wordcount}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default Boilerplates;