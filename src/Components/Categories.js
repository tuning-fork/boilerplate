import React, { Component } from "react";
import { Link } from "react-router-dom";
import CategoriesNew from "./CategoriesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      organizations: [],
      query: "",
      // openIndex: false,
      // openNew: false
    };
  }

  // toggleOpenIndex = () => {
  //   this.setState({
  //     openIndex: !this.state.openIndex,
  //   });
  // }

  // toggleOpenNew = () => {
  //   this.setState({
  //     openNew: !this.state.openNew,
  //   });
  // }

  componentDidMount() {
    axios
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false,
        });
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
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
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div className="flex-container">
        <div className="flex container col">
          <Card className="card-component">
            <Card.Header className="card-component card-heading">
              Categories
            </Card.Header>
            {this.state.categories.map((category) => {
              return (
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
              );
            })}
          </Card>
        </div>
        <div className="flex container col">
          <CategoriesNew updateCategories={this.updateCategories} />
        </div>
      </div>
    );
  }
}

export default Categories;
